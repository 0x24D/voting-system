<template>
  <div class="vote">
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
        v-for="candidate in candidates"
        :key="candidate.id"
        @click="onSelect(candidate.id)">
        <md-table-cell>{{ candidate.name }}</md-table-cell>
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
  data() {
    return {
      selected: {},
      candidates: [],
    }
  },
  created() {
    const currentUrl = window.location.pathname.split("/");
    const campaignId = currentUrl[2];
    this.$axios
      .get(`http://localhost:8081/api/v1/campaigns/${campaignId}`)
      .then((campaignRes) => {
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
                    party: partyRes.data.name
                  });
            });
          });
        });
      });
  },
  methods: {
    onSelect(candidate) {
      this.selected = candidate;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
.vote {
  padding: 50px 100px;
}
</style>
