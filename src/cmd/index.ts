import { type Model, Schema, type Document } from 'mongoose';

export type CmdRecord = { id: string };
export type CmdDoc = CmdRecord & Document;
export type CmdModel = Model<CmdRecord>;

const cmdSchema = new Schema<CmdRecord>(
  { id: String, stack: String },
  { timestamps: true },
);

export { cmdSchema };
