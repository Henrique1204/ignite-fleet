import { reverseGeocodeAsync, LocationObjectCoords } from "expo-location";

export const getAddressLocation = async ({
  longitude,
  latitude,
}: Pick<LocationObjectCoords, "latitude" | "longitude">) => {
  try {
    const [addressResponse] = await reverseGeocodeAsync({
      longitude,
      latitude,
    });

    return addressResponse.street;
  } catch (e) {
    console.error(e);
  }
};
