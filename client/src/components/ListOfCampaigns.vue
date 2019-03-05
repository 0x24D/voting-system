<template>
  <div class="campaigns">
    <div class="campaign" v-for="campaign in campaigns" :key="campaign._id" @click="goToCampaign(campaign._id)">
      <md-card md-with-hover class="md-size-75">
          <md-card-header>
            <div class="md-title">{{ campaign.name }}</div>
          </md-card-header>
          <md-card-content>
            <md-list>
              <md-list-item>
                <span class="md-list-item-text">Campaign Type</span>
                <span class="md-list-item-text">{{ campaign.type }}</span>
              </md-list-item>
              <md-list-item>
                <span class="md-list-item-text">Date</span>
                <span class="md-list-item-text">{{ new Date(campaign.start_date).toDateString() }}
                {{ new Date(campaign.start_date).toLocaleTimeString() }} - {{ new Date(campaign.end_date).toDateString() }}
                {{ new Date(campaign.end_date).toLocaleTimeString() }}</span>
              </md-list-item>
            </md-list>
          </md-card-content>
        </md-card>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ListOfCampaigns',
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
    goToCampaign(campaignId) {
      console.log(localStorage.user);
      this.$axios
        .get(`http://localhost:8081/api/v1/voters/${localStorage.user}`)
        .then((response) => {
          console.log(response.data);
          if (!response.data.voted) {
            this.$store.commit('setCampaignIdToDisplay', campaignId);
            this.$store.commit('setVoteDisplayMode', true);
            this.$store.commit('setCampaignsDisplayMode', false);
          }
        });
    }
  }
};
</script>
