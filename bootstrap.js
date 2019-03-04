use votingSystemDb

// add constituency
const constituency1 = {
  name: 'Doncaster North',
  minimum_age: 18,
  voting_system: 'FPTP',
};
const constRet = db.constituencies.insertOne(constituency1);
const constituency1Id = ObjectId(constRet.insertedId.str);

// add parties
const labourParty = {
  name: 'Labour',
  description: 'The Labour Party description'
};
const conservativeParty = {
  name: 'Conservative',
  description: 'The Conservative Party description'
};
const yorkshireParty = {
  name: 'Yorkshire Party',
  description: 'The Yorkshire Party description'
};
const partyRet = db.parties.insertMany([labourParty, conservativeParty, yorkshireParty]);
const labourPartyId = ObjectId(partyRet.insertedIds[0].str);
const conservativePartyId = ObjectId(partyRet.insertedIds[1].str);
const yorkshirePartyId = ObjectId(partyRet.insertedIds[2].str);

// add candidates
const labourCandidate = {
  name: 'Edward Milliband',
  party: labourPartyId
};
const conservativeCandidate = {
  name: 'Shade Adoh',
  party: conservativePartyId
};
const yorkshireCandidate = {
  name: 'Charlie Bridges',
  party: yorkshirePartyId
};
const candidateRet = db.candidates.insertMany([labourCandidate, conservativeCandidate, yorkshireCandidate]);
const labourCandidateStr = candidateRet.insertedIds[0].str;
const conservativeCandidateStr = candidateRet.insertedIds[1].str;
const yorkshireCandidateStr = candidateRet.insertedIds[2].str;

const labourCandidateId = ObjectId(labourCandidateStr);
const conservativeCandidateId = ObjectId(conservativeCandidateStr);
const yorkshireCandidateId = ObjectId(yorkshireCandidateStr);

// add campaign
db.campaigns.insert({
  name: 'Local Election for Doncaster North',
  total_votes: 0,
  candidates: [labourCandidateId, conservativeCandidateId, yorkshireCandidateId],
  votes: [{[labourCandidateStr]: 0}, {[conservativeCandidateStr]: 0}, {[yorkshireCandidateStr]: 0}],
  type: 'Local Election',
  active: 'Active',
  constituencies: [constituency1Id],
  start_date: Date.now(),
  end_date: Date.now() + 86400000
});
