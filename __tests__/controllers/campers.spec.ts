/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Camper, Contact } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { addCamper, editCamper } from "../../src/server/controllers/campers";
import { prismaMock } from "../../src/server/db/prismaMock";

// @ts-expect-error
const camper: Camper = {
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
const id = faker.database.mongodbObjectId();
camper.id = id;

describe("Camper Methods", () => {
  describe("addCamper", () => {
    it("should create a new camper", async () => {
      prismaMock.camper.create.mockResolvedValue(camper);

      await expect(addCamper(camper)).resolves.toEqual({
        id,
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
        };

        // @ts-expect-error
        delete badCamper[field];

        // prismaMock.camper.create(badCamper);
        await expect(addCamper(badCamper)).rejects.toHaveProperty(
          "message",
          `${field} is required`
        );
      }
    });
  });

  describe("editCamper", () => {
    it("Updates the fields passed in as arguments", async () => {
      const fields = {
        age: Number(faker.random.numeric()),
        diagnosis: "TYPE2",
        gender: "Female",
      };

      for (const [field, value] of Object.entries(fields)) {
        const updates = {};
        // @ts-expect-error
        updates[field] = value;
        const updatedCamper: Camper = { ...camper, ...updates };

        prismaMock.camper.update.mockResolvedValue(updatedCamper);
        const editedCamper = await editCamper(id, updates);
        expect(editedCamper).toHaveProperty(field, value);
      }
    });

    it("Can edit multiple fields", async () => {
      const name = faker.name.fullName();
      const age = Number(faker.random.numeric());
      const updates = {
        name,
        age,
      };

      const updatedCamper = { ...camper, ...updates };
      prismaMock.camper.update.mockResolvedValue(updatedCamper);

      const editedCamper = await editCamper(id, updates);

      expect(editedCamper.name).toEqual(name);
      expect(editedCamper.age).toEqual(age);
    });

    it("Can edit nested fields", async () => {
      const editedParents: Contact = {
        name: "Billy's Mom",
        phoneNumber: "0987654321",
        relation: "Mom",
        email: "billysmom@testemail.com",
      };

      const updatedCamper = { ...camper, parent: editedParents };

      prismaMock.camper.update.mockResolvedValue(updatedCamper);

      const editedCamper = await editCamper(id, { parent: editedParents });

      expect(editedCamper.parent).toEqual({
        name: "Billy's Mom",
        phoneNumber: "0987654321",
        relation: "Mom",
        email: "billysmom@testemail.com",
      });
    });

    it("Throws an error if a field's type is changed", async () => {
      const updatedCamper = { ...camper, name: 55 };

      // @ts-expect-error
      prismaMock.camper.update.mockResolvedValue(updatedCamper);

      // @ts-expect-error
      await expect(editCamper(id, { name: 55 })).rejects.toThrowError();
    });

    it("Throws an error if a camper id is not provided", async () => {
      await expect(
        // @ts-expect-error
        editCamper(undefined, { ...camper, id: undefined })
      ).rejects.toHaveProperty("message", "Camper Id must be provided");
    });
  });
});
