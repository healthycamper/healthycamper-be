import { fastify, FastifyInstance } from "fastify";
import camper from "./routes/campers";
import authRoutes from "./routes/auth";

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
  server.register(authRoutes, { prefix: "counselors" });

  server.get("/", (req, reply) => {
    reply.send({ ping: "pong" });
  });

  return server;
}

export default buildServer;
