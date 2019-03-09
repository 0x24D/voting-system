<template>
  <div id="auditor">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Voters</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Voted</md-table-head>
      </md-table-row>

      <md-table-row md-selectable="single" v-for="voter in voters" :key="voter.id">
        <md-table-cell>{{ voter.name }}</md-table-cell>
        <md-table-cell><md-checkbox class="md-primary" @change="onChange(voter)" v-model="voter.voted"/></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "Auditor",
  data() {
    return {
      voters: []
    };
  },
  /**
   * <p> The created method that returns the voters that are able to vote at the polling station that the auditor is based at 
   * </p>
   * @return the voters array that is used to populate the UI table
   */
  created() {
    this.$axios
      .get(`http://localhost:8081/api/v1/auditors/${localStorage.user}`)
      .then((auditorsRes) => {
        const pollingStation = auditorsRes.data.polling_station;
        this.$axios
          .get(`http://localhost:8081/api/v1/systems?station=${pollingStation}`)
          .then(systemRes => {
            systemRes.data.forEach((system) => {
              // for each system object -> get the voters array
              const voterArray = system.voters;
              // for each voter in array
              voterArray.forEach((voterId) => {
                // call get endpoint -> voter by id
                this.$axios
                  .get(`http://localhost:8081/api/v1/voters/${voterId}`)
                  .then((voterRes) => {
                    this.voters.push({
                      id: voterId,
                      name: voterRes.data.name,
                      voted: voterRes.data.voted
                    });
                  });
              });
            });
          });
      });
  },
  methods: {
    /**
     * <p> Updates the voters record in the database by updating the voter's voted flag when the checkbox value is changed
     * </p>
     * @param voter the voter that the user wanst to update
     */
    onChange(voter){
                  this.$axios
            .put(`http://localhost:8081/api/v1/voters/${voter.id}`, {
              voted: voter.voted,
            });
    }
  }
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
#auditor {
  padding: 50px 100px;
}
</style>
