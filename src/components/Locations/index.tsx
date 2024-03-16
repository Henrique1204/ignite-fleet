import React from "react";

import { Car, FlagCheckered } from "phosphor-react-native";

import LocationInfo, { LocationInfoProps } from "../LocationInfo";

import * as Styles from "./styles";
import Show from "../Show";

type LocationsProps = {
  departure: LocationInfoProps;
  arrival?: LocationInfoProps;
};

const Locations: React.FC<LocationsProps> = ({ arrival, departure }) => {
  return (
    <Styles.Container>
      <LocationInfo icon={Car} {...departure} />

      <Show isShowing={!!arrival}>
        <Styles.Line />

        <LocationInfo icon={FlagCheckered} {...arrival!} />
      </Show>
    </Styles.Container>
  );
};

export default Locations;
