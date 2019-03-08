<template>
  <div id="adminCampaigns">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Campaigns</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Campaign</md-table-head>
        <md-table-head>Type</md-table-head>
        <md-table-head>Date</md-table-head>
      </md-table-row>
      <md-table-row
        v-for="campaign in campaigns"
        :key="campaign._id">
        <md-table-cell>{{ campaign.name }}</md-table-cell>
        <md-table-cell>{{ campaign.campaign_type  }}</md-table-cell>
        <md-table-cell>{{ new Date(campaign.start_date).toDateString() }}
        {{ new Date(campaign.start_date).toLocaleTimeString() }} - {{ new Date(campaign.end_date).toDateString() }}
        {{ new Date(campaign.end_date).toLocaleTimeString() }}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-button class="md-fab md-fab-bottom-right" @click="newCampaign()">
      <md-icon>+</md-icon>
    </md-button>
  </div>
</template>
<script>

export default {
  name: 'AdminCampaigns',
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
    newCampaign() {
      this.$store.commit('setNewCampaignDisplayMode', true);
    },
  },
};
</script>
