import { faker } from "@faker-js/faker";
import { Events } from "@prisma/client";
import { addEvents } from "../../src/server/controllers/events";
import { prismaMock } from "../../src/server/db/prismaMock";

describe("Event Methods", () => {
  describe("addEvents", () => {
    const counselorId = "630ebcbcf8efd96aa198576c";
    const camperId = "630a8944f766543ee45d8037";

    const eventGlucose: Partial<Events> = {
      camperId,
      counselorId,
      type: "GLUCOSE",
      quantity: 30,
    };

    const eventInsulin: Partial<Events> = {
      camperId,
      counselorId,
      type: "INSULIN",
      quantity: 30,
    };

    const eventCarbs: Partial<Events> = {
      camperId,
      counselorId,
      type: "CARBS",
      quantity: 30,
    };

    it("Adds an event", async () => {
      const data: Events[] = [
        {
          ...(eventCarbs as Events),
          id: faker.database.mongodbObjectId(),
          timestamp: new Date() as Date,
        },
      ];

      prismaMock.events.createMany.mockResolvedValue({ count: data.length });

      await expect(addEvents(data)).resolves.toEqual({ count: 1 });
    });

    it("Adds multiple events", async () => {
      const data = [
        {
          ...(eventCarbs as Events),
          id: faker.database.mongodbObjectId(),
          timestamp: new Date() as Date,
        },
        {
          ...(eventGlucose as Events),
          id: faker.database.mongodbObjectId(),
          timestamp: new Date() as Date,
        },
        {
          ...(eventInsulin as Events),
          id: faker.database.mongodbObjectId(),
          timestamp: new Date() as Date,
        },
      ];

      prismaMock.events.createMany.mockResolvedValue({ count: data.length });

      await expect(addEvents(data)).resolves.toEqual({ count: 3 });
    });
  });
});
