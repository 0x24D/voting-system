<template>
  <div id="app">
    <div v-if="userAuthenticated()">
      <div v-if="userType('voter')">
        <div v-if="this.$store.state.showCampaigns">
          <ListOfCampaigns/>
        </div>
        <div v-if="this.$store.state.showVote">
          <Vote :campaign-id="this.$store.state.campaignId"/>
        </div>
        <div v-if="this.$store.state.showSuccess">
          <Success/>
        </div>
        <div v-if="this.$store.state.showCandidateProfile">
          <CandidateProfile :candidate-id="this.$store.state.candidateId"/>
        </div>
      </div>
      <div v-else-if="userType('admin')">
        <div v-if="this.$store.state.showAdmin">
          <Admin/>
        </div>
        <div v-if="this.$store.state.showAdminCampaigns">
          <AdminCampaigns/>
        </div>
        <div v-if="this.$store.state.showSetup">
          <Setup/>
        </div>
        <div v-if="this.$store.state.showResultsCampaigns">
          <ResultsCampaigns/>
        </div>
        <div v-if="this.$store.state.showResults">
          <Results :campaign-id="this.$store.state.campaignId"/>
        </div>
        <div v-if="this.$store.state.showCandidates">
          <ListOfCandidates/>
        </div>
        <div v-if="this.$store.state.showAddCandidateParty">
          <AddCandidateParty/>
        </div>
        <div v-if="this.$store.state.showUsers">
          <User/>
        </div>
        <div v-if="this.$store.state.showAddUser">
          <AddUser/>
        </div>
      </div>
      <div v-else-if="userType('auditor')">
        <Auditor/>
      </div>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>
<script>
import { getUserType, isUserAuthenticated } from './utils/auth';
import User from './components/admin/Users.vue';
import AddUser from './components/admin/AddUser.vue';
import Admin from './components/Admin.vue';
import AdminCampaigns from './components/admin/AdminCampaigns.vue';
import ListOfCampaigns from './components/ListOfCampaigns.vue';
import Login from './components/Login.vue';
import Results from './components/Results.vue';
import Setup from './components/admin/Setup.vue';
import Success from './components/Success.vue';
import Vote from './components/Vote.vue';
import CandidateProfile from './components/CandidateProfile.vue';
import ListOfCandidates from './components/admin/ListOfCandidates.vue';
import AddCandidateParty from './components/admin/AddCandidateParty.vue';
import Auditor from './components/Auditor.vue';
import ResultsCampaigns from './components/admin/ResultsCampaigns.vue';

export default {
  name: 'app',
  components: {
    User,
    AddUser,
    Admin,
    AdminCampaigns,
    ListOfCampaigns,
    Login,
    Results,
    Setup,
    ResultsCampaigns,
    Success,
    Vote,
    CandidateProfile,
    ListOfCandidates,
    AddCandidateParty,
    Auditor,
  },
  methods: {
    userType(userType) {
      return getUserType(userType);
    },
    userAuthenticated() {
      return isUserAuthenticated();
    },
  },
};
</script>
