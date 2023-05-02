import { type Model, Schema, type Document } from 'mongoose';
import type { TransactionType } from '@stop-n-swop/contracts';
import { nanoid } from 'nanoid';
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

export const createMerchant = async ({
  Merchant,
  User,
  userId,
}: {
  Merchant: MerchantModel;
  User: UserModel;
  userId: string;
}) => {
  const id = nanoid();
  const user = await User.findOne({ userId });

  const merchant = await Merchant.create({
    balance: 0,
    outgoingBalance: 0,
    currency: 'GBP',
    id,
    onboarded: false,
    transactions: [],
    userId,
    account: {},
    payouts: [],
  });

  user.merchantId = id;
  await user.save();

  return merchant;
};

export const adjustMerchantBalance = async ({
  Merchant,
  User,
  amount,
  currency,
  fee,
  type,
  userId,
  listingId,
  orderId,
}: {
  Merchant: MerchantModel;
  User: UserModel;
  userId: string;
  amount: number;
  currency: string;
  fee: number;
  type: TransactionType;
  listingId?: string;
  orderId?: string;
}) => {
  let merchant = await Merchant.findOne({ userId });
  if (merchant == null) {
    merchant = await createMerchant({ Merchant, User, userId });
  }
  const { balance } = merchant;
  const adjusted = balance + amount;
  const txn: Omit<TxnRecord, 'createdAt' | 'updatedAt'> = {
    id: nanoid(10),
    amount,
    currency,
    fee,
    listingId,
    orderId,
    type,
  };
  merchant.transactions.push(txn as TxnDoc);

  console.debug(
    `${userId}: Updating account balance from ${balance} to ${adjusted}`,
  );

  merchant.balance = adjusted;
  await merchant.save();

  return merchant.transactions[merchant.transactions.length - 1];
};
