<template>
  <div id="admin">
    <md-button class="md-raised" @click="goToAddAdmin()">Add Admin</md-button>
    <md-button class="md-raised" @click="goToAddAuditor()">Add Auditor</md-button>
    <md-button class="md-raised" @click="goToAddVoter()">Add Voter</md-button>
    <md-button class="md-raised" @click="goToResults()">View Results</md-button>
    <md-button class="md-raised" @click="goToCandidates()">View Candidates</md-button>
    <md-button class="md-raised" @click="goToCampaigns()">View Campaigns</md-button>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  methods: {
    goToCampaigns() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setAdminCampaignsDisplayMode', true);
    },
    goToCandidates() {
      this.$store.commit('setAdminDisplayMode', false);
      // this.$store.commit('setCandidatessDisplayMode', true);
    },
    goToResults() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setResultsDisplayMode', true);
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
