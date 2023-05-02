import type { Address, Status } from '@stop-n-swop/contracts';
import { type Model, Schema, type Document } from 'mongoose';
import type { ListingRecord } from '../listings';
export interface OrderRecord {
    id: string;
    listingId: string;
    userId: string;
    status: Status;
    errorCode: string;
    createdAt: Date;
    updatedAt: Date;
    postedAt: Date;
    trackingProvider: string;
    trackingNumber: string;
    deliveryAddress: Address & {
        name: string;
    };
    history: Array<{
        createdAt: Date;
        userId: string;
        username: string;
        status: Status;
    }>;
    listing: ListingRecord & Document;
}
export type OrderModel = Model<OrderRecord>;
export type OrderDoc = OrderRecord & Document;
declare const orderSchema: Schema<OrderRecord, Model<OrderRecord, any, any>, undefined, {}>;
export { orderSchema };
