import { type Model, Schema, type Document } from 'mongoose';
import type { TransactionType } from '@stop-n-swop/contracts';
import type { UserDoc } from '../users';
import { UserModel } from '../users';
export interface TxnRecord {
    id: string;
    orderId: string;
    listingId: string;
    type: TransactionType;
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
export declare const createMerchant: ({ Merchant, User, userId, }: {
    Merchant: MerchantModel;
    User: UserModel;
    userId: string;
}) => Promise<MerchantFields & MerchantVirtuals & Document<any, any, MerchantRecord>>;
export declare const adjustMerchantBalance: ({ Merchant, User, amount, currency, fee, type, userId, listingId, orderId, }: {
    Merchant: MerchantModel;
    User: UserModel;
    userId: string;
    amount: number;
    currency: string;
    fee: number;
    type: TransactionType;
    listingId?: string;
    orderId?: string;
}) => Promise<TxnDoc>;
