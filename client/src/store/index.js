import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    campaignId: '',
    showAdmin: true,
    showAdminCampaigns: false,
    showAddSystem: false,
    showAddUser: false,
    showCampaigns: true,
    showResults: false,
    showSetup: false,
    showResultsCampaigns: false,
    showSuccess: false,
    showUsers: false,
    showVote: false,
    showCandidateProfile: false,
    candidateId: '',
    showCandidates: false,
    showAddCandidateParty: false,
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
    setResultsDisplayMode(s, boolean) {
      Vue.set(s, 'showResults', boolean);
    },
    setSetupDisplayMode(s, boolean) {
      Vue.set(s, 'showSetup', boolean);
    },
    setResultsCampaignsDisplayMode(s, boolean) {
      Vue.set(s, 'showResultsCampaigns', boolean);
    },
    setSuccessDisplayMode(s, boolean) {
      Vue.set(s, 'showSuccess', boolean);
    },
    setUsersDisplayMode(s, boolean) {
      Vue.set(s, 'showUsers', boolean);
    },
    setAddSystemDisplayMode(s, boolean) {
      Vue.set(s, 'showAddSystem', boolean);
    },
    setVoteDisplayMode(s, boolean) {
      Vue.set(s, 'showVote', boolean);
    },
    setCandidateProfileDisplayMode(s, boolean) {
      Vue.set(s, 'showCandidateProfile', boolean);
    },
    setCandidateIdToDisplay(s, candidateId) {
      Vue.set(s, 'candidateId', candidateId);
    },
    setListOfCandidatesDisplayMode(s, boolean) {
      Vue.set(s, 'showCandidates', boolean);
    },
    setCandidatePartyDisplayMode(s, boolean) {
      Vue.set(s, 'showAddCandidateParty', boolean);
    },
    setAddUserDisplayMode(s, boolean) {
      Vue.set(s, 'showAddUser', boolean);
    },
  },
});
