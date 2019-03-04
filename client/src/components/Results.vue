<template>
  <div class="results">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Results</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Candidate</md-table-head>
        <md-table-head>Number of Votes</md-table-head>
      </md-table-row>

      <md-table-row
        v-for="candidate in candidates"
        :key="candidate.id">
        <md-table-cell>{{ candidate.name }}</md-table-cell>
        <md-table-cell>{{ candidate.votes  }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "Results",
  data() {
    return {
      candidates: [
        {
          id: 1,
          name: 'Shawna Dubbin',
          votes: 97
        },
        {
          id: 2,
          name: 'Odette Demageard',
          votes: 3
        },
        
      ],
    }
  },
  
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
.results {
  padding: 50px 100px;
}
</style>
