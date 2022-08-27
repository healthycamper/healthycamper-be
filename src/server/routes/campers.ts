import { Camper } from "@prisma/client";
import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import { NewCamper } from "types";
import { addCamper } from "../controllers/campers";

export default function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  fastify.route({
    method: "POST",
    url: "/new",
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "integer" },
          diagnosis: { type: "string" },
          gender: { type: "string" },
          parent: {
            type: "object",
            properties: {
              name: { type: "string" },
              relation: { type: "string" },
              phoneNumber: { type: "string" },
              email: { type: "string" },
            },
            required: ["name", "relation", "phoneNumber", "email"],
          },
          doctor: {
            type: "object",
            properties: {
              name: { type: "string" },
              relation: { type: "string" },
              phoneNumber: { type: "string" },
              email: { type: "string" },
            },
            required: ["name", "relation", "phoneNumber", "email"],
          },
          medication: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                dosage: { type: "integer" },
                dosageUnits: { type: "string" },
              },
              required: ["name", "dosage", "dosageUnits"],
            },
          },
          events: {
            type: "array",
            items: {
              type: "object",
              properties: {
                camperId: { type: "string" },
                counselorId: { type: "integer" },
                quantity: { type: "number" },
                type: { type: "string" },
              },
              required: ["camperId", "counselorId", "quantity", "type"],
            },
          },
        },
        required: [
          "name",
          "age",
          "diagnosis",
          "gender",
          "parent",
          "doctor",
          "medication",
        ],
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            age: { type: "integer" },
            diagnosis: { type: "string" },
            gender: { type: "string" },
            parent: {
              type: "object",
              properties: {
                name: { type: "string" },
                relation: { type: "string" },
                phoneNumber: { type: "string" },
                email: { type: "string" },
              },
              required: ["name", "relation", "phoneNumber", "email"],
            },
            doctor: {
              type: "object",
              properties: {
                name: { type: "string" },
                relation: { type: "string" },
                phoneNumber: { type: "string" },
                email: { type: "string" },
              },
              required: ["name", "relation", "phoneNumber", "email"],
            },
            medication: {
              type: "array",
              items: {
                medication: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    dosage: { type: "integer" },
                    dosageUnits: { type: "string" },
                  },
                  required: ["name", "dosage", "dosageUnits"],
                },
              },
            },
            events: {
              type: "array",
              items: {
                events: {
                  type: "object",
                  properties: {
                    camperId: { type: "string" },
                    counselorId: { type: "integer" },
                    quantity: { type: "number" },
                    type: { type: "string" },
                  },
                  required: ["camperId", "counselorId", "quantity", "type"],
                },
              },
            },
          },
          required: [
            "name",
            "age",
            "diagnosis",
            "gender",
            "parent",
            "doctor",
            "medication",
          ],
        },
      },
    },
    handler: async function (request, reply) {
      try {
        const newCamper: NewCamper = request.body as NewCamper;
        const camper: Camper = await addCamper(newCamper);

        reply.code(200).header("Content-Type", "application/json").send(camper);
      } catch (error) {
        console.warn(error);
        throw error;
      }
    },
  });

  done();
}
