<template>
  <div id="campaigns">
    <div class="campaign" v-for="campaign in campaigns" :key="campaign._id" @click="goToCampaign(campaign._id)"
    style="{cursor: pointer}">
      <md-list>
        <md-list-item>
          <span class="md-list-item-text">{{ campaign.name }}</span>
        </md-list-item>
      </md-list>
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
  methods: {
    hasVoted() {
      this.$axios
        .get(`http://localhost:8081/api/v1/voters/${localStorage.user}`)
        .then((response) => {
          return response.data.voted;
        });
    },
    goToCampaign(campaignId) {
      if (!this.hasVoted()) {
        this.$store.commit('setCampaignIdToDisplay', campaignId);
        this.$store.commit('setVoteDisplayMode', true);
        this.$store.commit('setCampaignsDisplayMode', false);
      }
    },
  },
  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/campaigns/')
      .then((response) => {
        this.campaigns = response.data;
    });
    // Cannot set cursor to pointer using :style, :class or in plain JS. Why?
    if (!this.hasVoted()) {
      const campaigns = document.getElementsByClassName('campaign');
      console.log(campaigns);
      Array.prototype.forEach.call(campaigns, ((c) => {
        console.log(c);
        c.style.cursor='pointer';
      }));
    }
  },
};
</script>

<style lang="scss" scoped>
#campaigns {
  padding: 50px 100px;
}
</style>
