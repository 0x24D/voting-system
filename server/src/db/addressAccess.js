import Address from '../models/addressModel';

export const addNew = (dataToSave, callback) => {
  const newAddress = new Address({});
  Object.keys(dataToSave).forEach((prop) => {
    newAddress[prop] = dataToSave[prop];
  });
  newAddress.save((err, address) => {
    callback(err, address);
  });
};

export const findById = (addressId, callback) => {
  Address.findById(addressId).lean().exec((err, address) => {
    callback(err, address);
  });
};
