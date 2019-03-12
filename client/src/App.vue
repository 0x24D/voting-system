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
        <div v-if="this.$store.state.showResultsCampaigns">
          <ResultsCampaigns/>
        </div>
        <div v-if="this.$store.state.showResults">
          <Results :campaign-id="this.$store.state.campaignId"/>
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
import ListOfCampaigns from './components/ListOfCampaigns.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import Results from './components/Results.vue';
import ResultsCampaigns from './components/admin/ResultsCampaigns.vue';
import Success from './components/Success.vue';
import Vote from './components/Vote.vue';

export default {
  name: 'app',
  components: {
    Admin,
    ListOfCampaigns,
    Login,
    Logout,
    Results,
    ResultsCampaigns,
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
