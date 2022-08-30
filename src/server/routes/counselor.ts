import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from "fastify";
import { schema } from "../schemas";

// write controllers w/ prisma
// test controllers w/jest
// write routes w/schema validation

const routes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  // fastify.post("/new",
  //   {
  //     body: {
  //     }
  //   },
  //   (request, reply) => {
  //   })
};
// structure:
// schema validation
// auth(?) - maybe auth is passed in with the options object from the parent
// handler:
// executes the 'controller' functions for the db logic execution
// controllers receive and return as little information as possible
export default routes;
