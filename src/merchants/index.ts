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

const txnSchema = new Schema<TxnRecord>(
  {
    id: String,
    orderId: String,
    listingId: String,
    type: String,
    amount: Number,
    fee: Number,
    currency: String,
  },
  { timestamps: true },
);
const merchantSchema = new Schema<MerchantRecord>(
  {
    userId: String,
    id: String,
    balance: Number,
    currency: String,
    transactions: [txnSchema],
    account: new Schema<MerchantRecord['account']>({
      name: String,
      sortCode: String,
      accountNumber: String,
      hint: String,
    }),
    payouts: [Number],
  },
  { timestamps: true },
);
merchantSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true,
});

export { merchantSchema };
