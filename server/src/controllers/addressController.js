import mongoose from 'mongoose';

import { AddressSchema } from '../models/addressModel';

const address = mongoose.model('address', AddressSchema);


