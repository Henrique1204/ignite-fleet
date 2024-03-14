import React from "react";

import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { X } from "phosphor-react-native";

import { BSON } from "realm";

import { useObject, useRealm } from "../../libs/realm";
import Historic from "../../libs/realm/schemas/Historic";
import { getLastSyncTimestamp } from "../../libs/asyncStorage/syncStorage";

import Header from "../../components/Header";
import Button from "../../components/Button";
import ButtonIcon from "../../components/ButtonIcon";
import Show from "../../components/Show";

import * as Styles from "./styles";

const Arrival: React.FC = () => {
  const [isNotDataSynced, setIsNotDataSynced] = React.useState<boolean>(false);

  const { goBack } = useNavigation();

  const { params } = useRoute();
  const { id } = params as ReactNavigation.RootParamList["arrival"];

  const historic = useObject(Historic, String(new BSON.UUID(id)));
  const realm = useRealm();

  const isDepartureStatus = historic?.status === "departure";
  const title = isDepartureStatus ? "Chegada" : "Detalhes";

  const removeVehicleUsage = () => {
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  };

  const handleRemoveVehicle = () => {
    Alert.alert("Cancelar", "Cancelar a utilização do veículo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: removeVehicleUsage },
    ]);
  };

  const handleArrivalRegister = () => {
    try {
      if (!historic) {
        Alert.alert(
          "Error",
          "Não foi possível obter os dados para registrar a chega do veículo."
        );
      }

      realm.write(() => {
        historic!.status = "arrival";
        historic!.updated_at = new Date();
      });

      Alert.alert("Chegada", "Chegada registrada com sucesso!");

      goBack();
    } catch (e) {
      console.error(e);

      Alert.alert("Error", "Não foi possível registrar a chegada do veículo.");
    }
  };

  React.useEffect(() => {
    if (historic) {
      getLastSyncTimestamp().then((lastSync) => {
        setIsNotDataSynced(historic.updated_at.getTime() > lastSync);
      });
    }
  }, [historic]);

  return (
    <Styles.Container>
      <Header title={title} />

      <Styles.Content>
        <Styles.Label>Placa do veículo</Styles.Label>
        <Styles.LicensePlate>{historic?.license_plate}</Styles.LicensePlate>

        <Styles.Label>Finalidade</Styles.Label>
        <Styles.Description>{historic?.description}</Styles.Description>
      </Styles.Content>

      <Show isShowing={isNotDataSynced}>
        <Styles.SyncMessage>
          Sincronização da {isDepartureStatus ? "partida" : "chegada"} pendente.
        </Styles.SyncMessage>
      </Show>

      <Show isShowing={isDepartureStatus}>
        <Styles.Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicle} />

          <Button title="Registrar Chegada" onPress={handleArrivalRegister} />
        </Styles.Footer>
      </Show>
    </Styles.Container>
  );
};

export default Arrival;
