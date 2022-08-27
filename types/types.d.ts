import { Camper } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewCamper extends Omit<Camper, "id"> {}

export interface Contact {
  name: string;
  relation: "Mom" | "Dad" | "Doctor";
  phoneNumber: string;
  email: string;
}

export interface Medication {
  name: string;
  dosage: number;
  dosageUnits: string;
}

export interface Events {
  id?: string;
  camperId: string;
  counselorId: string;
  quantity: number;
  timestamp?: Date;
  type: "GLUCOSE" | "CARBS" | "INSULIN";
}
