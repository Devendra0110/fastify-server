import mongoose, { Schema } from "mongoose";
import { ModuleSchema } from  "./Module.interface"

export const moduleSchema: Schema = new Schema({
    moduleName: { type: String, required: true },
    order: { type:Number }

}, { timestamps: true, versionKey: false });

export default mongoose.model<ModuleSchema>("Module", moduleSchema);
