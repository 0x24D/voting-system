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

 
    <md-card id="chart"> 
    <bars
      :data="this.chartData"
      :gradient="['#ffbe88', '#ff93df']"
      :barWidth="30"
      :padding="18">
    </bars>
    </md-card>
     </div>
 
</template>
<script>
export default {
  name: 'Results',
  data() {
    return {
      candidates: [],
      chartData: [{value: 0, title: 'empty'}],
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
                    
                    this.chartData.push({
                      value: campaignRes.data[0].votes[candidateIndex][candidateId],
                      title: `${candidateRes.data.name}: ${campaignRes.data[0].votes[candidateIndex][candidateId]}`, 
                    });
                  });
              });
          });
        });
      });
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
  margin:  0 auto;
}
.md-table + .md-table {
  margin-top: 16px;
}
#results {
  padding: 50px 100px;
}

</style>
