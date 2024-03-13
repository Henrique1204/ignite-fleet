import React from "react";

import { Alert, ScrollView } from "react-native";

import { TextInput } from "react-native/types";

import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useUser } from "@realm/react";

import { useRealm } from "../../libs/realm";
import Historic from "../../libs/realm/schemas/Historic";

import { licensePlateValidate } from "../../utils/licensePlateValidate";

import Header from "../../components/Header";

import LicensePlateInput from "../../components/LicensePlateInput";
import TextAreaInput from "../../components/TextAreaInput";
import Button from "../../components/Button";

import * as Styles from "./styles";

const Departure: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [licensePlate, setLicensePlate] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const licensePlateRef = React.useRef<TextInput>(null);
  const descriptionRef = React.useRef<TextInput>(null);

  const { goBack } = useNavigation();

  const user = useUser();
  const realm = useRealm();

  const handleFieldFocusAfterEditing = () => descriptionRef.current?.focus();

  const handleDepartureRegister = () => {
    try {
      setIsLoading(true);

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

  return (
    <Styles.Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Styles.Content>
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
    </Styles.Container>
  );
};

export default Departure;
