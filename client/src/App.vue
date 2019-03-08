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
      </div>
      <div v-else-if="userType('admin')">
        <div v-if="this.$store.state.showAdmin">
          <Admin/>
        </div>
        <div v-if="this.$store.state.showAdminCampaigns">
          <AdminCampaigns/>
        </div>
        <div v-if="this.$store.state.showNewCampaign">
          <NewCampaign/>
        </div>
        <div v-if="this.$store.state.showResults">
          <Results/>
        </div>
      </div>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>
import { getUserType, isUserAuthenticated } from './utils/auth';
import Admin from './components/Admin.vue';
import AdminCampaigns from './components/admin/AdminCampaigns.vue';
import ListOfCampaigns from './components/ListOfCampaigns.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import NewCampaign from './components/admin/NewCampaign.vue';
import Results from './components/Results.vue';
import Success from './components/Success.vue';
import Vote from './components/Vote.vue';

export default {
  name: 'app',
  components: {
    Admin,
    AdminCampaigns,
    ListOfCampaigns,
    Login,
    Logout,
    NewCampaign,
    Results,
    Success,
    Vote,
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
