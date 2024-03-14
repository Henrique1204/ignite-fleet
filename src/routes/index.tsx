import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { AppRoutes } from "./app.routes";

import TopMessage from "../components/TopMessage";

const Routes: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <AppRoutes />

      <Toast
        config={{
          info: ({ text1 }) => <TopMessage title={text1!} />,
        }}
        topOffset={insets.top}
      />
    </NavigationContainer>
  );
};

export default Routes;
