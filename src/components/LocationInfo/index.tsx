import React from "react";

import IconBox from "../IconBox";

import * as Styles from "./styles";

export type LocationInfoProps = {
  label: string;
  description: string;
};

type Props = LocationInfoProps & {
  icon: IconElement;
};

const LocationInfo: React.FC<Props> = ({ label, description, icon }) => {
  return (
    <Styles.Container>
      <IconBox icon={icon} />

      <Styles.Info>
        <Styles.Label numberOfLines={1}>{label}</Styles.Label>
        <Styles.Description numberOfLines={1}>{description}</Styles.Description>
      </Styles.Info>
    </Styles.Container>
  );
};

export default LocationInfo;
