import { ModuleSchema } from "../model/Module.interface"
import Module from "../model/Module.model";

export class ModuleDbDal {

    /**
     * Add new module.
     * @since    0.0.1
     * @access   public
     * @author   Devendra Gaud
     * @param    {ModuleSchema} module
     * @memberof ModuleDbDal
     * @returns {Promise<ModuleSchema>}
     */
    public async addModule(moduleObj: ModuleSchema): Promise<ModuleSchema> {
        try {
            const moduleModelObj = new Module(moduleObj);
            return await moduleModelObj.save();
        } catch (error) {
            return error;
        }
    }
    /**
    * Get module by ID.
    * @since    0.0.1
    * @access   public
    * @author   Devendra Gaud 
    * @param    {string} id
    * @memberof ModuleDbDal
    * @returns {Promise<ModuleSchema>}
    */
    public async getModuleById(id: string): Promise<ModuleSchema> {
        try {
            return await Module.findById(id);
        } catch (error) {
            return error;
        }
    }

    /**
     * Get all the modules.
     * @since    0.0.1
     * @access   public
     * @author   Devendra Gaud
     * @memberof ModuleDbDal
     * @returns {Promise<ModuleSchema[]>}
     */
    public async getAllModules(): Promise<ModuleSchema[]> {
        try {
            return await Module.find().sort({order:1});
        } catch (error) {
            return error;
        }
    }
}
