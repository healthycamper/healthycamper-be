import { fastify, FastifyInstance } from "fastify";
import camper from "./routes/campers";
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

  server.register(camper, { prefix: "campers" });

  server.get("/", (req, reply) => {
    reply.send({ ping: "pong" });
  });

  return server;
}

export default buildServer;
