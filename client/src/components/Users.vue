<template>
  <div id="users">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Username</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Email</md-table-head>
      </md-table-row>

      
    </md-table>
    <md-button class="md-raised" @click="onResults()">View Results</md-button>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: [],
    }
  },
  created() {
    
      //todo

  },

    methods: {
    onResults() {      
              this.$store.commit('setResultsDisplayMode', true);
              this.$store.commit('setUsersDisplayMode', false);      
    }
  },

};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
#users {
  padding: 50px 100px;
}
</style>
