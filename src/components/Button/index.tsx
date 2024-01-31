import React from "react";

import { TouchableOpacityProps } from "react-native";

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
      {isLoading ? <Styles.Loading /> : <Styles.Title>{title}</Styles.Title>}
    </Styles.Container>
  );
};

export default Button;
