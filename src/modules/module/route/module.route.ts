import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { ModuleController } from '../controller/module.controller';

export default fastifyPlugin(
    async (server: FastifyInstance, opts, next) => {
        const moduleController = new ModuleController();

        /**
         * @description This route add the module
         *
         * @since      0.0.1
         * @author     Mohit Sharma
         *
         * @request    POST
         * @route      /api/save-module
         * @memberof   fastifyPlugin
         */
        server.route({
            method: 'POST',
            url: '/api/save-module',
            schema: {
                tags:["module"],
                body: {
                    type: 'object',
                    properties: {
                        moduleName: { type: 'string' }
                    }
                }
            },
            handler: async (request, reply) => {
                try {
                    const response = await moduleController.saveModule(
                        server,
                        request,
                        reply
                    );
                    return reply.code(200).send(response);
                } catch (error) {
                    return reply.send(error);
                }
            }
        });

        /**
         * @description This route returns all the modules
         *
         * @since      0.0.1
         * @author     Mohit Sharma
         *
         * @request    GET
         * @route      /api/get-all-modules
         * @memberof   fastifyPlugin
         */
        server.route({
            method: 'GET',
            url: '/api/get-all-modules',
            schema: {
                tags:["module"],
            },
            handler: async (request, reply) => {
                const response = await moduleController.getAllModules(
                    server,
                    request,
                    reply
                );
                return reply.code(200).send(response);
            }
        });

        /**
         * @description This route returns requested modules
         *
         * @since      0.0.1
         * @author     Mohit Sharma
         *
         * @request    POST
         * @route      /api/get-module-by-id
         * @memberof   fastifyPlugin
         */
        server.route({
            method: 'POST',
            url: '/api/get-module-by-id',
            schema: {
                tags:["module"],
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' }
                    }
                }
            },
            handler: async (request, reply) => {
                const response = await moduleController.getModuleById(
                    server,
                    request,
                    reply
                );

                return reply.code(200).send(response);
            }
        });
        next();
    },
    {
        fastify: "3.14.x",
        name: "module-plugin",
        decorators: {
            fastify: [],
            reply: [],
        },
        dependencies: ["fastify-redis", "fastify-swagger"],
    }
);
