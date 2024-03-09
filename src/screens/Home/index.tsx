import React from "react";

import { useNavigation } from "@react-navigation/native";

import CarStatus from "../../components/CarStatus";
import HomeHeader from "../../components/HomeHeader";

import * as Styles from "./styles";

const Home: React.FC = () => {
  const { navigate } = useNavigation();

  const goToDeparture = () => navigate('departure');

  return (
    <Styles.Container>
      <HomeHeader />

      <Styles.Content>
        <CarStatus onPress={goToDeparture} />
      </Styles.Content>
    </Styles.Container>
  );
};

export default Home;
