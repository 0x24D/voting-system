import Auditor from '../models/auditorModel';

export const findById = (auditorId, callback) => {
  Auditor.findById(auditorId).lean().exec((err, auditor) => {
    callback(err, auditor);
  });
};
