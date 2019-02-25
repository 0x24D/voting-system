import { CampaignSchema } from '../models/campaignModel';

const campaign = mongoose.model('campaign', CampaignSchema);

//Campaign(name, candidates, type, constituencies, startDate, endDate)

export const assignCandidateToConstituency = (req, res) => {

};