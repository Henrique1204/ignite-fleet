import React from "react";

import BackgroundImage from '../../assets/background.png';
import Button from "../../components/Button";

import * as Styles from './styles';

const SignIn: React.FC = () => {
  return <Styles.Container source={BackgroundImage}>
    <Styles.Title>
      Ignite Fleet
    </Styles.Title>

    <Styles.Slogan>
      Gestão de uso de veículos
    </Styles.Slogan>

    <Button title="Entrar com Google" />
  </Styles.Container>;
};

export default SignIn;
