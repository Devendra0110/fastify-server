import * as msg from "./msg/index.msg";
import bluebird from "bluebird";
import mongoose from 'mongoose';
import { commonMiddleware } from "./middleware/common.middleware";
import { Env } from "./configure-environment";
import { PluginRegistery } from "./plugin.registery";
import { replace } from "lodash";
import { fastify } from "fastify";
import { logger } from './logger';
const server = fastify({ logger: logger, trustProxy: true, });

let config;
const pluginRegistery = new PluginRegistery();
pluginRegistery.registerPlugins(server);

mongoose.Promise = bluebird;
mongoose.set("useCreateIndex", true);

server.addHook("onRequest", commonMiddleware);

  
const start = async () => {
    try {

        config = Env.Instance.Config;
        await server.listen(Number(process.env.PORT) || config['PORT'], config["HOST"]);
        server.swagger();

        await configureDatabase();

        server.log.info(
            { user: "" },
            replace(
                msg["SuccessMsg"]["SERVER_START"],
                "<<PORT>>",
                Number(process.env.PORT) || config["PORT"]
            )
        );
        server.blipp();
    } catch (error) {
        server.log.error({ user: "" }, msg["ErrorMsg"]["SERVER_START"] + error);
        process.exit(1);
    }
};

async function configureDatabase() {
    try {
        await connect(config["MONGO_URL"]);
        server.log.info({ user: "" }, msg.SuccessMsg.DB_CONNECTION,);
    } catch (error) {
        console.log(error);
        server.log.error({ user: "" }, msg["ErrorMsg"]["DB_CONNECTION"]);
    }
}


async function connect(mongoUrl: string): Promise<void> {
    try {
        const config = {
            poolSize: 100,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        };

        await mongoose.connect(mongoUrl, config).then(
            () => {
                console.log(`\x1b[1m`, `connected to database at ${mongoUrl}`)
            },
        ).catch((err: any) => {
            console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        })
    } catch (err) {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // process.exit();
    }
}


process.on("uncaughtException", (error) => {
    server.log.error(error);
});
process.on("unhandledRejection", (error) => {
    server.log.error(error);
});

start();
