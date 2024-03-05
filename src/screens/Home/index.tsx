import React from "react";

import HomeHeader from "../../components/HomeHeader";

import * as Styles from "./styles";

const Home: React.FC = () => {
  return (
    <Styles.Container>
      <HomeHeader />
    </Styles.Container>
  );
};

export default Home;
