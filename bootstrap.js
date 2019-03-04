use votingSystemDb

// add constituency
const constituency1 = {
  name: 'Doncaster North',
  minimum_age: 18,
  voting_system: 'FPTP',
};
db.constituencies.insert(constituency1);

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
db.parties.insertMany([labourParty, conservativeParty, yorkshireParty]);

// add candidates
const labourCandidate = {
  name: 'Edward Milliband',
  party: labourParty
};
const conservativeCandidate = {
  name: 'Shade Adoh',
  party: conservativeParty
};
const yorkshireCandidate = {
  name: 'Charlie Bridges',
  party: yorkshireParty
};
db.candidates.insertMany([labourCandidate, conservativeCandidate, yorkshireCandidate]);

// add campaign
db.campaigns.insert({
  name: 'Local Election for Doncaster North',
  candidates: [labourCandidate, conservativeCandidate, yorkshireCandidate],
  type: 'Local Election',
  active: 'Active',
  constituencies: [constituency1],
  start_date: Date.now(),
  end_date: Date.now() + 86400000
});
