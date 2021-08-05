import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { TravelAndExpenseController } from '../controller/travel-expense.controller';

export default fastifyPlugin(


  async (server: FastifyInstance, opts, next) => {
    const travelAndExpenseController = new TravelAndExpenseController();

    server.route({
      method: 'POST',
      url: '/api/add-expense',
      schema: {
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            project: { type: 'string' },
            from: { type: 'string' },
            to: { type: 'string' },
            travelDate: { type: 'string' },
            departure: { type: 'string' },
            arrival: { type: 'string' },
            amount: { type: 'number' },
            comment: { type: 'string' },
            status: { type: 'string' }
          }

        }
        ,

      },
      handler: async (request, reply) => {
        const response = await travelAndExpenseController.addExpense(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });

    server.route({
      method: 'GET',
      url: '/api/get-all-expense',

      handler: async (request, reply) => {
        const response = await travelAndExpenseController.getExpense(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });

    server.route({
      method: 'POST',
      url: '/api/get-expenses-by-id',
      schema: {
        body: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        }
      },
      handler: async (request, reply) => {
        const response = await travelAndExpenseController.getExpensesByProjectId(
          server,
          request,
          reply
        );

        return reply.code(200).send(response);
      }
    });

    next();
  },
  // {
  //   fastify: "3.x",
  //   name: "user-plugin",
  //   decorators: {
  //     fastify: [],
  //     reply: [],
  //   },
  //   dependencies: ["fastify-redis", "fastify-swagger"],
  // }
);
