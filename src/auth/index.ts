import { Schema, type Model, type Document } from 'mongoose';
import type { UserDoc } from '../users';

type SsoFields = {
  id: string;
  path: string;
  code: string;
  key: string;
  userId: string;
  expires: Date;
};
type SsoVirtuals = {
  user: UserDoc;
};
export type SsoRecord = SsoFields & SsoVirtuals;
export type SsoModel = Model<SsoRecord>;
export type SsoDoc = SsoRecord & Document;

const ssoSchema = new Schema<SsoRecord>({
  id: String,
  code: String,
  key: String,
  path: String,
  userId: String,
  expires: Date,
});
ssoSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true,
});

export { ssoSchema };
