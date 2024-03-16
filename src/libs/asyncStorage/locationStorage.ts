import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_ASYNC_KEY = "@ignitefleet:location";

type Location = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export const getStorageLocations = async (): Promise<Location[]> => {
  const storage = await AsyncStorage.getItem(STORAGE_ASYNC_KEY);
  const response = storage ? JSON.parse(storage) : [];

  return response;
};

export const saveStorageLocations = async (newLocation: Location) => {
  const storage = await getStorageLocations();

  storage.push(newLocation);

  const locationsStorage = JSON.stringify(storage);

  await AsyncStorage.setItem(STORAGE_ASYNC_KEY, locationsStorage);
};

export const deleteStorageLocations = async () => {
  await AsyncStorage.removeItem(STORAGE_ASYNC_KEY);
};
