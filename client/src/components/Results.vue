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
        <md-table-cell>{{ candidate.party }}</md-table-cell>
        <md-table-cell>{{ candidate.votes }}</md-table-cell>
      </md-table-row>
    </md-table>

     <!-- Create a new chart instance with the data from the array -->
    <md-card id="chart">
    <bars
      :data="this.chartData"
      :gradient="['#ffbe88', '#ff93df']"
      :barWidth="25"
      :growDuration="1"
      :padding="1"
      :width="1000"
      :height="350">
    </bars>
    </md-card>
    <md-card-actions>
      <md-button class="md-raised md-primary" @click="onBack()">Go Back</md-button>
    </md-card-actions>
  </div>
</template>
<script>
export default {
  name: 'Results',
  props: {
    campaignId: String,
  },
  data() {
    return {
      candidates: [],
      chartData: [{ value: 0, title: 'empty' }],
    };
  },
  /**
   * Created method gets each candidate, party and votes for the campaign
   * stores these into objects and pushes them to an array called candidates
   *
   */
  created() {
    this.$axios
      .get(`http://localhost:8081/api/v1/campaigns/${this.campaignId}`)
      .then((campaignRes) => {
        campaignRes.data.votes.forEach((candidateArr) => {
          Object.keys(candidateArr).forEach((candidateId) => {
            this.$axios
              .get(`http://localhost:8081/api/v1/candidates/${candidateId}`)
              .then((candidateRes) => {
                this.$axios
                  .get(`http://localhost:8081/api/v1/parties/${candidateRes.data.party}`)
                  .then((partyRes) => {
                    const candidateIndex = campaignRes.data.votes.findIndex(
                      candidate => Object.prototype.hasOwnProperty.call(candidate, candidateId),
                    );
                    let votes = '';
                    if (candidateIndex !== -1) {
                      votes = campaignRes.data.votes[candidateIndex][candidateId];
                    }
                    this.candidates.push({
                      name: candidateRes.data.name,
                      party: partyRes.data.name,
                      votes,
                    });
                    // Pushes the candidate name and votes to the chartData array as objects
                    this.chartData.push({
                      title: `${candidateRes.data.name}: ${campaignRes.data.votes[candidateIndex][candidateId]}`,
                      value: campaignRes.data.votes[candidateIndex][candidateId],
                    });
                  });
              });
          });
        });
      });
  },
  methods: {
    onBack() {
      this.$store.commit('setResultsCampaignsDisplayMode', true);
      this.$store.commit('setResultsDisplayMode', false);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  max-width: 800px;
  margin: 0 auto;
}
.md-table + .md-table +  .md-table-row>{
  margin-top: 16px;
}
.md-field {
    max-width: 300px;
  }
#results {
  padding: 50px 100px;
}
#chart {
  height: auto;
}
</style>
