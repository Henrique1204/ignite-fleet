import React from "react";

import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { X } from "phosphor-react-native";

import { BSON } from "realm";

import { LatLng } from "react-native-maps";
import dayjs from "dayjs";

import { useObject, useRealm } from "../../libs/realm";
import Historic from "../../libs/realm/schemas/Historic";
import { getLastSyncTimestamp } from "../../libs/asyncStorage/syncStorage";
import { getStorageLocations } from "../../libs/asyncStorage/locationStorage";

import { getAddressLocation } from "../../utils/getAddressLocation";

import { stopLocationTask } from "../../tasks/backgroundLocationTask";

import Header from "../../components/Header";
import Button from "../../components/Button";
import ButtonIcon from "../../components/ButtonIcon";
import Show from "../../components/Show";
import Map from "../../components/Map";
import Locations from "../../components/Locations";
import { LocationInfoProps } from "../../components/LocationInfo";
import Loader from "../../components/Loader";

import * as Styles from "./styles";

const Arrival: React.FC = () => {
  const [isNotDataSynced, setIsNotDataSynced] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [coordinates, setCoordinates] = React.useState<LatLng[]>([]);

  const [departure, setDeparture] = React.useState<LocationInfoProps>(
    {} as LocationInfoProps
  );

  const [arrival, setArrival] = React.useState<LocationInfoProps | undefined>();

  const { goBack } = useNavigation();

  const { params } = useRoute();
  const { id } = params as ReactNavigation.RootParamList["arrival"];

  const historic = useObject(Historic, String(new BSON.UUID(id)));
  const realm = useRealm();

  const isDepartureStatus = historic?.status === "departure";
  const title = isDepartureStatus ? "Chegada" : "Detalhes";

  const removeVehicleUsage = async () => {
    realm.write(() => {
      realm.delete(historic);
    });

    await stopLocationTask();

    goBack();
  };

  const handleRemoveVehicle = () => {
    Alert.alert("Cancelar", "Cancelar a utilização do veículo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: removeVehicleUsage },
    ]);
  };

  const handleArrivalRegister = async () => {
    try {
      if (!historic) {
        Alert.alert(
          "Error",
          "Não foi possível obter os dados para registrar a chega do veículo."
        );
      }

      const locations = await getStorageLocations();

      realm.write(() => {
        historic!.status = "arrival";
        historic!.updated_at = new Date();
        historic!.coords.push(...locations);
      });

      await stopLocationTask();

      Alert.alert("Chegada", "Chegada registrada com sucesso!");

      goBack();
    } catch (e) {
      console.error(e);

      Alert.alert("Error", "Não foi possível registrar a chegada do veículo.");
    }
  };

  const getLocationsInfo = async () => {
    if (!historic) return;

    const lastSync = await getLastSyncTimestamp();
    const updatedAt = historic.updated_at.getTime();

    setIsNotDataSynced(updatedAt > lastSync);

    if (historic?.status === "departure") {
      const locationsStoreage = await getStorageLocations();

      setCoordinates(locationsStoreage);
    } else {
      setCoordinates(historic.coords ?? []);
    }

    const firstCoord = historic.coords?.[0];

    if (firstCoord) {
      const departureStreetName = await getAddressLocation(firstCoord);

      setDeparture({
        label: `Saindo em ${departureStreetName ?? ""}`,
        description: dayjs(new Date(firstCoord.timestamp)).format(
          "DD/MM/YYYY [às] HH:mm"
        ),
      });
    }

    if (historic?.status === "arrival") {
      const [lastLocation] = historic.coords.slice(-1);

      const arrivalStreetName = await getAddressLocation(lastLocation);

      setArrival({
        label: `Chegando em ${arrivalStreetName ?? ""}`,
        description: dayjs(new Date(lastLocation.timestamp)).format(
          "DD/MM/YYYY [às] HH:mm"
        ),
      });
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    getLocationsInfo();
  }, [historic]);

  return (
    <Loader loading={isLoading}>
      <Styles.Container>
        <Header title={title} />

        <Show isShowing={coordinates.length > 0}>
          <Map coordinates={coordinates} />
        </Show>

        <Styles.Content>
          <Locations departure={departure} arrival={arrival} />

          <Styles.Label>Placa do veículo</Styles.Label>
          <Styles.LicensePlate>{historic?.license_plate}</Styles.LicensePlate>

          <Styles.Label>Finalidade</Styles.Label>
          <Styles.Description>{historic?.description}</Styles.Description>
        </Styles.Content>

        <Show isShowing={isNotDataSynced}>
          <Styles.SyncMessage>
            Sincronização da {isDepartureStatus ? "partida" : "chegada"}{" "}
            pendente.
          </Styles.SyncMessage>
        </Show>

        <Show isShowing={isDepartureStatus}>
          <Styles.Footer>
            <ButtonIcon icon={X} onPress={handleRemoveVehicle} />

            <Button title="Registrar Chegada" onPress={handleArrivalRegister} />
          </Styles.Footer>
        </Show>
      </Styles.Container>
    </Loader>
  );
};

export default Arrival;
