<template>
  <div id="voters">
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Add New Voter</h1>
      </md-toolbar>

      <md-field>
        <label>Username</label>
        <md-input name="username" type="text" v-model="voter.username"></md-input>
      </md-field>

      <md-field>
        <label>Name</label>
        <md-input name="name" type="text" v-model="voter.name"></md-input>
      </md-field>

      <md-field>
        <label>Email</label>
        <md-input name="email" type="text" v-model="voter.email"></md-input>
      </md-field>

      <md-field>
        <label>Password</label>
        <md-input name="password" type="text" v-model="voter.password"></md-input>
      </md-field>


    </md-card>
    <div>
      <md-button class="md-raised" @click="goToAdmin()">Back to Admin</md-button>
      <md-button class="md-raised" @click="onSubmit(voter)">Submit Details</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddVoter",
  data() {
    return {
      voter: {
            username: "",
            name: "",
            email: "",
            password: "",
            date_of_birth: Date.now(),
            address: {
              line_one: "one",
              line_two: "two",
              town: "town1",
              county: "county1",
              country: "country1",
              postcode: "dn49bd",
              constituency: {
                name: "Doncaster North",
                minimum_age: 18,
                voting_system: "FPTP",
              }
            }

      }
    };
  },
  created() { 

  },

    methods: {
    goToAdmin() {      
              this.$store.commit('setAdminDisplayMode', true);
              this.$store.commit('setAddUserDisplayMode', false);      
    },
    onSubmit(newVoter) {
      console.log(newVoter);
      this.$axios
        .post("http://localhost:8081/api/v1/voters/", {
              username: newVoter.username,
              name: newVoter.name,
              email: newVoter.email,
              password: newVoter.password,
              date_of_birth: Date.now(),
              address: newVoter.address,             
            }) 
            .then(response => {
              this.$store.commit('setAdminDisplayMode', true);
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
#voters {
  padding: 50px 100px;
}
</style>
