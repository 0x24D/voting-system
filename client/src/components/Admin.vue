<template>

  <div id="admin">
    <md-card>
    <div>
      <md-button class="md-raised" @click="goToUsers()">View Users</md-button>

    </div>
    <div>
      <md-button class="md-raised" @click="goToResults()">View Results</md-button>
    </div>
    <div>
      <md-button class="md-raised" @click="goToCandidates()">View Candidates</md-button>
    </div>
    <div>
      <md-button class="md-raised" @click="goToCampaigns()">View Campaigns</md-button>
    </div>
    <Logout/>
    </md-card>
  </div>
</template>

<script>
import Logout from './Logout.vue';

export default {
  name: 'Admin',
  components: {
    Logout,
  },
  methods: {
    goToCampaigns() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setAdminCampaignsDisplayMode', true);
    },
    goToCandidates() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setListOfCandidatesDisplayMode', true);
    },
    goToResults() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setResultsCampaignsDisplayMode', true);
    },
    goToUsers() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setUsersDisplayMode', true);
    },
  },
};
</script>

<style lang="scss" scoped>
html, body { height: 100%; padding: 0; margin: 0; }
div { width: 50%; height: 50%; float: left; }

</style>
