import { Realm } from "@realm/react";

export type GenerateProps = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

class Coords extends Realm.Object<Coords> {
  latitude!: number;
  longitude!: number;
  timestamp!: number;

  static generate(props: GenerateProps) {
    return props;
  }

  static schema: Realm.ObjectSchema = {
    name: "Coords",
    // Serve para definir que esse schema será utilizado dentro de outro.
    embedded: true,

    properties: {
      latitude: "float",
      longitude: "float",
      timestamp: "float",
    },
  };
}

export default Coords;
