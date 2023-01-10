import type { Company } from '@stop-n-swop/contracts';
import { type Model, Schema, type Document } from 'mongoose';

export type CompanyRecord = Company;
export type CompanyModel = Model<CompanyRecord>;
export type CompanyDoc = CompanyRecord & Document;

const companySchema = new Schema<CompanyRecord>({
  id: String,
  name: String,
});

export { companySchema };
