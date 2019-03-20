<template>
  <div id="admin">
    <div>
      <md-button class="md-raised" @click="goToAddAdmin()">Add Admin</md-button>
      <md-button class="md-raised" @click="goToAddAuditor()">Add Auditor</md-button>
      <md-button class="md-raised" @click="goToAddVoter()">Add Voter</md-button>
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
    goToAddAdmin() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setAddAdminDisplayMode', true);
    },
    goToAddAuditor() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setAddAuditorDisplayMode', true);
    },
    goToAddVoter() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setAddVoterDisplayMode', true);
    },
  },
};
</script>

<style lang="scss" scoped>
html, body { height: 100%; padding: 0; margin: 0; }
div { width: 50%; height: 50%; float: left; }
</style>
