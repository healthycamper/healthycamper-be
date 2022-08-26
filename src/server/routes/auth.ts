import { FastifyInstance } from "fastify";

const routes = (fastify: FastifyInstance, options: object, done: any) => {
  fastify.post("/signup", (req, reply) => {
    return { message: "signed up user" };
  });
  fastify.post("/signin", (req, res) => {
    return { message: "signed in user" };
  });
  done();
};

export default routes;
