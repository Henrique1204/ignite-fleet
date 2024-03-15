import React from "react";

import { TouchableOpacityProps } from "react-native";

import { useTheme } from "styled-components/native";

import * as Styles from "./styles";

type ButtonIconProps = {
  icon: IconElement;
} & TouchableOpacityProps;

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon: Icon, ...props }) => {
  const { COLORS } = useTheme();

  return (
    <Styles.Container activeOpacity={0.7} {...props}>
      <Icon size={24} color={COLORS.BRAND_MID} />
    </Styles.Container>
  );
};

export default ButtonIcon;
