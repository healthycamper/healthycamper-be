/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Camper } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { addCamper } from "../../src/server/controllers/campers";
import { prismaMock } from "../../src/server/db/prismaMock";

describe("addCamper", () => {
  const camper: Camper = {
    id: "630834d8f69c5f3228a7ddc1",
    name: "Little Billy",
    age: 8,
    gender: "Male",
    diagnosis: "TYPE1",
    parent: {
      name: "Billy's Dad",
      relation: "Dad",
      phoneNumber: "123-456-7890",
      email: "billysdad@testemail.com",
    },
    doctor: {
      name: "Billy's Doc",
      relation: "Doctor",
      phoneNumber: "123-456-7890",
      email: "billysdoc@testemail.com",
    },
    medication: [
      {
        name: "Diabetes Meds",
        dosage: 50,
        dosageUnits: "mg",
      },
    ],
  };

  it("should create a new camper", async () => {
    camper.id = faker.random.alphaNumeric(24);
    prismaMock.camper.create.mockResolvedValue(camper);

    // @ts-expect-error
    await expect(addCamper(camper)).resolves.toEqual({
      id: "630834d8f69c5f3228a7ddc1",
      name: "Little Billy",
      age: 8,
      gender: "Male",
      diagnosis: "TYPE1",
      parent: {
        name: "Billy's Dad",
        relation: "Dad",
        phoneNumber: "123-456-7890",
        email: "billysdad@testemail.com",
      },
      doctor: {
        name: "Billy's Doc",
        relation: "Doctor",
        phoneNumber: "123-456-7890",
        email: "billysdoc@testemail.com",
      },
      medication: [
        {
          name: "Diabetes Meds",
          dosage: 50,
          dosageUnits: "mg",
        },
      ],
    });
  });

  it("should fail if any field on a camper is missing", async () => {
    for (const field of Object.keys(camper)) {
      if (field === "id") continue;

      const badCamper = {
        ...camper,
        field: null,
        id: faker.random.alphaNumeric(24),
      };
      // @ts-expect-error
      prismaMock.camper.create(badCamper);
      // @ts-expect-error
      await expect(addCamper(badCamper)).rejects.toHaveProperty(
        "error",
        `${field} is required`
      );
    }
  });
});
