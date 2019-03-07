<template>
  <div id="users">
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Add New User</h1>
      </md-toolbar>

      <md-field>
        <label>Username</label>
        <md-input name="username" type="text" v-model="user.username"></md-input>
      </md-field>

      <md-field>
        <label>Name</label>
        <md-input name="name" type="text" v-model="user.name"></md-input>
      </md-field>

      <md-field>
        <label>Email</label>
        <md-input name="email" type="text" v-model="user.email"></md-input>
      </md-field>

      <md-field>
        <label>Password</label>
        <md-input name="password" type="text" v-model="user.password"></md-input>
      </md-field>

      <md-field>
        <label>Role</label>
        <select name="roles" v-model="user.roles">
          <option value="voter">Voter</option>
          <option value="admin">Admin</option>
          <option value="auditor">Auditor</option>
        </select>
      </md-field>
      
    </md-card>
    <div>
      <md-button class="md-raised" @click="onSubmit(user)">Submit Details</md-button>
      <md-button class="md-raised" @click="onResults()">View Results</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddUser",
  data() {
    return {
      user: {
            username: "",
            name: "",
            email: "",
            password: "",
            roles: "",
      }
    };
  },
  created() { 

  },

    methods: {
    onResults() {      
              this.$store.commit('setResultsDisplayMode', true);
              this.$store.commit('setAddUserDisplayMode', false);      
    },
    onSubmit(newUser) {
      console.log(newUser);
      this.$axios
        .post("http://localhost:8081/api/v1/users/", {
              username: newUser.username,
              name: newUser.name,
              email: newUser.email,
              password: newUser.password,
              roles: newUser.roles,
            }) // maybe change here for different posts 
            .then(response => {
              this.$store.commit('setResultsDisplayMode', true);
              this.$store.commit('setAddUserDisplayMode', false);   
            })
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
