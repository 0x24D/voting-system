<template>
  <div id="vote">
    <md-table v-model="candidates" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title"></h1>
      </md-table-toolbar>
       <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
         <md-table-cell md-label="Candidate" md-sort-by="name">{{ item.name }}</md-table-cell>
         <md-table-cell md-label="Party" md-sort-by="party">{{ item.party }}</md-table-cell>
      </md-table-row>
    </md-table>

    <md-button class="md-raised md-primary" @click="onBack()">Go Back</md-button>
    <md-button class="md-raised md-primary" @click="onSubmit()" :disabled="!this.selected">Submit vote</md-button>
    <md-button class="md-raised md-primary" @click="onCandidateView(selected)" :disabled="!this.selected">View Candidate Profile</md-button>
  </div>
</template>

<script>
export default {
  name: 'Vote',
  props: {
    campaignId: String,
  },
  data() {
    return {
      selected: null,
      candidates: [],
    };
  },
  created() {
    this.$axios
      .get(`http://localhost:8081/api/v1/campaigns/${this.campaignId}`)
      .then((campaignRes) => {
        // Apparently you cannot use access a data property using moustaches in md-table-toolbar.
        // So we have to set the innerText using JavaScript instead.
        document.getElementsByClassName('md-title')[0].innerText = (campaignRes.data.name);
        campaignRes.data.candidates.forEach((candidateId) => {
          this.$axios
            .get(`http://localhost:8081/api/v1/candidates/${candidateId}`)
            .then((candidateRes) => {
              this.$axios
                .get(`http://localhost:8081/api/v1/parties/${candidateRes.data.party}`)
                .then((partyRes) => {
                  this.candidates.push({
                    id: candidateRes.data._id,
                    name: candidateRes.data.name,
                    party: partyRes.data.name,
                  });
                });
            });
        });
      });
  },
  methods: {
    getClass(item){
      return item && this.selected && item.id === this.selected.id ? 'md-primary' : '';
    },
    /**
    * Set the campaigns display mode to true and set the vote display mode to false.
    */
    onBack() {
      this.$store.commit('setCampaignsDisplayMode', true);
      this.$store.commit('setVoteDisplayMode', false);
    },
    /**
     * Select the candidate in the list for use later when updating their votes
     */
    onSelect(candidate) {
      this.selected = candidate;
    },
    /**
    * Set the candidate ID to display, set the candidate profile display mode
    * to true and set the vote display mode to false.
    */
    onCandidateView(candidateId) {
      this.$store.commit('setCandidateIdToDisplay', candidateId);
      this.$store.commit('setCandidateProfileDisplayMode', true);
      this.$store.commit('setVoteDisplayMode', false);
    },
    /**
     * The onSubmit method sets voted to true for the current user so that they are unable to vote again
     * Then sends an email to the voters email address to confirm their vote
     */
    onSubmit() {
      this.$axios
        .put(`http://localhost:8081/api/v1/campaigns/${this.campaignId}`, {
          total_votes: '++',
          votes: this.selected.id,
        })
        .then(() => {
          this.$axios
          .put(`http://localhost:8081/api/v1/voters/${localStorage.user}`, {
            voted: true,
          })
          .then(() => {
            this.$axios
            // users the voterId with the subject and text
            // to the email endpoint to then send the email
            .post('http://localhost:8081/api/v1/email', {
              id: localStorage.user,
              subject: 'Vote Successful',
              text: 'Thank you for your vote!'
              });
          })
          .then(() => {
            this.$store.commit('setSuccessDisplayMode', true);
            this.$store.commit('setVoteDisplayMode', false);
          });
        });
      },
    },
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
#vote {
  padding: 50px 100px;
}
</style>
