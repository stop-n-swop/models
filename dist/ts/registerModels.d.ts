import { Connection } from 'mongoose';
export declare const registerModels: (db: Connection) => {
    ssoModel: import("mongoose").Model<import("./auth").SsoRecord, any, any>;
    cmdModel: import("mongoose").Model<import("./cmd").CmdRecord, any, any>;
    companyModel: import("mongoose").Model<import("@stop-n-swop/contracts").Company, any, any>;
    listingModel: import("mongoose").Model<import("./listings").ListingRecord, any, any>;
    merchantModel: import("mongoose").Model<import("./merchants").MerchantRecord, any, any>;
    orderModel: import("mongoose").Model<import("./orders").OrderRecord, any, any>;
    productModel: import("mongoose").Model<import("./products").ProductRecord, any, any>;
    roloModel: import("mongoose").Model<import("./rolo").RoloRecord, any, any>;
    userModel: import("mongoose").Model<import("./users").UserRecord, any, any>;
};
