import React from "react";

import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import FieldGroup, { FieldGroupProps } from "../FieldGroup";

import * as Styles from "./styles";

type LicensePlateInputProps = TextInputProps & FieldGroupProps;

const LicensePlateInput = React.forwardRef<TextInput, LicensePlateInputProps>(
  ({ label, ...inputProps }, ref) => {
    const { COLORS } = useTheme();

    return (
      <FieldGroup label={label}>
        <Styles.Input
          // @ts-ignore - Não aceitando ref.
          ref={ref}
          maxLength={7}
          autoCapitalize="characters"
          placeholderTextColor={COLORS.GRAY_400}
          {...inputProps}
        />
      </FieldGroup>
    );
  }
);

export default LicensePlateInput;
