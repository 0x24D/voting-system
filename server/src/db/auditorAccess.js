import Auditor from '../models/auditorModel';

export const addNew = (dataToSave, callback) => {
  const newAuditor = new Auditor({
    username: dataToSave.username,
    name: dataToSave.name,
    email: dataToSave.email,
    password: dataToSave.password,
    salt: dataToSave.salt,
    polling_station: dataToSave.polling_station,
  });
  newAuditor.save((err, auditor) => {
    callback(err, auditor);
  });
};

export const findById = (auditorId, callback) => {
  Auditor.findById(auditorId).lean().exec((err, auditor) => {
    callback(err, auditor);
  });
};
