import { fastify, FastifyInstance } from "fastify";
import camper from "./routes/campers";

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

  server.register(camper, { prefix: "campers" });

  server.get("/", (req, reply) => {
    reply.send({ ping: "pong" });
  });

  return server;
}

export default buildServer;
