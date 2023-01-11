import { Connection } from 'mongoose';
import { ssoSchema } from './auth';
import { cmdSchema } from './cmd';
import { companySchema } from './companies';
import { listingSchema } from './listings';
import { merchantSchema } from './merchants';
import { orderSchema } from './orders';
import { productSchema } from './products';
import { roloSchema } from './rolo';
import { userSchema } from './users';

export const registerModels = (db: Connection) => {
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
    userModel,
  };
};
