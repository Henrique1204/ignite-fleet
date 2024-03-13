import { Realm } from "@realm/react";

type GenerateProps = {
  user_id: string;
  license_plate: string;
  description: string;
};

class Historic extends Realm.Object<Historic> {
  _id!: string;
  user_id!: string;
  license_plate!: string;
  description!: string;
  status!: string;
  createed_at!: Date;
  updated_at!: Date;

  static generate({ description, license_plate, user_id }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      license_plate,
      description,
      status: "departure",
      createed_at: new Date(),
      updated_at: new Date(),
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
    },
  };
}

export default Historic;
