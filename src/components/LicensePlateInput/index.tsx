import React from "react";

import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import FieldGroup, { FieldGroupProps } from "../FieldGroup";

import * as Styles from "./styles";

type LicensePlateInputProps = TextInputProps & FieldGroupProps;

const LicensePlateInput: React.FC<LicensePlateInputProps> = ({
  label,
  ...inputProps
}) => {
  const { COLORS } = useTheme();

  return (
    <FieldGroup label={label}>
      <Styles.Input
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={COLORS.GRAY_400}
        {...inputProps}
      />
    </FieldGroup>
  );
};

export default LicensePlateInput;
