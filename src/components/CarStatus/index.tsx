import React from "react";

import { TouchableOpacityProps } from 'react-native';

import { useTheme } from "styled-components/native";

import { Key, Car } from "phosphor-react-native";

import * as Styles from "./styles";

type CarStatusProps = TouchableOpacityProps & {
  licensePlate?: string | null;
};

const CarStatus: React.FC<CarStatusProps> = ({ licensePlate, ...props }) => {
  const theme = useTheme();

  const Icon = licensePlate ? Key : Car;

  const message = licensePlate
    ? `Veículo ${licensePlate} em use. `
    : "Nenhum veículo em uso. ";

  const status = licensePlate ? "chegada" : "saída";

  return (
    <Styles.Container {...props}>
      <Styles.IconBox>
        <Icon size={32} color={theme.COLORS.BRAND_LIGHT} />
      </Styles.IconBox>

      <Styles.Message>
        {message}

        <Styles.TextHighlight>
          Clique aqui para registrar a {status}
        </Styles.TextHighlight>
      </Styles.Message>
    </Styles.Container>
  );
};

export default CarStatus;
