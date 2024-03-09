import React from "react";

import { TextInputProps } from "react-native";
import { TextInput } from "react-native/types";

import { useTheme } from "styled-components/native";

import FieldGroup, { FieldGroupProps } from "../FieldGroup";

import * as Styles from "./styles";

type TextAreaInputProps = TextInputProps & FieldGroupProps;

const TextAreaInput = React.forwardRef<TextInput, TextAreaInputProps>(
  ({ label, ...inputProps }) => {
    const { COLORS } = useTheme();

    return (
      <FieldGroup label={label} height="150px">
        <Styles.TextAreaInput
          multiline
          autoCapitalize="sentences"
          placeholderTextColor={COLORS.GRAY_400}
          {...inputProps}
        />
      </FieldGroup>
    );
  }
);

export default TextAreaInput;
