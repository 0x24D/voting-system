<template>
  <div id="users">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">List of Users</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Username</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Role</md-table-head>
      </md-table-row>
      <md-table-row
        v-for="user in users"
        :key="user.id">
        <md-table-cell>{{ user.username }}</md-table-cell>
        <md-table-cell>{{ user.name }}</md-table-cell>
        <md-table-cell>{{ user.email }}</md-table-cell>
        <md-table-cell>{{ user.roles }}</md-table-cell>
      </md-table-row>
      </md-table>
      <md-button class="md-raised md-primary" @click="onAdminView()">Go Back</md-button>
      <md-button class="md-fab md-fab-bottom-right" @click="addAdmin()">
      <md-icon>+</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      users: [],
    };
  },
 /**
   * Created method calls the get users endpoint on the server to display all user and their types
   */
  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/users/')
      .then((userRes) => {
        userRes.data.forEach((user) => {   
              this.users.push({
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                roles: user.__t,
            });
        });
      });
  },
  methods: {
    onAdminView() {
      this.$store.commit('setUsersDisplayMode', false);
      this.$store.commit('setAdminDisplayMode', true);
    },
    addAdmin() {
      this.$store.commit('setAddUserDisplayMode', true);
    },
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
