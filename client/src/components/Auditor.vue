<template>
  <div id="auditor">
    <Logout/>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Voters</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Date Of Birth</md-table-head>
        <md-table-head>Postcode</md-table-head>
        <md-table-head>Voted</md-table-head>
      </md-table-row>

      <md-table-row md-selectable="single" v-for="voter in voters" :key="voter.id">
        <md-table-cell>{{ voter.name }}</md-table-cell>
        <md-table-cell>{{ voter.email }}</md-table-cell>
        <md-table-cell>{{ new Date (voter.date_of_birth).toDateString() }}</md-table-cell>
        <md-table-cell>{{ voter.postcode }}</md-table-cell>
        <md-table-cell><md-checkbox class="md-primary"
          @change="onChange(voter)" v-model="voter.voted"/></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Logout from './Logout.vue';

export default {
  name: 'Auditor',
  components: {
    Logout,
  },
  data() {
    return {
      voters: [],
    };
  },
  /**
   * The created method that returns the voters that are able to vote at the
   * polling station that the auditor is based at.
   */
  created() {
    this.$axios
      .get(`http://localhost:8081/api/v1/auditors/${localStorage.user}`)
      .then((auditorsRes) => {
        const pollingStation = auditorsRes.data.polling_station;
        this.$axios
          .get(`http://localhost:8081/api/v1/systems?station=${pollingStation}`)
          .then((systemRes) => {
            systemRes.data.forEach((system) => {
              // for each system object -> get the voters array
              const voterArray = system.voters;
              // for each voter in array
              voterArray.forEach((voterId) => {
                // call get endpoint -> voter by id
                this.$axios
                  .get(`http://localhost:8081/api/v1/voters/${voterId}`)
                  .then((voterRes) => {
                    this.$axios
                      .get(`http://localhost:8081/api/v1/addresses/${voterRes.data.address}`)
                      .then((addressRes) => {
                        this.voters.push({
                          id: voterId,
                          name: voterRes.data.name,
                          email: voterRes.data.email,
                          date_of_birth: voterRes.data.date_of_birth,
                          postcode: addressRes.data.postcode,
                          voted: voterRes.data.voted,
                        });
                      });
                  });
              });
            });
          });
      });
  },
  methods: {
    /**
     * Updates the voters record in the database by updating the voter's
     * voted flag when the checkbox value is changed.
     *
     * @param voter the voter that the user wants to update.
     */
    onChange(voter) {
      this.$axios
        .put(`http://localhost:8081/api/v1/voters/${voter.id}`, {
          voted: voter.voted,
        });
    },
  },
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
