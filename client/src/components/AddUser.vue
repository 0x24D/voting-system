<template>
  <div id="voters">
    <form @submit.prevent>
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Add New Voter</h1>
      </md-toolbar>

      <md-field :class="getValidationClass('username')">
        <label for="username">Username</label>
        <md-input name="username" id="username" v-model="voter.username" required></md-input>
        <span class="md-error" v-if="!$v.voter.username.required">Username is required</span>
      </md-field>

      <md-field :class="getValidationClass('name')">
        <label for="name">Name</label>
        <md-input name="name" id="name" v-model="voter.name" required></md-input>
        <span class="md-error" v-if="!$v.voter.name.required">Name is required</span>
      </md-field>

      <md-field :class="getValidationClass('email')">
        <label for="email">Email</label>
        <md-input name="email" id="email" v-model="voter.email" required></md-input>
        <span class="md-error" v-if="!$v.voter.email.required">Email is required</span>
      </md-field>

      <md-field :class="getValidationClass('password')">
        <label for="password">Password</label>
        <md-input name="password" id="password" v-model="voter.password" required></md-input>
        <span class="md-error" v-if="!$v.voter.password.required">Password is required</span>
      </md-field>


    </md-card>
    <div>
      <md-button class="md-raised" id="adminButton" @click="goToAdmin()">Back to Admin</md-button>
      <md-button class="md-raised" id="submitButton" @click="onSubmit(voter._id, voter)">Submit Details</md-button>
    </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: "AddVoter",
  mixins: [validationMixin],
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

    methods: {
    // eslint-disable-next-line
    getValidationClass(fieldName) {
      const field = this.$v.voter[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },

    goToAdmin() {      
              this.$store.commit('setAdminDisplayMode', true);
              this.$store.commit('setAddUserDisplayMode', false);      
    },
    onSubmit(voterId, newVoter) {
      console.log(newVoter);
      this.$axios
        .post('http://localhost:8081/api/v1/voters/', {
              username: newVoter.username,
              name: newVoter.name,
              email: newVoter.email,
              password: newVoter.password,
              roles: newVoter.roles,
              date_of_birth: newVoter.date_of_birth,
              address: newVoter.address,
            }) 
            .then(response => {
              this.$store.commit('setAdminDisplayMode', true);
              this.$store.commit('setAddUserDisplayMode', false);   
            })
    },
  },

  validations: {
    voter: {
      username: {
        required,
      },
      name: {
        required,
      },
      email: {
        required,
      },
      password: {
        required,
      },
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
