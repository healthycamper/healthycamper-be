import { fastify, FastifyInstance } from "fastify";
import camper from "./routes/camper";

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

server.listen({ port: 3000 }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
