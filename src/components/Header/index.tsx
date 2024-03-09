import React from "react";

import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useTheme } from "styled-components/native";

import { ArrowLeft } from "phosphor-react-native";

import * as Styles from "./styles";

const TOP_SPACING_FIXED = 42;

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { goBack } = useNavigation();

  const { COLORS } = useTheme();

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + TOP_SPACING_FIXED;

  const handleGoBack = () => goBack();

  return (
    <Styles.Container style={{ paddingTop }}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>

      <Styles.Title>{title}</Styles.Title>
    </Styles.Container>
  );
};

export default Header;
