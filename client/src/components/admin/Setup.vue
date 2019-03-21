<template>
  <div id="setup">
    <md-dialog id="dialog" :md-active="true">
      <md-tabs>
        <md-tab id="tab-campaign" md-label="New Campaign">
          <NewCampaign/>
        </md-tab>
        <md-tab id="tab-address" md-label="New Address">
          <NewAddress/>
        </md-tab>
        <md-tab id="tab-constituency" md-label="New Constituency">
          <NewConstituency/>
        </md-tab>
        <md-tab id="tab-pollingStation" md-label="New Polling Station">
          <NewPollingStation/>
        </md-tab>
        <md-tab id="tab-system" md-label="New System">
          <NewSystem/>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary" id="closeButton" @click="setupClose()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import NewAddress from './NewAddress.vue';
import NewCampaign from './NewCampaign.vue';
import NewConstituency from './NewConstituency.vue';
import NewPollingStation from './NewPollingStation.vue';
import NewSystem from './NewSystem.vue';

export default {
  name: 'Setup',
  components: {
    NewAddress,
    NewCampaign,
    NewConstituency,
    NewPollingStation,
    NewSystem,
  },
  mounted() {
    const container = document.getElementsByClassName('md-dialog-container')[0];
    container.style.height = '100%';
    container.style.width = '100%';
  },
  methods: {
    /**
    * Set variable for displaying setup UI to false.
    */
    setupClose() {
      this.$store.commit('setSetupDisplayMode', false);
    },
  },
};
</script>

<style scoped>
#dialog {
  width: -webkit-fill-available;
  width: -moz-available;
}
</style>
