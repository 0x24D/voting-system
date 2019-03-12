import Address from '../models/addressModel';

export const findAll = (callback) => {
  Address.find({}).lean().exec((err, address) => {
    callback(err, address);
  });
};

export const findById = (addressId, callback) => {
  Address.findById(addressId).lean().exec((err, address) => {
    callback(err, address);
  });
};
