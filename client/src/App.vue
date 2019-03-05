<template>
  <div id="app">
    <div v-if="userAuthenticated()">
      <Logout/>
      <div v-if="this.$store.state.showCampaigns">
        <ListOfCampaigns/>
      </div>
      <div v-if="this.$store.state.showVote">
        <Vote :campaign-id="this.$store.state.campaignId"/>
      </div>
      <div v-if="this.$store.state.showSuccess">
        <Success/>
      </div>
      <div v-if="this.$store.state.showResults">
        <Results/>
      </div>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>
import isUserAuthenticated from './utils/auth';
import ListOfCampaigns from './components/ListOfCampaigns.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import Results from './components/Results.vue';
import Success from './components/Success.vue';
import Vote from './components/Vote.vue';

export default {
  name: 'app',
  components: {
    ListOfCampaigns,
    Login,
    Logout,
    Results,
    Success,
    Vote,
  },
  methods: {
    userAuthenticated() {
      return isUserAuthenticated();
    },
  },
};
</script>
