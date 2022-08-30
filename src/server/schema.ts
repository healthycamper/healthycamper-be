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
      counselorId: { type: "integer" },
      quantity: { type: "number" },
      type: { type: "string" },
    },
  },
  {
    $id: "counselor",
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      phone: { type: "phone" },
    },
  },
];
