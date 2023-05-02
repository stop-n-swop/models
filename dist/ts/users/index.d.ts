import type { OauthProvider, Address, UserLevel, Region } from '@stop-n-swop/contracts';
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
        region: Region;
        new: boolean;
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
declare const userSchema: Schema<UserRecord, Model<UserRecord, any, any>, undefined, {}>;
export { userSchema };
