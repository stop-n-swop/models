import { type Model, Schema, type Document } from 'mongoose';
export type CmdRecord = {
    id: string;
};
export type CmdDoc = CmdRecord & Document;
export type CmdModel = Model<CmdRecord>;
declare const cmdSchema: Schema<CmdRecord, Model<CmdRecord, any, any>, undefined, {}>;
export { cmdSchema };
