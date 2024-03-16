import { Realm } from "@realm/react";

import * as Coords from "./Coords";

type GenerateProps = {
  user_id: string;
  license_plate: string;
  description: string;
  coords: Coords.GenerateProps[];
};

class Historic extends Realm.Object<Historic> {
  _id!: string;
  user_id!: string;
  license_plate!: string;
  description!: string;
  status!: string;
  createed_at!: Date;
  updated_at!: Date;
  coords!: Coords.GenerateProps[];

  static generate(props: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      status: "departure",
      createed_at: new Date(),
      updated_at: new Date(),
      ...props,
    };
  }

  static schema: Realm.ObjectSchema = {
    name: "Historic",
    primaryKey: "_id",

    properties: {
      _id: "uuid",
      user_id: {
        type: "string",
        indexed: true,
      },
      license_plate: "string",
      description: "string",
      status: "string",
      createed_at: "date",
      updated_at: "date",
      coords: {
        type: "list",
        objectType: "Coords",
      },
    },
  };
}

export default Historic;
