import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { UserController } from '../controller/user.controller';

export default fastifyPlugin(


  async (server: FastifyInstance, opts, next) => {
    const userController = new UserController();
    /**
     * @description This route add the user
     *
     * @since      0.0.1
     * @author     Mohit Sharma
     *
     * @request    POST
     * @route      /api/add-user
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'POST',
      url: '/api/add-user',
      schema: {
        tags: ["user"],
        description: "To add User.",
        body: {
          type: 'object',
          properties: {
            userData: {
              type: "object",
              properties: {
                email: { type: 'string', example: "sample@gmail.com" },
                userName: { type: 'string', example: "Dev" },
                roles: { type: 'array', items: { type: 'string', example: "6082605db04f7a0ec10452fc" } },
                mobileNo: { type: 'number', example: 9000080000 },
                designation: { type: 'string', example: "Manager" },
                cost: { type: 'number', example: 5012 },
                location: { type: 'string', example: "Mumbai" }
              }
            }
          }
        },
        summary: "Summary To add user"
      },
      handler: async (request, reply) => {


        const response = await userController.addUser(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route get the users.
     *
     * @since      0.0.1
     * @author     Mohit Sharma
     *
     * @request    GET
     * @route      /api/get-users-list
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'GET',
      url: '/api/get-users-list',
      schema: {
        tags: ["user"],
        description: "To get User",
        summary: "Summary to get user ",
      },
      handler: async (request, reply) => {
        const response = await userController.getUsers(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });



    /**
     * @description This route get the users.
     *
     * @since      0.0.1
     * @author     Mohit Sharma
     *
     * @request    GET
     * @route      /api/get-users-list
     * @memberof   fastifyPlugin
     */
     server.route({
      method: 'GET',
      url: '/api/location',
      schema: {
        tags: ["user"],
        querystring:{
          type: 'object',
          properties: {
              lat:{type:'number',example:'45.706179'}
          ,    long:{type:'number',example:'40.402140'}
            },
        },
        description: "To get User's location",
        summary: "Summary to get user location",
      },
      handler: async (request, reply) => {
        const response = await userController.getUserLocation(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route login the user.
     *
     * @since      0.0.1
     * @author     Mohit Sharma
     *
     * @request    POST
     * @route      /api/login
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'POST',
      url: '/api/login',
      schema: {
        tags: ["user"],
        description: "Uses the user-details in token fetch the user details",
        summary: "Summary to Login user "
      },
      handler: async (request, reply) => {

        const response = await userController.login(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route get the user via email.
     *
     * @since      0.0.1
     * @author     Mohit Sharma
     *
     * @request    GET
     * @route      /api/get-user-by-email
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'GET',
      url: '/api/get-user-by-email',
      schema: {
        tags: ["user"],
        description: "Uses the user-details in token fetch the user details",
        summary: "Get users object using users email address"
      },
      handler: async (request, reply) => {

        const response = await userController.getUserFromDB(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route update the user details.
     *
     * @since      0.0.1
     * @author     Mohit Sharma
     *
     * @request    POST
     * @route      /api/update-user
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'POST',
      url: '/api/update-user',
      schema: {
        tags: ["user"],
        description: "To update user details",
        summary: "Update Users details.",
        body: {
          type: 'object',
          properties: {
            userData: {
              type: "object",
              properties: {
                email: { type: 'string', example: "sample@gmail.com" },
                userName: { type: 'string', example: "Dev" },
                roles: { type: 'array', items: { type: 'string', example: "6082605db04f7a0ec10452fc" } },
                mobileNo: { type: 'number', example: 9000080000 },
                designation: { type: 'string', example: "Manager" },
                cost: { type: 'number', example: 5012 },
                location: { type: 'string', example: "Mumbai" }
              }
            }
          }
        }
      },
      handler: async (request, reply) => {
        const response = await userController.updateUser(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route get the notifications.
     *
     * @since      0.0.2
     * @author     Mohit Sharma
     *
     * @request    GET
     * @route      /api/get-notification
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'GET',
      url: '/api/get-notification',
      schema: {
        tags: ["user"],
        description: "Get notifications array using this route",
        summary: "Get notifications"
      },
      handler: async (request, reply) => {
        const response = await userController.getNotificationByUser(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route add the client details.
     *
     * @since      0.0.2
     * @author     Mohit Sharma
     *
     * @request    POST
     * @route      /api/save-client
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'POST',
      url: '/api/save-client',
      schema: {
        tags: ["user"],
        body: {
          type: "object",
          properties: {
            clientName: { type: "string" },
          }
        }
      },
      handler: async (request, reply) => {
        const response = await userController.saveClientNames(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route get the client details.
     *
     * @since      0.0.2
     * @author     Mohit Sharma
     *
     * @request    GET
     * @route      /api/get-client
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'GET',
      url: '/api/get-client',
      schema: {
        tags: ["user"],
        description: "Get clients object",
        summary: "Get clients details"
      },
      handler: async (request, reply) => {
        const response = await userController.getClientLists(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route gets all users.
     *
     * @since      0.0.2
     * @author     Mohit Sharma
     *
     * @request    GET
     * @route      /api/get-all-user
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'GET',
      url: '/api/get-all-users',
      schema: {
        tags: ["user"],
        summary: "Get all users",
        description: "Get all users"
      },
      handler: async (request, reply) => {
        const response = await userController.getUserListFromDB(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route set the user verfication key true.
     *
     * @since      0.0.2
     * @author     Mohit Sharma
     *
     * @request    POST
     * @route      /api/set-user-verification'
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'POST',
      url: '/api/set-user-verification',
      schema: {
        tags: ["user"],
        summary: "Set user verification key",
        description: "To set users verification key in user object true or false ",
        body: {
          type: "object",
          properties: {
            params: {
              type: "object",
              properties: {
                id: { type: "string", example: "60acd4781d4e4227e4068ec5" },
              }
            }
          }
        }
      },
      handler: async (request, reply) => {
        const response = await userController.setUserVerification(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route get the user object via any property.
     *
     * @since      0.0.2
     * @author     Mohit Sharma
     *
     * @request    POST
     * @route      /api/get-user
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'POST',
      url: '/api/get-user',
      schema: {
        tags: ["user"],
        summary: "Get user object using any property",
        description: "Get user object using any property",
        body: {
          type: "object",
          properties: {
            params: {
              type: "object",
              properties: {
                _id: { type: "string", example: "60acd4781d4e4227e4068ec5" },
                email: { type: 'string', example: "sample@gmail.com" },
                userName: { type: 'string', example: "Dev" },
                roles: { type: 'array', items: { type: 'string', example: "6082605db04f7a0ec10452fc" } },
                mobileNo: { type: 'number', example: 9000080000 },
                designation: { type: 'string', example: "Manager" },
                cost: { type: 'number', example: 5012 },
                location: { type: 'string', example: "Mumbai" }
              }
            }
          }
        }
      },
      handler: async (request, reply) => {
        const response = await userController.getUser(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This route update the user details in azure.
     *
     * @since      0.0.2
     * @author     Mohit Sharma
     *
     * @request    POST
     * @route      /api/update-azure-user
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'POST',
      url: '/api/update-azure-user',
      schema: {
        tags: ["user"],
        description: "Update users object in azure",
        summary: "Update user in azure",
        body: {
          type: "object",
          properties: {
            userData: {
              type: "object",
              properties: {
                mail: { type: "string", example: "sample@gmail.com" }
              }
            }
          }
        }
      },
      handler: async (request, reply) => {

        const response = await userController.updateUsersInAzureDB(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    /**
     * @description This update notification read key value in true.
     *
     * @since      0.0.2
     * @author     Mohit Sharma
     *
     * @request    POST
     * @route      /api/update-notification
     * @memberof   fastifyPlugin
     */
    server.route({
      method: 'POST',
      url: '/api/update-notification',
      schema: {
        tags: ["user"],
        description: "Update notifications read property",
        summary: "Update Notification read value",
        body: {
          type: "object",
          properties: {
            params: {
              type: "object",
              properties: {
                _id: { type: "string", example: "60d5640e5c7a765efcdf808a" }
              }
            }
          }
        }
      },
      handler: async (request, reply) => {

        const response = await userController.updateNotification(
          server,
          request,
          reply
        );
        return reply.send(response);
      }
    });
    next();
  },
  {
    fastify: "3.14.x",
    name: "user-plugin",
    decorators: {
      fastify: [],
      reply: [],
    },
    dependencies: ["fastify-redis", "fastify-swagger"],
  }
);
