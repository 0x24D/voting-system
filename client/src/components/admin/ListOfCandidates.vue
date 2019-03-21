<template>
  <div id="CandidateProfile">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">List of Candidates</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Candidate</md-table-head>
        <md-table-head>Party</md-table-head>
      </md-table-row>
      <md-table-row
        md-selectable="single"
        v-for="candidate in candidates"
        :key="candidate.id">
        <md-table-cell>{{ candidate.name }}</md-table-cell>
      <md-table-cell>{{ candidate.party }}</md-table-cell>
      </md-table-row>
      </md-table>
      <md-button class="md-raised md-primary" @click="onAdminView()">Go Back</md-button>
      <md-button class="md-fab md-fab-bottom-right" @click="addCandidateParty()">
      <md-icon>+</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'ListOfCandidates',
  data() {
    return {
      candidates: [],
    };
  },
  /**
   * Created method obtains all of the candidates in the database
   * These candidates are then pushed into an array which is displayed on the page
   */
  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/candidates/')
      .then((candidateRes) => {
        candidateRes.data.forEach((candidate) => {
          this.$axios
            .get(`http://localhost:8081/api/v1/parties/${candidate.party}`)
            .then((partyRes) => {
              this.candidates.push({
                id: candidate._id,
                name: candidate.name,
                party: partyRes.data.name,
              });
            });
        });
      });
  },
  /**
   *
   * OnAdminView is a function that is called when the Go Back button is pressed
   * Closes current window and navigates the user back to the admin window
   *
   */

  /**
   *
   * addCandidateParty is a function that is called when the plus button is clicked
   * Displays the dialog box which enables the user to add new candidates and parties
   *
   */
  
  methods: {
    onAdminView() {
      this.$store.commit('setListOfCandidatesDisplayMode', false);
      this.$store.commit('setAdminDisplayMode', true);
    },
    addCandidateParty() {
      this.$store.commit('setCandidatePartyDisplayMode', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
#CandidateProfile {
  padding: 50px 100px;
}
</style>
