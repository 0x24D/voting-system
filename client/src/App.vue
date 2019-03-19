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
        <div v-if="this.$store.state.showResults">
          <Results/>
        </div>
        <div v-if="this.$store.state.showCandidates">
          <ListOfCandidates/>
        </div>
        <div v-if="this.$store.state.showAddCandidateParty">
          <AddCandidateParty/>
        </div>
        <div v-if="this.$store.state.showAddAdmin">
          <AddAdmin/>
        </div>
        <div v-if="this.$store.state.showAddAuditor">
          <AddAuditor/>
        </div>
        <div v-if="this.$store.state.showAddVoter">
          <AddVoter/>
        </div>
      </div>
<<<<<<< HEAD
      <div v-else-if="userType('auditor')">
        <Auditor/>
=======
      <div v-else-if="userType('admin')">
        <div v-if="this.$store.state.showAdmin">
          <Admin/>
        </div>
        <div v-if="this.$store.state.showResultsCampaigns">
          <ResultsCampaigns/>
        </div>
        <div v-if="this.$store.state.showResults">
          <Results :campaign-id="this.$store.state.campaignId"/>
        </div>
>>>>>>> master
      </div>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>
<script>
import { getUserType, isUserAuthenticated } from './utils/auth';
<<<<<<< HEAD
import AddAdmin from './components/AddAdmin.vue';
import AddAuditor from './components/AddAuditor.vue';
import AddVoter from './components/AddVoter.vue';
import Admin from './components/Admin.vue';
import AdminCampaigns from './components/admin/AdminCampaigns.vue';
=======
import Admin from './components/Admin.vue';
>>>>>>> master
import ListOfCampaigns from './components/ListOfCampaigns.vue';
import Login from './components/Login.vue';
import Results from './components/Results.vue';
<<<<<<< HEAD
import Setup from './components/admin/Setup.vue';
=======
import ResultsCampaigns from './components/admin/ResultsCampaigns.vue';
>>>>>>> master
import Success from './components/Success.vue';
import Vote from './components/Vote.vue';
<<<<<<< HEAD
import CandidateProfile from './components/CandidateProfile';
import ListOfCandidates from './components/admin/ListOfCandidates';
import AddCandidateParty from './components/admin/AddCandidateParty';
=======
import Auditor from './components/Auditor.vue';
>>>>>>> develop

export default {
  name: 'app',
  components: {
<<<<<<< HEAD
    AddAdmin,
    AddAuditor,
    AddVoter,
    Admin,
    AdminCampaigns,
=======
    Admin,
>>>>>>> master
    ListOfCampaigns,
    Login,
    Results,
<<<<<<< HEAD
    Setup,
=======
    ResultsCampaigns,
>>>>>>> master
    Success,
    Vote,
<<<<<<< HEAD
    CandidateProfile,
    ListOfCandidates,
    AddCandidateParty,
=======
    Auditor,
>>>>>>> develop
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
