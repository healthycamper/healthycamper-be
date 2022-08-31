import { fastify, FastifyInstance } from "fastify";
import camper from "./routes/campers";
import events from "./routes/events";
import { schema } from "./schema";
function buildServer() {
  const server: FastifyInstance = fastify({
    ignoreTrailingSlash: true,
    logger: true,
    ajv: {
      customOptions: {
        strict: "log",
      },
    },
  });

  schema.forEach((schema) => server.addSchema(schema));

  server.get("/signup", (req, reply) => {
    reply.send({ message: "signed up user" });
  });

  server.get("/signin", (req, reply) => {
    reply.send({ message: "signed in user" });
  });

  server.register(camper, { prefix: "campers" });
  server.register(events, { prefix: "events" });

  return server;
}

export default buildServer;
