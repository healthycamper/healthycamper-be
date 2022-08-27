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

    return camper;
  } catch (error) {
    console.warn(`Error occured adding a camper: ${error}`);
    throw error;
  }
};

export const editCamper = async (
  id: string,
  updatedCamper: Partial<Camper>
): Promise<Camper> => {
  try {
    if (id === undefined) throw new Error("Camper Id must be provided");

    const camper: Camper = await prisma.camper.update({
      where: { id: id },
      data: { ...updatedCamper },
    });

    return camper;
  } catch (error) {
    console.warn(`Error occured editing a camper: ${error}
    camper id: ${updatedCamper.id}`);
    throw error;
  }
};
