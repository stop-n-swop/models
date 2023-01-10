import { type Model, Schema, type Document } from 'mongoose';
import type { UserDoc } from '../users';
export interface TxnRecord {
    id: string;
    orderId: string;
    listingId: string;
    type: 'pay-in' | 'transfer' | 'pay-out' | 'refund';
    amount: number;
    fee: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}
export type TxnDoc = TxnRecord & Document;
interface MerchantFields {
    id: string;
    userId: string;
    balance: number;
    currency: string;
    transactions: TxnDoc[];
    createdAt: Date;
    updatedAt: Date;
    account: {
        name: string;
        sortCode: string;
        accountNumber: string;
        hint: string;
    };
    payouts: number[];
}
interface MerchantVirtuals {
    user: UserDoc;
}
export type MerchantRecord = MerchantFields & MerchantVirtuals;
export type MerchantModel = Model<MerchantRecord>;
export type MerchantDoc = MerchantRecord & Document;
declare const merchantSchema: Schema<MerchantRecord, Model<MerchantRecord, any, any>, undefined, {}>;
export { merchantSchema };
