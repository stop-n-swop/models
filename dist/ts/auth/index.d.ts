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
declare const ssoSchema: Schema<SsoRecord, Model<SsoRecord, any, any>, undefined, {}>;
export { ssoSchema };
