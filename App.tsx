import { StatusBar } from "react-native";

import { ThemeProvider } from "styled-components";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import SignIn from "./src/screens/SignIn";

import theme from "./src/theme";
import Loader from "./src/components/Loader";

const App = () => {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Loader loading={!fontsLoaded}>
        <SignIn />
      </Loader>
    </ThemeProvider>
  );
};

export default App;
