import React from "react";

import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useUser, useApp } from "@realm/react";

import { Power } from "phosphor-react-native";


import theme from "../../theme";

import * as Styles from "./styles";

const TOP_SPACING_FIXED = 32;

const HomeHeader: React.FC = () => {
  const user = useUser();
  const app = useApp();

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + TOP_SPACING_FIXED;

  const handleLogout = () => {
    app.currentUser?.logOut();
  };

  return (
    <Styles.Container style={{ paddingTop }}>
      {/* Criar o placeholder com o site BlurHash */}
      <Styles.Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="BlurHash"
      />

      <Styles.Greeting>
        <Styles.Message>Olá</Styles.Message>
        <Styles.Name>{user?.profile.name}</Styles.Name>
      </Styles.Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Styles.Container>
  );
};

export default HomeHeader;
