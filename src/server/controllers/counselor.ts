import prisma from "../db/client";
import { NewCounselor } from "../../../types/types";

const addCounselor = (counselor: NewCounselor) => {
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

const getCounselor = (counselorId: string) => {
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

// const updateCounselor = ()
// editCounselor
// deleteCounselor
