import React from "react";

import { Alert } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";

import BackgroundImage from "../../assets/background.png";
import Button from "../../components/Button";

import * as Styles from "./styles";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

const SignIn: React.FC = () => {
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const handleGoolgeSignin = async () => {
    try {
      setIsAuthenticating(true);

      const { idToken } = GoogleSignin.signIn();

      if (idToken) {
      } else {
        Alert.alert(
          "Entrar",
          "Não foi possível conectar-se a sua conta google."
        );
      }
    } catch (e) {
      console.error(e);

      Alert.alert("Entrar", "Não foi possível conecta-se a sua conta Google.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Styles.Container source={BackgroundImage}>
      <Styles.Title>Ignite Fleet</Styles.Title>

      <Styles.Slogan>Gestão de uso de veículos</Styles.Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleGoolgeSignin}
      />
    </Styles.Container>
  );
};

export default SignIn;
