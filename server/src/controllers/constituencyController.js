import { ConstituencySchema } from '../models/constituencyModel';

const constituency = mongoose.model('constituency', ConstituencySchema);

//Constituency(name, minimumAge, votingSystem)
export const validateConstituency = (req, res) => {

};