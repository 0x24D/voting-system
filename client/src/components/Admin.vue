<template>
  <div id="admin">
    <md-card>
      <md-card-content>
        <md-button class="md-raised" @click="goToAddAdmin()">Add Admin</md-button>
        <md-button class="md-raised" @click="goToAddAuditor()">Add Auditor</md-button>
        <md-button class="md-raised" @click="goToAddVoter()">Add Voter</md-button>
        <md-button class="md-raised" @click="goToResults()">View Results</md-button>
        <md-button class="md-raised" @click="goToCandidates()">View Candidates</md-button>
        <md-button class="md-raised" @click="goToCampaigns()">View Campaigns</md-button>
        <Logout/>
      </md-card-content>
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
#admin {
  margin: 0 auto;
}
</style>
