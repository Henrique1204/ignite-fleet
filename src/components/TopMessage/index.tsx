import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "styled-components/native";

import { IconBoxProps } from "../ButtonIcon";

import * as Styles from "./styles";

type TopMessageProps = {
  title: string;
  icon?: IconBoxProps;
};

const TOP_SPACING_FIXED = 5;

const TopMessage: React.FC<TopMessageProps> = ({ title, icon: Icon }) => {
  const { COLORS } = useTheme();

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + TOP_SPACING_FIXED;

  return (
    <Styles.Container style={{ paddingTop }}>
      {Icon && <Icon size={18} color={COLORS.GRAY_100} />}

      <Styles.Title>{title}</Styles.Title>
    </Styles.Container>
  );
};

export default TopMessage;
