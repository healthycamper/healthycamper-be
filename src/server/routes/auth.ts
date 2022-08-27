import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";

const routes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.post("/signup", (req, reply) => {
    return { message: "signed up user" };
  });
  fastify.post("/signin", (req, res) => {
    return { message: "signed in user" };
  });
  done();
};

export default routes;
