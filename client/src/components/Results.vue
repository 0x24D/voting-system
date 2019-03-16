<template>
  <div id="results">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Results</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Candidate</md-table-head>
        <md-table-head>Party</md-table-head>
        <md-table-head>Number of Votes</md-table-head>
      </md-table-row>

      <md-table-row
        v-for="candidate in candidates"
        :key="candidate.id">
        <md-table-cell>{{ candidate.name }}</md-table-cell>
        <md-table-cell>{{ candidate.party  }}</md-table-cell>
        <md-table-cell>{{ candidate.votes  }}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-button class="md-raised" @click="goToAdmin()">Back to Admin</md-button>
  </div>
</template>

<script>
export default {
  name: 'Results',
  data() {
    return {
      candidates: [],
    };
  },
  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/campaigns/')
      .then((campaignRes) => {
        // TODO: iterate through all arrays rather than just the first
        campaignRes.data[0].votes.forEach((candidateArr) => {
          Object.keys(candidateArr).forEach((candidateId) => {
            this.$axios
              .get(`http://localhost:8081/api/v1/candidates/${candidateId}`)
              .then((candidateRes) => {
                this.$axios
                  .get(`http://localhost:8081/api/v1/parties/${candidateRes.data.party}`)
                  .then((partyRes) => {
                    const candidateIndex = campaignRes.data[0].votes.findIndex(
                      candidate => Object.prototype.hasOwnProperty.call(candidate, candidateId),
                    );
                    let votes = '';
                    if (candidateIndex !== -1) {
                      votes = campaignRes.data[0].votes[candidateIndex][candidateId];
                    }
                    this.candidates.push({
                      name: candidateRes.data.name,
                      party: partyRes.data.name,
                      votes,
                    });
                  });
              });
          });
        });
      });
  },

  methods: {
    goToAdmin()  {    
              this.$store.commit('setAdminDisplayMode', true);
              this.$store.commit('setResultsDisplayMode', false);      
    },
  },
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
#results {
  padding: 50px 100px;
}
</style>
