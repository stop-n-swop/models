import type {
  OauthProvider,
  Address,
  UserLevel,
  Condition,
  Region,
} from '@stop-n-swop/contracts';
import { type Model, Schema, type Document } from 'mongoose';
import type { MerchantDoc } from '../merchants';

interface UserFields {
  userId: string;
  username: string;
  merchantId: string;
  email: string;
  level: UserLevel;
  verified: boolean;
  refreshToken: string;
  salt: string;
  address: Address;
  rating: number;
  oauth: Record<OauthProvider, string>;
  preferences: {
    manualApproval: boolean;
    noticeEmails: boolean;
    useBalance: boolean;
    region: Region;
    condition: Condition;
    boxed: boolean;
    instructions: boolean;
    includeProtection: boolean;
  };
  favouriteProductIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
interface UserVirtuals {
  merchant: MerchantDoc;
}

export type UserRecord = UserFields & UserVirtuals;
export type UserModel = Model<UserRecord>;
export type UserDoc = UserRecord & Document;

const userSchema = new Schema<UserRecord>(
  {
    userId: String,
    username: String,
    merchantId: String,
    firstName: {
      type: String,
      set(value: string) {
        if (value) {
          return value.charAt(0).toUpperCase() + value.substr(1);
        }
        return value;
      },
    },
    lastName: {
      type: String,
      set(value: string) {
        if (value) {
          return value.charAt(0).toUpperCase() + value.substr(1);
        }
        return value;
      },
    },
    email: String,
    level: Number,
    verified: Boolean,
    refreshToken: String,
    salt: String,
    rating: Number,
    favouriteProductIds: [String],
    address: new Schema({
      line1: String,
      line2: String,
      city: String,
      postcode: String,
      country: String,
    }),
    oauth: {},
    preferences: new Schema({
      manualApproval: Boolean,
      noticeEmails: Boolean,
      useBalance: Boolean,
      region: String,
      condition: String,
      boxed: Boolean,
      instructions: Boolean,
      includeProtection: Boolean,
    }),
  },
  { timestamps: true },
);
userSchema.virtual('basket', {
  ref: 'Basket',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true,
});
userSchema.virtual('listings', {
  ref: 'Listing',
  localField: 'userId',
  foreignField: 'userId',
  justOne: false,
});
userSchema.virtual('orders', {
  ref: 'Order',
  localField: 'userId',
  foreignField: 'userId',
  justOne: false,
});
userSchema.virtual('merchant', {
  ref: 'Merchant',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true,
});

export { userSchema };
