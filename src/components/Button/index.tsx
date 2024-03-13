import React from "react";

import { TouchableOpacityProps } from "react-native";

import Show from "../Show";

import * as Styles from "./styles";

type ButtonProps = {
  title: string;
  isLoading?: boolean;
} & TouchableOpacityProps;

const Button: React.FC<ButtonProps> = ({
  title,
  isLoading = false,
  ...props
}) => {
  return (
    <Styles.Container activeOpacity={0.7} disabled={isLoading} {...props}>
      <Show isShowing={isLoading}>
        <Styles.Loading />
      </Show>

      <Show isShowing={!isLoading}>
        <Styles.Title>{title}</Styles.Title>
      </Show>
    </Styles.Container>
  );
};

export default Button;
