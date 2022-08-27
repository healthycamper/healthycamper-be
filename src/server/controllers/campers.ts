import { NewCamper } from "../../../types/types";
import { Camper } from "@prisma/client";
import prisma from "../db/client";

export const addCamper = async (newCamper: NewCamper): Promise<Camper> => {
  const fields: string[] = [
    "name",
    "age",
    "diagnosis",
    "gender",
    "parent",
    "doctor",
    "medication",
  ];
  try {
    for (const field of fields) {
      if (Object.prototype.hasOwnProperty.call(newCamper, field) === false)
        throw new Error(`${field} is required`);
    }

    const camper = await prisma.camper.create({ data: newCamper });
    console.log(camper);
    return camper;
  } catch (error) {
    console.warn(`Error occured adding a camper: ${error}`);
    throw error;
  }
};
