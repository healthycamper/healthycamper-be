import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import { Events } from "@prisma/client";
import { addEvents, getEvents } from "../controllers/events";

export default function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  const schemas = ["event"];
  schemas.forEach((schema) => fastify.getSchema(schema));

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: {
        type: "object",
        properties: {
          eventType: { type: "string" },
          camperId: { type: "string" },
        },
        required: ["eventType"],
      },
      response: {
        200: {
          type: "array",
          items: {
            $ref: "event#",
          },
        },
      },
    },
    handler: async function (
      request: FastifyRequest<{
        Querystring: {
          eventType: "GLUCOSE" | "INSULIN" | "CARBS";
          camperId?: string;
        };
      }>,
      reply
    ) {
      try {
        const { eventType, camperId } = request.query;

        const events = await getEvents(eventType, camperId);

        return reply
          .code(200)
          .header("Content-Type", "application/json")
          .send(events);
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
        type: "array",
        items: {
          type: "object",
          $ref: "event#",
          required: ["camperId", "counselorId", "quantity", "type"],
        },
      },
      response: {
        200: {
          count: { type: "integer" },
        },
      },
    },
    handler: async function (request, reply) {
      try {
        const events = request.body as Events[];

        const response = await addEvents(events);

        reply
          .code(200)
          .header("Content-Type", "application/json")
          .send(response);
      } catch (error) {
        console.warn(error);
        throw error;
      }
    },
  });

  done();
}
