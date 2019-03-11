<template>
  <div id="admin">
    <md-button class="md-raised" @click="goToUsers()">View Users</md-button>
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
      // this.$store.commit('setCampaignsDisplayMode', true);
    },
    goToCandidates() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setListOfCandidatesDisplayMode', true);
    },
    goToResults() {
      this.$store.commit('setAdminDisplayMode', false);
      this.$store.commit('setResultsDisplayMode', true);
    },
    goToUsers() {
      this.$store.commit('setAdminDisplayMode', false);
      // this.$store.commit('setUsersDisplayMode', true);
    },
  },
};
</script>
