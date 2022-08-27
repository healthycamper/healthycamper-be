/* eslint-disable @typescript-eslint/ban-ts-comment */
import buildServer from "../../src/server/app";

describe("Camper Routes", () => {
  const app = buildServer();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => app.close());
  it("POST to /new returns a new camper", async () => {
    const camper = {
      name: "Little Jonny",
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

    const fields = [
      "id",
      "name",
      "age",
      "diagnosis",
      "gender",
      "parent",
      "doctor",
      "medication",
    ];

    const response = await app.inject({
      method: "POST",
      url: "/campers/new",
      payload: camper,
    });

    expect(response.statusCode).toEqual(200);

    for (const field of fields) {
      expect(JSON.parse(response.body)).toHaveProperty(field);
    }
  });
});
