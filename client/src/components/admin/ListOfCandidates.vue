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
