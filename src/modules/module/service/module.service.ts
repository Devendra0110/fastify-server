import { ModuleDbService } from "p3l_core";
import { IModule } from "p3l_core/dist/interface/Module.interface";


export class ModuleService {

    public moduleDbService: ModuleDbService;

    constructor() {
        this.moduleDbService = new ModuleDbService();
    }

    public async addModule(module: IModule): Promise<IModule> {
        try {
            return await this.moduleDbService.addModule(module);
        } catch (error) {
            return error;
        }
    }

    public async getModuleById(id: string): Promise<IModule> {
        try {
            return await this.moduleDbService.getModuleById(id);
        } catch (error) {
            return error;
        }
    }

    public async getAllModules(): Promise<IModule[]> {
        try {
            return await this.moduleDbService.getAllModules();
        } catch (error) {
            return error;
        }
    }
}
