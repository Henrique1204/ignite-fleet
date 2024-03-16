import React from "react";

import { Alert, ScrollView } from "react-native";

import { TextInput } from "react-native/types";

import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Car } from "phosphor-react-native";

import {
  useForegroundPermissions,
  requestBackgroundPermissionsAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  LocationObjectCoords,
} from "expo-location";

import { useUser } from "@realm/react";

import { useRealm } from "../../libs/realm";
import Historic from "../../libs/realm/schemas/Historic";

import { licensePlateValidate } from "../../utils/licensePlateValidate";
import { getAddressLocation } from "../../utils/getAddressLocation";

import { startLocationTask } from "../../tasks/backgroundLocationTask";

import Header from "../../components/Header";
import LicensePlateInput from "../../components/LicensePlateInput";
import TextAreaInput from "../../components/TextAreaInput";
import Button from "../../components/Button";
import Show from "../../components/Show";
import Loader from "../../components/Loader";
import LocationInfo from "../../components/LocationInfo";
import Map from "../../components/Map";

import * as Styles from "./styles";

const LOCATION_UPDATE_INTERVAL = 1000;

const Departure: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingLocation, setIsLoadingLocation] =
    React.useState<boolean>(true);

  const [licensePlate, setLicensePlate] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const [currentAddress, setCurrentAddress] = React.useState<string | null>(
    null
  );

  const [currentCoords, setCurrentCoords] =
    React.useState<LocationObjectCoords | null>(null);
  const licensePlateRef = React.useRef<TextInput>(null);
  const descriptionRef = React.useRef<TextInput>(null);

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();

  const { goBack } = useNavigation();

  const user = useUser();
  const realm = useRealm();

  const handleFieldFocusAfterEditing = () => descriptionRef.current?.focus();

  const handleDepartureRegister = async () => {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();

        return Alert.alert(
          "Placa inválida",
          "A placa é inválida. Por favor, informe a placa correta do veículo."
        );
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();

        return Alert.alert(
          "Finalidade",
          "Por favor, informe a finalidade da utilização do veículo."
        );
      }

      if (!currentCoords?.latitude && !currentCoords?.longitude) {
        return Alert.alert(
          "Localização!",
          "Não foi possível obter a localização atual. Tente novamente!"
        );
      }

      setIsLoading(true);

      const backgroundPermissions = await requestBackgroundPermissionsAsync();

      if (!backgroundPermissions.granted) {
        return Alert.alert(
          "Localização",
          'É necessário permitir que o App tenha acesso a localização em segundo plano. Acesse as configuração do dispositivo e habilite "Permitir o tempo todo".'
        );
      }

      await startLocationTask();

      realm.write(() => {
        realm.create(
          "Historic",
          Historic.generate({
            description,
            license_plate: licensePlate.toUpperCase(),
            user_id: user.id,
          })
        );
      });

      Alert.alert("Saída", "Saída do veículo registrada com sucesso!");

      goBack();
    } catch (e) {
      console.error(e);

      Alert.alert("Erro", "Não foi possível registrar a saída do veículo.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  React.useEffect(() => {
    if (!locationForegroundPermission?.granted) return;

    let locationSubscription: LocationSubscription;

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: LOCATION_UPDATE_INTERVAL,
      },
      ({ coords }) => {
        getAddressLocation(coords)
          .then((address) => {
            if (address) setCurrentAddress(address);
          })
          .finally(() => setIsLoadingLocation(false));
      }
    ).then((subscription) => (locationSubscription = subscription));

    return () => {
      locationSubscription?.remove();
    };
  }, [locationForegroundPermission]);

  return (
    <Loader loading={isLoadingLocation}>
      <Styles.Container>
        <Header title="Saída" />

        <Show isShowing={!locationForegroundPermission?.granted}>
          <Styles.NoLocationMessage>
            Você precisa que o aplicativo tenha acesso a localização para
            utilizar essa funcionalidade. Por favor, acesse as configurações do
            seu dispositivo para conceder essa permissão.
          </Styles.NoLocationMessage>
        </Show>

        <Show isShowing={!!locationForegroundPermission?.granted}>
          <KeyboardAwareScrollView extraHeight={100}>
            <ScrollView>
              <Show isShowing={!!currentCoords}>
                <Map coordinates={[currentCoords!]} />
              </Show>

              <Styles.Content>
                <Show isShowing={!!currentAddress}>
                  <LocationInfo
                    icon={Car}
                    label="Localização atual"
                    description={currentAddress!}
                  />
                </Show>

                <LicensePlateInput
                  ref={licensePlateRef}
                  label="Placa do veículo"
                  placeholder="BRA1234"
                  onSubmitEditing={handleFieldFocusAfterEditing}
                  returnKeyType="next"
                  onChangeText={setLicensePlate}
                  value={licensePlate}
                />

                <TextAreaInput
                  ref={descriptionRef}
                  label="Finalidade"
                  placeholder="Vou utilizar o veículo para..."
                  onSubmitEditing={handleDepartureRegister}
                  returnKeyType="send"
                  onChangeText={setDescription}
                  value={description}
                  blurOnSubmit
                />

                <Button
                  title="Registrar Saída"
                  onPress={handleDepartureRegister}
                  isLoading={isLoading}
                />
              </Styles.Content>
            </ScrollView>
          </KeyboardAwareScrollView>
        </Show>
      </Styles.Container>
    </Loader>
  );
};

export default Departure;
