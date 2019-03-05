import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    campaignId: '',
    showCampaigns: true,
    showSuccess: false,
    showVote: false,
  },
  getters: {
  },
  actions: {
  },
  mutations: {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    setCampaignIdToDisplay(s, campaignId) {
      Vue.set(s, 'campaignId', campaignId);
    },
    setCampaignsDisplayMode(s, boolean) {
      Vue.set(s, 'showCampaigns', boolean);
    },
    setSuccessDisplayMode(s, boolean) {
      Vue.set(s, 'showSuccess', boolean);
    },
    setVoteDisplayMode(s, boolean) {
      Vue.set(s, 'showVote', boolean);
    },
  },
});
