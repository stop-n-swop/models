import { Schema } from 'mongoose';

const ssoSchema = new Schema({
  id: String,
  code: String,
  key: String,
  path: String,
  userId: String,
  expires: Date
});
ssoSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});

const cmdSchema = new Schema({
  id: String,
  stack: String
}, {
  timestamps: true
});

const companySchema = new Schema({
  id: String,
  name: String
});

const historySchema$1 = new Schema({
  userId: String,
  username: String,
  status: String
}, {
  timestamps: true
});
const imageSchema = new Schema({
  id: String,
  verified: Boolean
});
const discountSchema = new Schema({
  name: String,
  fixed: Number,
  percentage: Number
});
const listingSchema = new Schema({
  id: String,
  productIds: [String],
  images: [imageSchema],
  price: Number,
  postage: Number,
  currency: String,
  stats: {
    condition: String,
    region: String,
    boxed: Boolean,
    instructions: Boolean
  },
  description: String,
  createdDate: Date,
  userId: String,
  rating: Number,
  status: String,
  history: [historySchema$1],
  discount: discountSchema,
  postedAt: Date
}, {
  timestamps: true
});
listingSchema.virtual('orders', {
  ref: 'Order',
  localField: 'id',
  foreignField: 'listingId',
  justOne: false
});

const txnSchema = new Schema({
  id: String,
  orderId: String,
  listingId: String,
  type: String,
  amount: Number,
  fee: Number,
  currency: String
}, {
  timestamps: true
});
const merchantSchema = new Schema({
  userId: String,
  id: String,
  balance: Number,
  currency: String,
  transactions: [txnSchema],
  account: new Schema({
    name: String,
    sortCode: String,
    accountNumber: String,
    hint: String
  }),
  payouts: [Number]
}, {
  timestamps: true
});
merchantSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});

const historySchema = new Schema({
  userId: String,
  username: String,
  status: String
}, {
  timestamps: true
});
const orderSchema = new Schema({
  id: String,
  listingId: String,
  userId: String,
  paymentId: String,
  status: String,
  errorCode: String,
  deliveryAddress: new Schema({
    name: String,
    line1: String,
    line2: String,
    city: String,
    postcode: String,
    country: String
  }),
  history: [historySchema],
  providerFee: Number,
  postedAt: Date,
  trackingProvider: String,
  trackingNumber: String,
  useBalance: Boolean,
  balanceUsed: Number
}, {
  timestamps: true
});
orderSchema.virtual('listing', {
  ref: 'Listing',
  localField: 'listingId',
  foreignField: 'id',
  justOne: true
});
orderSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});

const productSchema = new Schema({
  id: String,
  gameId: String,
  platformId: String,
  platformIds: [String],
  type: String,
  name: String,
  alias: [String],
  cover: String,
  banner: String,
  releaseDate: Date,
  rawgId: Number,
  developerId: String,
  publisherId: String,
  spotPrice: Number,
  highPrice: Number,
  lowPrice: Number
});
productSchema.virtual('platform', {
  ref: 'product',
  localField: 'platformId',
  foreignField: 'id',
  justOne: true
});
productSchema.virtual('listings', {
  ref: 'Listing',
  localField: 'id',
  foreignField: 'productIds',
  justOne: false
});
productSchema.virtual('publisher', {
  ref: 'Company',
  localField: 'publisherId',
  foreignField: 'id',
  justOne: true
});
productSchema.virtual('developer', {
  ref: 'Company',
  localField: 'developerId',
  foreignField: 'id',
  justOne: true
});

const roloSchema = new Schema({
  date: String,
  platformId: String,
  productId: String,
  listingId: String,
  userId: String,
  condition: String,
  region: String,
  views: Number
}, {
  timestamps: true
});
roloSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: 'id',
  justOne: true
});
roloSchema.virtual('listing', {
  ref: 'Listing',
  localField: 'listingId',
  foreignField: 'id',
  justOne: true
});
roloSchema.virtual('platform', {
  ref: 'Product',
  localField: 'platformId',
  foreignField: 'id',
  justOne: true
});
roloSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});

const userSchema = new Schema({
  userId: String,
  username: String,
  merchantId: String,
  firstName: {
    type: String,
    set(value) {
      if (value) {
        return value.charAt(0).toUpperCase() + value.substr(1);
      }
      return value;
    }
  },
  lastName: {
    type: String,
    set(value) {
      if (value) {
        return value.charAt(0).toUpperCase() + value.substr(1);
      }
      return value;
    }
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
    country: String
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
    includeProtection: Boolean
  })
}, {
  timestamps: true
});
userSchema.virtual('basket', {
  ref: 'Basket',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});
userSchema.virtual('listings', {
  ref: 'Listing',
  localField: 'userId',
  foreignField: 'userId',
  justOne: false
});
userSchema.virtual('orders', {
  ref: 'Order',
  localField: 'userId',
  foreignField: 'userId',
  justOne: false
});
userSchema.virtual('merchant', {
  ref: 'Merchant',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});

const registerModels = db => {
  const ssoModel = db.model('Sso', ssoSchema);
  const cmdModel = db.model('Cmd', cmdSchema);
  const companyModel = db.model('Company', companySchema);
  const listingModel = db.model('Listing', listingSchema);
  const merchantModel = db.model('Merchant', merchantSchema);
  const orderModel = db.model('Order', orderSchema);
  const productModel = db.model('Product', productSchema);
  const roloModel = db.model('Rolo', roloSchema);
  const userModel = db.model('User', userSchema);
  return {
    ssoModel,
    cmdModel,
    companyModel,
    listingModel,
    merchantModel,
    orderModel,
    productModel,
    roloModel,
    userModel
  };
};

export { cmdSchema, companySchema, listingSchema, merchantSchema, orderSchema, productSchema, registerModels, roloSchema, ssoSchema, userSchema };
