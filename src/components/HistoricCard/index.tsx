import React from "react";

import { TouchableHighlightProps } from "react-native";

import { useTheme } from "styled-components/native";

import { Check, Clock } from "phosphor-react-native";

import "../../libs/dayjs";

import Show from "../Show";

import * as Styles from "./styles";

export type HistoricCardProps = {
  id: string;
  licensePlate: string;
  created: string;
  isSync: boolean;
};

type Props = TouchableHighlightProps & {
  data: HistoricCardProps;
};

const HistoricCard: React.FC<Props> = ({ data, ...props }) => {
  const { COLORS } = useTheme();

  return (
    <Styles.Container activeOpacity={0.7} {...props}>
      <Styles.Info>
        <Styles.LicensePlate>{data.licensePlate}</Styles.LicensePlate>
        <Styles.Departure>{data.created}</Styles.Departure>
      </Styles.Info>

      <Show isShowing={data.isSync}>
        <Check size={24} color={COLORS.BRAND_LIGHT} />
      </Show>

      <Show isShowing={!data.isSync}>
        <Clock size={24} color={COLORS.GRAY_400} />
      </Show>
    </Styles.Container>
  );
};

export default HistoricCard;
