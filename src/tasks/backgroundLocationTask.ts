import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";

import * as TaskManager from "expo-task-manager";
import { saveStorageLocations } from "../libs/asyncStorage/locationStorage";

export const BACKGROUND_TASK_NAME = "location-tracking";

const DISTANCE_INTERVAL_METERS = 1;
const TIME_INTERVAL_MS = 1000;

export const stopLocationTask = async () => {
  try {
    const hasStardted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_NAME
    );

    if (hasStardted) await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME);
  } catch (e) {
    console.error(e);
  }
};

export const startLocationTask = async () => {
  try {
    const hasStardted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_NAME
    );

    if (hasStardted) await stopLocationTask();

    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: DISTANCE_INTERVAL_METERS,
      timeInterval: TIME_INTERVAL_MS,
    });
  } catch (e) {
    console.error(e);
  }
};

TaskManager.defineTask(BACKGROUND_TASK_NAME, async ({ data, error }: any) => {
  try {
    if (error) throw error;

    if (!data) return;

    const [{ coords, timestamp }] = data.location;

    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp,
    };

    await saveStorageLocations(currentLocation);
  } catch (e) {
    console.error(e);

    stopLocationTask();
  }
});
