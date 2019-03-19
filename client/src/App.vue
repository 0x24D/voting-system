<template>
  <div id="app">
    <div v-if="userAuthenticated()">
      <Logout/>
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
import AddAdmin from './components/AddAdmin.vue';
import AddAuditor from './components/AddAuditor.vue';
import AddVoter from './components/AddVoter.vue';
import Admin from './components/Admin.vue';
import AdminCampaigns from './components/admin/AdminCampaigns.vue';
import ListOfCampaigns from './components/ListOfCampaigns.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import Results from './components/Results.vue';
import Setup from './components/admin/Setup.vue';
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
    AddAdmin,
    AddAuditor,
    AddVoter,
    Admin,
    AdminCampaigns,
    ListOfCampaigns,
    Login,
    Logout,
    Results,
    Setup,
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
