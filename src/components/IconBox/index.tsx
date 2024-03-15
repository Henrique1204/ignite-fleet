import React from "react";

import { useTheme } from "styled-components/native";

import * as Styles from "./styles";

export { SIZE_ENUM } from "./styles";

type IconBoxProps = Partial<Styles.ContainerProps> & {
  icon: IconElement;
};

const ICON_SIZE_ENUM = {
  [Styles.SIZE_ENUM.NORMAL]: 24,
  [Styles.SIZE_ENUM.SMALL]: 16,
};

const IconBox: React.FC<IconBoxProps> = ({
  size = Styles.SIZE_ENUM.NORMAL,
  icon: Icon,
}) => {
  const { COLORS } = useTheme();

  return (
    <Styles.Container size={size}>
      <Icon size={ICON_SIZE_ENUM[size]} color={COLORS.BRAND_LIGHT} />
    </Styles.Container>
  );
};

export default IconBox;
