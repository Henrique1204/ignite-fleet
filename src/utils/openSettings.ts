import { Alert, Linking, Platform } from "react-native";

const openSettingsIos = () => Linking.openURL("app-settings:");
const openSettingsAndroid = () => Linking.openSettings();

const openSettingsDefault = () => {
  Alert.alert("Erro", "Não foi possível abrir as configurações.");
};

export const openSettings = Platform.select({
  android: openSettingsAndroid,
  ios: openSettingsIos,
  default: openSettingsDefault,
});
