import { Stats, Status } from '@stop-n-swop/contracts';
import { type Model, Schema, type Document } from 'mongoose';
import type { OrderRecord } from '../orders';
export interface ListingRecord {
    id: string;
    productIds: string[];
    images: Array<{
        id: string;
        verified: boolean;
    }>;
    price: number;
    postage: number;
    currency: string;
    stats: Stats;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    rating: number;
    status: Status;
    history: Array<{
        createdAt: Date;
        userId: string;
        username: string;
        status: Status;
    }>;
    orders: Array<OrderRecord & Document>;
}
export type ListingModel = Model<ListingRecord>;
export type ListingDoc = ListingRecord & Document;
declare const listingSchema: Schema<ListingRecord, Model<ListingRecord, any, any>, undefined, {}>;
export { listingSchema };
