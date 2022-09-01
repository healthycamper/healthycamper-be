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

export const getEvents = async (
  eventType: "GLUCOSE" | "INSULIN" | "CARBS",
  camperId?: string
): Promise<Events[]> => {
  try {
    if (
      eventType !== "CARBS" &&
      eventType !== "GLUCOSE" &&
      eventType !== "INSULIN"
    )
      throw new Error(
        'Events must be requested by one of the following types "GLUCOSE", "INSULIN", "CARBS".'
      );

    const events = await prisma.events.findMany({
      where: {
        type: eventType,
        camperId,
      },
    });

    return events;
  } catch (error) {
    console.warn(
      `Error occured with getting events of type ${eventType}: ${error}`
    );
    throw error;
  }
};
