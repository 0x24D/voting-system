import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    campaignId: '',
    showAdmin: true,
    showAdminCampaigns: false,
    showCampaigns: true,
    showNewCampaign: false,
    showResults: false,
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
    setAdminDisplayMode(s, boolean) {
      Vue.set(s, 'showAdmin', boolean);
    },
    setAdminCampaignsDisplayMode(s, boolean) {
      Vue.set(s, 'showAdminCampaigns', boolean);
    },
    setCampaignsDisplayMode(s, boolean) {
      Vue.set(s, 'showCampaigns', boolean);
    },
    setNewCampaignDisplayMode(s, boolean) {
      Vue.set(s, 'showNewCampaign', boolean);
    },
    setResultsDisplayMode(s, boolean) {
      Vue.set(s, 'showResults', boolean);
    },
    setSuccessDisplayMode(s, boolean) {
      Vue.set(s, 'showSuccess', boolean);
    },
    setVoteDisplayMode(s, boolean) {
      Vue.set(s, 'showVote', boolean);
    },
  },
});
