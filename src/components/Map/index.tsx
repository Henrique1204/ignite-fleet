import React from "react";

import { useTheme } from "styled-components/native";

import MapView, {
  LatLng,
  MapViewProps,
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
} from "react-native-maps";

import { Car, FlagCheckered } from "phosphor-react-native";

import IconBox, { SIZE_ENUM } from "../IconBox";
import Show from "../Show";

type MapProps = MapViewProps & {
  coordinates: LatLng[];
};

const MINIMUM_INDIVIDUAL_COORD = 1;
const MAP_EDGE_PADDING = 50;

const Map: React.FC<MapProps> = ({ coordinates, ...mapViewProps }) => {
  const mapRef = React.useRef<MapView>(null);

  const { COLORS } = useTheme();

  const [firstCoordinate] = coordinates;
  const [lastCoordinate] = coordinates.slice(-1);

  const isMultipleCoordinates = coordinates.length > MINIMUM_INDIVIDUAL_COORD;

  const onMapLoaded = () => {
    if (isMultipleCoordinates) {
      mapRef.current?.fitToSuppliedMarkers(["departure", "arrival"], {
        edgePadding: {
          top: MAP_EDGE_PADDING,
          bottom: MAP_EDGE_PADDING,
          left: MAP_EDGE_PADDING,
          right: MAP_EDGE_PADDING,
        },
      });
    }
  };

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ width: "100%", height: 200 }}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
      {...mapViewProps}
    >
      <Marker identifier="departure" coordinate={firstCoordinate}>
        <IconBox size={SIZE_ENUM.SMALL} icon={Car} />
      </Marker>

      <Show isShowing={isMultipleCoordinates}>
        <Marker identifier="arrival" coordinate={lastCoordinate}>
          <IconBox size={SIZE_ENUM.SMALL} icon={FlagCheckered} />
        </Marker>

        <Polyline
          coordinates={coordinates}
          strokeColor={COLORS.GRAY_700}
          strokeWidth={7}
        />
      </Show>
    </MapView>
  );
};

export default Map;
