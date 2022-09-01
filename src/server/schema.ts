export const schema = [
  {
    $id: "contact",
    type: "object",
    properties: {
      name: { type: "string" },
      relation: { type: "string" },
      phoneNumber: { type: "string" },
      email: { type: "string" },
    },
  },
  {
    $id: "medication",
    type: "object",
    properties: {
      name: { type: "string" },
      dosage: { type: "integer" },
      dosageUnits: { type: "string" },
    },
  },
  {
    $id: "event",
    type: "object",
    properties: {
      camperId: { type: "string" },
      counselorId: { type: "string" },
      quantity: { type: "number" },
      type: { type: "string" },
    },
  },
  {
    $id: "camper",
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      age: { type: "integer" },
      diagnosis: { type: "string" },
      gender: { type: "string" },
      parent: {
        type: "object",
        $ref: "contact#",
      },
      doctor: {
        type: "object",
        $ref: "contact#",
      },
      medication: {
        type: "array",
        items: {
          type: "object",
          $ref: "medication#",
        },
      },
      events: {
        type: "array",
        items: {
          type: "object",
          $ref: "event#",
        },
      },
    },
  },
];
