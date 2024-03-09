import React from "react";

import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TextInput } from "react-native/types";

import Header from "../../components/Header";

import LicensePlateInput from "../../components/LicensePlateInput";
import TextAreaInput from "../../components/TextAreaInput";
import Button from "../../components/Button";

import * as Styles from "./styles";

const keyboardAvoidingViewBehavior = Platform.select<"height" | "position">({
  android: "height",
  ios: "position",
});

const Departure: React.FC = () => {
  const descriptionRef = React.useRef<TextInput>(null);

  const handleFieldFocusAfterEditing = () => descriptionRef.current?.focus();

  const handleDepartureRegister = () => {};

  return (
    <Styles.Container>
      <Header title="Saída" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={keyboardAvoidingViewBehavior}
      >
        <ScrollView>
          <Styles.Content>
            <LicensePlateInput
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={handleFieldFocusAfterEditing}
              returnKeyType="next"
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
            />

            <Button title="Registrar Saída" onPress={handleDepartureRegister} />
          </Styles.Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Styles.Container>
  );
};

export default Departure;
