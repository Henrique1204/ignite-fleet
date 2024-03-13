import React from "react";

import { Alert, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";

import dayjs from "dayjs";

import { useQuery, useRealm } from "../../libs/realm";
import Historic from "../../libs/realm/schemas/Historic";

import CarStatus from "../../components/CarStatus";
import HomeHeader from "../../components/HomeHeader";
import HistoricCard, { HistoricCardProps } from "../../components/HistoricCard";

import * as Styles from "./styles";

const Home: React.FC = () => {
  const [vehicleInUse, setVehicleInUse] = React.useState<Historic | null>(null);
  const [historicCards, setHistoricCards] = React.useState<HistoricCardProps[]>(
    []
  );

  const { navigate } = useNavigation();

  const historic = useQuery(Historic);
  const realm = useRealm();

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

  const fetchHistoric = () => {
    try {
      const arrivalHistoric = historic.filtered(
        'status = "arrival" SORT(created_at DESC)'
      );

      const _historicCards = arrivalHistoric.map(
        ({ _id, license_plate, createed_at }) => ({
          id: _id,
          licensePlate: license_plate,
          created: dayjs(createed_at).format(
            "[Saída em] DD/MM/YYYY [às] HH:mm"
          ),
          isSync: false,
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
  }, []);

  return (
    <Styles.Container>
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
