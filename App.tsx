import "react-native-get-random-values";

import { StatusBar } from "react-native";

import { ThemeProvider } from "styled-components";

import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNetInfo } from "@react-native-community/netinfo";

import { WifiSlash } from "phosphor-react-native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { REALM_APP_ID } from "@env";

import { syncConfig } from "./src/libs/realm";

import theme from "./src/theme";

import Routes from "./src/routes";

import SignIn from "./src/screens/SignIn";

import Loader, { Loading } from "./src/components/Loader";
import TopMessage from "./src/components/TopMessage";
import Show from "./src/components/Show";

const App = () => {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  const netInfo = useNetInfo();

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          <Show isShowing={!netInfo.isConnected}>
            <TopMessage title="Você está off-line." icon={WifiSlash} />
          </Show>

          <Loader loading={!fontsLoaded}>
            <UserProvider fallback={<SignIn />}>
              <RealmProvider sync={syncConfig} fallback={<Loading />}>
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
