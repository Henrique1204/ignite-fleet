import { StatusBar } from "react-native";

import { ThemeProvider } from "styled-components";

import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { REALM_APP_ID } from "@env";

import theme from "./src/theme";

import Routes from "./src/routes";

import SignIn from "./src/screens/SignIn";

import Loader from "./src/components/Loader";

const App = () => {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          <Loader loading={!fontsLoaded}>
            <UserProvider fallback={<SignIn />}>
              <RealmProvider>
                <Routes />
              </RealmProvider>
            </UserProvider>
          </Loader>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
