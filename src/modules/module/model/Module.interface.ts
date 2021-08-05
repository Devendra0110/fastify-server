import { Document } from "mongoose";

export interface ModuleSchema extends Document, IModule {}

interface IModule {
 moduleName: string;
 order:number;
}
