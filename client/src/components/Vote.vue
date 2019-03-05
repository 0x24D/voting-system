<template>
  <div id="vote">
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
    <md-button class="md-raised" @click="onSubmit()" :disabled="!this.selected">Submit vote</md-button>
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
    }
  },
  created() {
    this.$axios
      .get(`http://localhost:8081/api/v1/campaigns/${this.campaignId}`)
      .then((campaignRes) => {
        this.campaignId = campaignRes.data._id;
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
    onSubmit() {
      this.$axios
        .put(`http://localhost:8081/api/v1/campaigns/${this.campaignId}`, {
          total_votes: '++',
          votes: this.selected,
        })
        .then(() => {
          this.$axios
            .put(`http://localhost:8081/api/v1/voters/${localStorage.user}`, {
              voted: true,
            })
            .then(() => {
              this.$store.commit('setSuccessDisplayMode', true);
              this.$store.commit('setVoteDisplayMode', false);
            });
        });
    }
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
