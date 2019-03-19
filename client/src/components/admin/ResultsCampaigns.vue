<template>
  <div id="campaigns">
    <md-table v-model="campaigns" md-card @md-selected="goToResults">
      <md-table-toolbar>
        <h1 class="md-title">Campaigns</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Start date" md-sort-by="start_date">
            {{ new Date(item.start_date).toDateString() }}</md-table-cell>
        <md-table-cell md-label="End date" md-sort-by="end_date">
            {{ new Date(item.end_date).toDateString() }}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-button class="md-raised md-primary" @click="onBack()">Go Back</md-button>
  </div>
</template>
<script>

export default {
  name: 'ResultsCampaigns',
  data() {
    return {
      campaigns: [],
    };
  },
  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/campaigns/')
      .then((response) => {
        this.campaigns = response.data;
      });
  },
  methods: {
    onBack() {
      this.$store.commit('setAdminDisplayMode', true);
      this.$store.commit('setResultsCampaignsDisplayMode', false);
    },
    goToResults(campaign) {
      this.$store.commit('setCampaignIdToDisplay', campaign._id);
      this.$store.commit('setResultsDisplayMode', true);
      this.$store.commit('setResultsCampaignsDisplayMode', false);
    },
  },
};
</script>

<style lang="scss" scoped>
#campaigns {
  padding: 50px 100px;
}
</style>
