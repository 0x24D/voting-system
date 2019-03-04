<template>
  <div class="Vote">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Cast a Vote</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Candidate</md-table-head>  
        <md-table-head>Party</md-table-head>
      </md-table-row>

      <md-table-row
        md-selectable="single"
        v-for="candidate in Candidates"
        :key="candidate._id"
        @click="onSelect(candidate.id)"
      >
        <md-table-cell>{{ candidate.name}}</md-table-cell>
        <md-table-cell>{{ candidate.party }}</md-table-cell>
      </md-table-row>
    </md-table>
    <p>Selected:</p>
    {{ selected }}
  </div>
</template>

<script>
export default {
  name: "Vote",
  data: () => ({
    selected: {},
    Candidates: [
          {
          id: 1,
          name: 'Shawna Dubbin',
          party: "labour"
        },
        {
          id: 2,
          name: 'Odette Demageard',
          party: "greens"
        },
      ],

  }), 
    methods: {
        onSelect(candidate) {
            console.log(candidate);
            this.selected = candidate;
        },
    },
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
.Vote {
  padding: 50px 100px;
}
</style>
