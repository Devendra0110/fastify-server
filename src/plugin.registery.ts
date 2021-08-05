import * as FastifyBlipp from "fastify-blipp";
import * as FastifyBoom from "fastify-boom";
import * as FastifyCors from "fastify-cors";
import * as fastifyForm from "fastify-formbody";
import * as FastifyHelmet from "fastify-helmet";
import * as FastifySwagger from "fastify-swagger";
import * as FastifySocket from "fastify-socket.io";
import { Env } from "./configure-environment";
import fastifyCompress from "fastify-compress";

import * as ModuleRoute from "./modules/module/route/module.route";

import  fastifyMultipart from "fastify-multipart";
import socketRoute from "./modules/socket/route/socket.route";

export class PluginRegistery {
    public config: any;

    constructor() {
        this.config = Env.Instance.Config;
    }

    public registerPlugins(server: any): void {
        // Custom content parser
        // server.addContentTypeParser("application/octet-stream", {parseAs: "buffer", bodyLimit: 10000000000000}, (req, body, done) => {
        //   fs.writeFileSync("mohit.jpg",body)
        //   done(null,body);
        // })

        // Predefined defined plugins
        server
            .register(fastifyCompress)
            .register(fastifyMultipart )
            .register(FastifyBlipp)
            // .register(FastifyRedis)
            .register(FastifyBoom)
            .register(FastifyHelmet, {
                contentSecurityPolicy: {
                    directives: {
                        defaultSrc: [`'self'`],
                        styleSrc: [`'self'`, `'unsafe-inline'`],
                        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
                    },
                },
            })
            // .register(fastifyRateLimit, {max: 1000, timeWindow: "1 minute", redis: new Redis(this.config["CACHE_CONFIG"])})
            // .register(FastifyRedis, this.config["CACHE_CONFIG"])
            .register(FastifySwagger, this.config["SWAGGER_CONFIG"])
            .register(FastifyCors)
            .register(fastifyForm)
            .register(socketRoute,{
                cors: {
                    origin: "http://localhost:4200",
                    credentials: true
                },
                allowEIO3: true,
                transports: ["websocket"]
            })
            // User defined plugins
            
            .register(ModuleRoute)
            .after((err) => {
                if (err) {
                    server.log.error({user: ""}, "Error in registering plugins");
                    throw err;
                } else {
                    server.log.info({user: ""}, "Registering of plugins completed successfully!");
                }
            })
            .ready((err) => {
                if (err) {
                    server.log.error({user: ""}, "Error in Executing  plugins");
                    throw err;
                } else {
                    // server.io.on('connect', (socket) => console.info('Socket connected!', socket.id));
                    server.log.info({user: ""}, "Execution of plugins completed successfully!");
                }
            });
        // const { redis } = server;
    }
}
