import * as _ from "lodash";
import  fastify from "fastify";
import * as msg from "./msg/index.msg";
const DevConfig = require("../config/development");
const ProdConfig = require("../config/deployment");
const TestConfig = require("../config/test");
const SwaggerConfig = require("../config/swagger");


const server = fastify({ logger: true });

export class Env {
    private static _instance: Env;
    private config: unknown;

    constructor() {
        this.config = {};
    }

    public static get Instance():Env {
        return this._instance || (this._instance = new this());
    }

    public get Config():unknown {
        if (_.isEmpty(this.config)) {
            return this.setConfig();
        } else {
            return this.config;
        }
    }

    private setConfig() {
        server.log.info({user: ""}, msg["InfoMsg"]["ENV_CONFIG"]);
        if (process.env.NODE_ENV === "development") {
            this.config = DevConfig;
        } else if (process.env.NODE_ENV === "production") {
            this.config = ProdConfig;
        } else if (process.env.NODE_ENV === "test") {
            this.config = TestConfig;
        } else {
            this.config = DevConfig;
        }
        this.config["SWAGGER_CONFIG"] = SwaggerConfig;
        server.log.info({user: ""}, msg["SuccessMsg"]["ENV_CONFIG"]);
        return this.config;
    }
}