<template>
  <div id="setup">
    <md-dialog id="dialog" :md-active="true">
      <md-tabs>
        <md-tab id="tab-campaign" md-label="New Campaign">
          <NewCampaign/>
        </md-tab>
        <md-tab id="tab-address" md-label="New Address">
          TODO: implement new address UI
        </md-tab>
        <md-tab id="tab-candidate" md-label="New Candidate">
          UI to be implemented in feat/candidate-profiles
        </md-tab>
        <md-tab id="tab-constituency" md-label="New Constituency">
          TODO: implement new constituency UI
        </md-tab>
        <md-tab id="tab-party" md-label="New Party">
          UI to be implemented in feat/candidate-profiles
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary" id="closeButton" @click="setupClose()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import NewCampaign from './NewCampaign.vue';
export default {
  name: 'Setup',
  components: {
    NewCampaign,
  },
  methods: {
    setupClose() {
        this.$store.commit('setSetupDisplayMode', false);
    },
  },
};
</script>
