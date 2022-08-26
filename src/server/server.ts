import { fastify, FastifyInstance } from "fastify";
const server: FastifyInstance = fastify({
  ignoreTrailingSlash: true,
  logger: true,
});

server.get("/signup", (req, reply) => {
  reply.send({ message: "signed up user" });
});

server.get("/signin", (req, reply) => {
  reply.send({ message: "signed in user"});
});

server.get("/", (req, reply) => {
  reply.send({ ping: "pong" });
});

server.listen({ port: 3000 }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
