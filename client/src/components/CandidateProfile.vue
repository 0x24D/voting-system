<template>
  <div id="CandidateProfile">
    <md-table md-card md-selectable="single"
        v-for="candidate in candidates"
        :key="candidate.id">
      <md-table-toolbar>
        <h1 class="md-title">{{ candidate.name }} Candidate Profile</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Candidate</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell>{{ candidate.name }}</md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-head>Description</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell>{{ candidate.description }}</md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-head>{{ candidate.party }}</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell>{{ candidate.partydescription }}</md-table-cell>

      </md-table-row>

    </md-table>
    <md-button @click="onVoteView()">Back To Vote</md-button>
  </div>
</template>

<script>
export default {
  name: 'CandidateProfile',
  props: {
    candidateId: String,
  },
  data() {
    return {
      candidates: [],
      parties: [],
    };
  },

  /**
   * The Created method populates the page with a specific candidates details
   * From the database it obtains details on candidate party,
   * candidate description and candidate name.
   */

  created() {
    this.$axios
      .get(`http://localhost:8081/api/v1/candidates/${this.candidateId}`)
      .then((candidateRes) => {
        this.$axios
          .get(`http://localhost:8081/api/v1/parties/${candidateRes.data.party}`)
          .then((partyRes) => {
            this.candidates.push({
              id: candidateRes.data._id,
              name: candidateRes.data.name,
              party: partyRes.data.name,
              description: candidateRes.data.description,
              partydescription: partyRes.data.description,
            });
          });
      });
  },

  /**
   *
   * OnVoteView is a function that happens when the user clicks on the close button on the page
   * It closes the current candidate page and sends the user back to the voting screen
   *
   */

  methods: {
    onVoteView() {
      this.$store.commit('setCandidateProfileDisplayMode', false);
      this.$store.commit('setVoteDisplayMode', true);
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
