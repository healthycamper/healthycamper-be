import { Events } from "@prisma/client";
import prisma from "../db/client";

interface BatchPayload {
  count: number;
}

export const addEvents = async (events: Events[]): Promise<BatchPayload> => {
  try {
    if (!Array.isArray(events))
      throw new Error("Events must be sent as an array");

    const response = await prisma.events.createMany({
      data: events,
    });

    return response;
  } catch (error) {
    console.warn(`Error occured with adding events: ${error}`);
    throw error;
  }
};
