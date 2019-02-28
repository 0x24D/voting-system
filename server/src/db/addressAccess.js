import Address from '../models/addressModel';

export const findById = (addressId, callback) => {
  Address.findById(addressId).lean().exec((err, address) => {
    callback(err, address);
  });
};
