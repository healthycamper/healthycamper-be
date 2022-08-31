import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import { schema } from "../schema";
import { Events } from "@prisma/client";
import { addEvents } from "../controllers/events";

export default function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  const schemas = ["event "];
  schemas.forEach((schema) => fastify.getSchema(schema));

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
