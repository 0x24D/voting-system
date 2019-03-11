<template>
  <div id="addcandidateparty">
    <md-dialog id="dialog" :md-active="true">
      <md-tabs>
        <md-tab id="tab-candidate" md-label="New Candidate">       
        </md-tab>
        <md-tab id="tab-party" md-label="New Party">
          <p>New Party Name: {{ name }}</p>
          <input v-model="name">
            
          <p>New Party Name: {{ description }}</p>
          <input v-model="description">

          <md-button class="md-primary" id="submitButton" @click="onSubmitParty()">Submit</md-button>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary" id="closeButton" @click="setupClose()">Close</md-button>  
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddCandidateParty',
  components: {
    party: {
      name: "",
      description: "",
    },

    candidate: {
      name: "",
      party:"",
      description: "",
    }
  },
  methods: {
    setupClose() {
        this.$store.commit('setCandidatePartyDisplayMode', false);
    },
    onSubmitParty(newParty) {
      this.$v.$touch();    
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/parties', {
            name: newParty.name,
            description: newParty.description,
          })
          .then(() => {
            this.$store.commit('setAdminDisplayMode', true);
            this.$store.commit('showCandidateParty', false);   
          });
      }
    },
  },
};
</script>