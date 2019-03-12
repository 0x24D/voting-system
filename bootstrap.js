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
const campaignRet = db.campaigns.insertOne({
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

const campaign1Id = ObjectId(campaignRet.insertedId.str);

// add address

const address1 = {
  line_one: '10 Low Road',
  line_two: 'Balby',
  town: 'Doncaster',
  county: 'South Yorkshire',
  country: 'England',
  postcode: 'DN4 9BD',
  address: constituency1Id
};

const addressRet = db.addresses.insertOne(address1);
const address1Id = ObjectId(addressRet.insertedId.str);

// add voter
// voter:voterPass
const voter = {
  username: 'voter',
  name: 'John Smith',
  email: 'j.smith@email.com',
  password: '$2a$10$F6m9.osfkImT6JWlRheyre08he0RodU6ZPQcJwJgINmQhlWF3K2au',
  authentication_attempts: 0,
  salt: '$2a$10$F6m9.osfkImT6JWlRheyre',
  voted: false,
  date_of_birth: new Date('01/01/01'),
  address: address1Id,
  __t: 'voter'
};

const voterRet = db.users.insertOne(voter);
const voter1Id = ObjectId(voterRet.insertedId.str);

// add admin
// admin:adminPass
const admin = {
  username: 'admin',
  name: 'Jane Doe',
  email: 'j.doe@email.com',
  password: '$2a$10$Zqxnz0Zg37fZLixoFfBYgeSsHUe61tVpa7wCDg2LE8hLFzsAi2guK',
  authentication_attempts: 0,
  salt: '$2a$10$Zqxnz0Zg37fZLixoFfBYge',
  __t: 'admin'
};

db.users.insert(admin);

const pollingStation = {
  address: address1Id,
  open_date: Date.now(),
  close_date: Date.now() + 86400000
};

const pollingStationRet = db.pollingStations.insertOne(pollingStation);
const pollingStation1Id = ObjectId(pollingStationRet.insertedId.str);

// add auditor
// auditor:auditorPass
const auditor = {
  username: 'auditor',
  name: 'Bob Jones',
  email: 'b.jones@email.com',
  password: '$2a$10$7A.zv9h/SGk7c8Q9jjSrT.m2PvJ6KiuPed/RdcVKCrHnhuan2pCTq',
  authentication_attempts: 0,
  salt: '$2a$10$7A.zv9h/SGk7c8Q9jjSrT.',
  __t: 'auditor',
  polling_station: pollingStation1Id
};

db.users.insert(auditor);

const system = {
  station: pollingStation1Id,
  voters: [voter1Id],
  campaigns: [campaign1Id],
  language: 'en-gb',
};

db.systems.insert(system);

