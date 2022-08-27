import prisma from "../db/client";
import { NewCounselor } from "../../../types/types";

export const addCounselor = (counselor: NewCounselor) => {
  let addedCounselor;
  try {
    addedCounselor = prisma.counselor.create({
      data: counselor,
    });
  } catch (error) {
    throw new Error(`Error in addCounselor:\n ${error}`);
  }

  return addedCounselor;
};

export const getCounselor = (counselorId: string) => {
  let counselor;
  try {
    counselor = prisma.counselor.findUnique({
      where: {
        id: counselorId,
      },
    });
  } catch (error) {
    throw new Error(`Error in getCounselor:\n ${error}`);
  }

  return counselor;
};

export const updateCounselor = (
  counselor: Partial<NewCounselor>,
  counselorId: string
) => {
  let updatedCounselor;
  try {
    updatedCounselor = prisma.counselor.update({
      data: counselor,
      where: { id: counselorId },
    });
  } catch (error) {
    throw new Error(`Error in updateCounselor:\n ${error}`);
  }

  return updatedCounselor;
};

export const deleteCounselor = (counselorId: string) => {
  let deletedCounselor;
  try {
    deletedCounselor = prisma.counselor.delete({
      where: { id: counselorId },
    });
  } catch (error) {
    throw new Error(`Error in updateCounselor:\n ${error}`);
  }

  return deletedCounselor;
};
