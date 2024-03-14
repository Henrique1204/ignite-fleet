import React from "react";

import { Alert, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { ProgressDirection, ProgressMode } from "realm";
import { useUser } from "@realm/react";

import Toast from "react-native-toast-message";

import { CloudArrowUp } from "phosphor-react-native";

import dayjs from "dayjs";

import { useQuery, useRealm } from "../../libs/realm";
import Historic from "../../libs/realm/schemas/Historic";

import {
  getLastSyncTimestamp,
  saveLastSyncTimestamp,
} from "../../libs/asyncStorage/syncStorage";

import CarStatus from "../../components/CarStatus";
import HomeHeader from "../../components/HomeHeader";
import HistoricCard, { HistoricCardProps } from "../../components/HistoricCard";
import TopMessage from "../../components/TopMessage";
import Show from "../../components/Show";

import * as Styles from "./styles";

const HUNDRED_PERCENT = 100;

const Home: React.FC = () => {
  const [vehicleInUse, setVehicleInUse] = React.useState<Historic | null>(null);
  const [historicCards, setHistoricCards] = React.useState<HistoricCardProps[]>(
    []
  );

  const [percentageToSync, setPercentageToSync] = React.useState<string | null>(
    null
  );

  const { navigate } = useNavigation();

  const historic = useQuery(Historic);
  const realm = useRealm();
  const user = useUser();

  const fetchVehicleInUse = () => {
    try {
      const [vehicle] = historic.filtered('status = "departure"');

      setVehicleInUse(vehicle);
    } catch (_) {
      Alert.alert(
        "Veículo em uso",
        "Não foi possível carregar o veículo em uso."
      );

      setVehicleInUse(null);
    }
  };

  const fetchHistoric = async () => {
    try {
      const arrivalHistoric = historic.filtered(
        'status = "arrival" SORT(created_at DESC)'
      );

      const lastSync = await getLastSyncTimestamp();

      const _historicCards = arrivalHistoric.map(
        ({ _id, license_plate, createed_at, updated_at }) => ({
          id: _id,
          licensePlate: license_plate,
          created: dayjs(createed_at).format(
            "[Saída em] DD/MM/YYYY [às] HH:mm"
          ),
          isSync: lastSync > updated_at.getTime(),
        })
      );

      setHistoricCards(_historicCards);
    } catch (e) {
      console.error(e);

      Alert.alert("Histórico", "Não foi possível carregar o histórico.");

      setHistoricCards([]);
    }
  };

  const handleRegisterMovement = () => {
    if (vehicleInUse?._id) {
      return navigate("arrival", { id: vehicleInUse?._id });
    }

    navigate("departure");
  };

  const handleHistoricDetails = (id: string) => () => {
    navigate("arrival", { id });
  };

  const progressNotification = async (
    transferred: number,
    transferable: number
  ) => {
    const transferPercent = (transferred / transferable) * HUNDRED_PERCENT;

    if (transferPercent === HUNDRED_PERCENT) {
      await saveLastSyncTimestamp();

      await fetchHistoric();

      setPercentageToSync(null);

      Toast.show({
        type: "info",
        text1: "Todos os dados estão sincronizados.",
      });
    }

    if (transferPercent < HUNDRED_PERCENT) {
      setPercentageToSync(`${transferPercent.toFixed(0)}% sincronizado.`);
    }
  };

  React.useEffect(() => {
    fetchHistoric();
  }, []);

  React.useEffect(() => {
    fetchVehicleInUse();

    realm.addListener("change", fetchVehicleInUse);

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener("change", fetchVehicleInUse);
      }
    };
  }, [historic]);

  React.useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUseQuery = realm
        .objects("Historic")
        .filtered(`user_id = "${user.id}"`);

      mutableSubs.add(historicByUseQuery, { name: "historic_by_user" });
    });
  }, [realm]);

  React.useEffect(() => {
    const syncSession = realm.syncSession;

    if (!syncSession) return;

    syncSession.addProgressNotification(
      ProgressDirection.Upload,
      ProgressMode.ReportIndefinitely,
      progressNotification
    );

    return () => syncSession.removeProgressNotification(progressNotification);
  }, []);

  return (
    <Styles.Container>
      <Show isShowing={!!percentageToSync}>
        <TopMessage title={percentageToSync!} icon={CloudArrowUp} />
      </Show>

      <HomeHeader />

      <Styles.Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Styles.Title>Histórico</Styles.Title>

        <FlatList
          data={historicCards}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={handleHistoricDetails(item.id)}
            />
          )}
          ListEmptyComponent={() => (
            <Styles.EmptyMessage>Nenhum veículo utilizado.</Styles.EmptyMessage>
          )}
        />
      </Styles.Content>
    </Styles.Container>
  );
};

export default Home;
