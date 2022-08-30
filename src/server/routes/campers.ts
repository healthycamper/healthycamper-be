import { Camper } from "@prisma/client";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import { NewCamper } from "types";
import { addCamper, editCamper, getAllCampers } from "../controllers/campers";

export default function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  const schemas = ["contact", "medication", "event", "camper"];
  schemas.forEach((schema) => fastify.getSchema(schema));

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            $ref: "camper#",
          },
        },
      },
    },
    handler: async function (request, reply) {
      try {
        const campers = await getAllCampers();

        return reply
          .code(200)
          .header("Content-Type", "application/json")
          .send(campers);
      } catch (error) {
        console.warn(error);
        throw error;
      }
    },
  });

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
            $ref: "contact#",
            required: ["name", "relation", "phoneNumber", "email"],
          },
          doctor: {
            type: "object",
            $ref: "contact#",
            required: ["name", "relation", "phoneNumber", "email"],
          },
          medication: {
            type: "array",
            items: {
              type: "object",
              $ref: "medication#",
              required: ["name", "dosage", "dosageUnits"],
            },
          },
          events: {
            type: "array",
            items: {
              type: "object",
              $ref: "event#",
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
              $ref: "contact#",
              required: ["name", "relation", "phoneNumber", "email"],
            },
            doctor: {
              type: "object",
              $ref: "contact#",
              required: ["name", "relation", "phoneNumber", "email"],
            },
            medication: {
              type: "array",
              items: {
                medication: {
                  type: "object",
                  $ref: "medication#",
                  required: ["name", "dosage", "dosageUnits"],
                },
              },
            },
            events: {
              type: "array",
              items: {
                events: {
                  type: "object",
                  $ref: "event#",
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

  fastify.route({
    method: "PUT",
    url: "/edit",
    schema: {
      querystring: {
        camperId: { type: "string" },
      },
      body: {
        type: "object",
        properties: {
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
              $ref: "contact#",
              required: ["name", "relation", "phoneNumber", "email"],
            },
            doctor: {
              type: "object",
              $ref: "contact#",
              required: ["name", "relation", "phoneNumber", "email"],
            },
            medication: {
              type: "array",
              items: {
                medication: {
                  type: "object",
                  $ref: "medication#",
                  required: ["name", "dosage", "dosageUnits"],
                },
              },
            },
            events: {
              type: "array",
              items: {
                events: {
                  type: "object",
                  $ref: "contact#",
                  required: ["camperId", "counselorId", "quantity", "type"],
                },
              },
            },
          },
          required: [
            "id",
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
    handler: async function (
      request: FastifyRequest<{ Querystring: { camperId: string } }>,
      reply
    ) {
      try {
        const updates: Partial<Camper> = request.body as Partial<Camper>;
        const { camperId } = request.query;

        const camper: Camper = await editCamper(camperId, updates);

        reply.code(200).header("Content-Type", "application/json").send(camper);
      } catch (error) {
        console.warn(error);
        throw error;
      }
    },
  });

  done();
}
