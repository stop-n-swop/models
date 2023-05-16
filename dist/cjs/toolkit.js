'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mongoose = require('mongoose');
var nanoid = require('nanoid');

const ssoSchema = new mongoose.Schema({
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

const cmdSchema = new mongoose.Schema({
  id: String,
  stack: String
}, {
  timestamps: true
});

const companySchema = new mongoose.Schema({
  id: String,
  name: String
});

const historySchema$1 = new mongoose.Schema({
  userId: String,
  username: String,
  status: String
}, {
  timestamps: true
});
const imageSchema = new mongoose.Schema({
  id: String,
  verified: Boolean
});
const discountSchema = new mongoose.Schema({
  name: String,
  fixed: Number,
  percentage: Number
});
const listingSchema = new mongoose.Schema({
  id: String,
  productIds: [String],
  images: [imageSchema],
  price: Number,
  postage: Number,
  currency: String,
  stats: {
    region: String,
    boxed: Boolean,
    instructions: Boolean,
    new: Boolean
  },
  description: String,
  createdDate: Date,
  userId: String,
  rating: Number,
  status: String,
  history: [historySchema$1],
  discount: discountSchema,
  postedAt: Date,
  verified: String
}, {
  timestamps: true
});
listingSchema.virtual('orders', {
  ref: 'Order',
  localField: 'id',
  foreignField: 'listingId',
  justOne: false
});

const txnSchema = new mongoose.Schema({
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
const merchantSchema = new mongoose.Schema({
  userId: String,
  id: String,
  balance: Number,
  currency: String,
  transactions: [txnSchema],
  account: new mongoose.Schema({
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
const createMerchant = async _ref => {
  let {
    Merchant,
    User,
    userId
  } = _ref;
  const id = nanoid.nanoid();
  const user = await User.findOne({
    userId
  });
  const merchant = await Merchant.create({
    balance: 0,
    outgoingBalance: 0,
    currency: 'GBP',
    id,
    onboarded: false,
    transactions: [],
    userId,
    account: {},
    payouts: []
  });
  user.merchantId = id;
  await user.save();
  return merchant;
};
const adjustMerchantBalance = async _ref2 => {
  let {
    Merchant,
    User,
    amount,
    currency,
    fee,
    type,
    userId,
    listingId,
    orderId
  } = _ref2;
  let merchant = await Merchant.findOne({
    userId
  });
  if (merchant == null) {
    merchant = await createMerchant({
      Merchant,
      User,
      userId
    });
  }
  const {
    balance
  } = merchant;
  const adjusted = balance + amount;
  const txn = {
    id: nanoid.nanoid(10),
    amount,
    currency,
    fee,
    listingId,
    orderId,
    type
  };
  merchant.transactions.push(txn);
  console.debug(`${userId}: Updating account balance from ${balance} to ${adjusted}`);
  merchant.balance = adjusted;
  await merchant.save();
  return merchant.transactions[merchant.transactions.length - 1];
};

const historySchema = new mongoose.Schema({
  userId: String,
  username: String,
  status: String
}, {
  timestamps: true
});
const orderSchema = new mongoose.Schema({
  id: String,
  listingId: String,
  userId: String,
  status: String,
  errorCode: String,
  deliveryAddress: new mongoose.Schema({
    name: String,
    line1: String,
    line2: String,
    city: String,
    postcode: String,
    country: String
  }),
  history: [historySchema],
  postedAt: Date,
  trackingProvider: String,
  trackingNumber: String
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

const productSchema = new mongoose.Schema({
  id: String,
  gameId: String,
  platformId: String,
  platformIds: [String],
  type: String,
  name: String,
  shortName: String,
  alias: [String],
  cover: String,
  banner: String,
  releaseDate: Date,
  rawgId: Number,
  developerId: String,
  publisherId: String,
  price: {
    spot: Number,
    mint: Number,
    cib: Number,
    loose: Number
  }
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

const roloSchema = new mongoose.Schema({
  date: String,
  platformId: String,
  productId: String,
  listingId: String,
  userId: String,
  boxed: Boolean,
  instructions: Boolean,
  new: Boolean,
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

const userSchema = new mongoose.Schema({
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
  address: new mongoose.Schema({
    line1: String,
    line2: String,
    city: String,
    postcode: String,
    country: String
  }),
  oauth: {},
  preferences: new mongoose.Schema({
    manualApproval: Boolean,
    noticeEmails: Boolean,
    region: String,
    boxed: Boolean,
    instructions: Boolean,
    new: Boolean,
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

exports.adjustMerchantBalance = adjustMerchantBalance;
exports.cmdSchema = cmdSchema;
exports.companySchema = companySchema;
exports.createMerchant = createMerchant;
exports.listingSchema = listingSchema;
exports.merchantSchema = merchantSchema;
exports.orderSchema = orderSchema;
exports.productSchema = productSchema;
exports.registerModels = registerModels;
exports.roloSchema = roloSchema;
exports.ssoSchema = ssoSchema;
exports.userSchema = userSchema;
