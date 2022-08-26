import { fastify, FastifyInstance } from "fastify";
import authRoutes from "./routes/auth";

const server: FastifyInstance = fastify({
  ignoreTrailingSlash: true,
  logger: true,
});

server.register(authRoutes);

server.get("/", (req, reply) => {
  reply.send({ ping: "pong" });
});

server.listen({ port: 3000 }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
