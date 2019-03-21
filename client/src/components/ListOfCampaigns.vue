<template>
  <div id="campaigns">
    <Logout/>
    <div class="campaign" v-for="campaign in campaigns" :key="campaign._id"
    @click="goToCampaign(campaign._id)" :style="getCursorStyle">
      <md-list>
        <md-list-item>
          <span class="md-list-item-text">{{ campaign.name }}</span>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>
<script>
import Logout from './Logout.vue';

export default {
  name: 'ListOfCampaigns',
  components: {
    Logout,
  },
  data() {
    return {
      campaigns: [],
      hasVoted: null,
    };
  },
  computed: {
    getCursorStyle() {
      return `cursor: ${this.hasVoted ? 'default' : 'pointer'}`;
    },
  },
  methods: {
    goToCampaign(campaignId) {
      if (!this.hasVoted) {
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
    this.$axios
      .get(`http://localhost:8081/api/v1/voters/${localStorage.user}`)
      .then((response) => {
        this.hasVoted = response.data.voted;
      });
  },
};
</script>

<style lang="scss" scoped>
#campaigns {
  padding: 50px 100px;
}
</style>
