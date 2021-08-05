import * as fastify from "fastify";
import { FastifyInstance } from "fastify";
import { ModuleService } from "../service/module.service";
import { IModule } from "p3l_core/dist/interface/Module.interface";
import { ErrorMsg, InfoMsg, SuccessMsg } from "./../../../msg/index.msg";

export class ModuleController {
    private moduleService: ModuleService;

    constructor() {
        this.moduleService = new ModuleService();
    }

    public async saveModule(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<IModule> {
        const email: string = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.SAVE_MODULE);
            const body = request.body;
            server.log.info({ user: email }, SuccessMsg.SAVE_MODULE);
            return await this.moduleService.addModule(body);
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.SAVE_MODULE);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }
    }

    public async getModuleById(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<IModule> {
        const email: string = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.GET_MODULE_BY_ID);
            const id = request.body.id;
            server.log.info({ user: email }, SuccessMsg.GET_MODULE_BY_ID);
            return await this.moduleService.getModuleById(id);
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.GET_MODULE_BY_ID);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }
    }

    public async getAllModules(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<IModule[]> {
        const email: string = request.raw.user.unique_name;
        try {
         server.log.info({ user: email }, InfoMsg.GET_ALL_MODULES);
         server.log.info({ user: email }, SuccessMsg.GET_ALL_MODULES);
        return await this.moduleService.getAllModules();
    }
    catch (error) {
        server.log.error({ user: email }, ErrorMsg.GET_ALL_MODULES);
        server.log.error({ user: email }, error.message);
        return reply.send(error);
    }
}
}