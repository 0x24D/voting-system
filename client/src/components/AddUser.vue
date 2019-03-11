<template>
  <div id="users">
    <form @submit.prevent>
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Add New User</h1>
      </md-toolbar>

      <md-field :class="getValidationClass('username')">
        <label for="username">Username</label>
        <md-input name="username" id="username" v-model="user.username" required></md-input>
        <span class="md-error" v-if="!$v.user.username.required">Username is required</span>
      </md-field>

      <md-field :class="getValidationClass('name')">
        <label for="name">Name</label>
        <md-input name="name" id="name" v-model="user.name" required></md-input>
        <span class="md-error" v-if="!$v.user.name.required">Name is required</span>
      </md-field>

      <md-field :class="getValidationClass('email')">
        <label for="email">Email</label>
        <md-input name="email" id="email" v-model="user.email" required></md-input>
        <span class="md-error" v-if="!$v.user.email.required">Email is required</span>
      </md-field>

      <md-field :class="getValidationClass('password')">
        <label for="password">Password</label>
        <md-input name="password" id="password" v-model="user.password" required></md-input>
        <span class="md-error" v-if="!$v.user.password.required">Password is required</span>
      </md-field>


    </md-card>
    <div>
      <md-button class="md-raised" id="adminButton" @click="goToAdmin()">Back to Admin</md-button>
      <md-button class="md-raised" id="submitButton" @click="onSubmit(user)">Submit Details</md-button>
    </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: "AddUser",
  mixins: [validationMixin],
  data() {
    return {
      user: {
            username: "",
            name: "",
            email: "",
            password: "",
            date_of_birth: "",
            address: "",
      },
    };
  },

    methods: {
    // eslint-disable-next-line
    getValidationClass(fieldName) {
      const field = this.$v.user[fieldName];
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

    onSubmit(newUser) {
      this.$v.$touch();    
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/admins', {
            username: newUser.username,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
          })
          .then(() => {
            this.$store.commit('setAdminDisplayMode', true);
            this.$store.commit('setAddUserDisplayMode', false);   
          });
      }
    },
  },

  validations: {
    user: {
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
#users {
  padding: 50px 100px;
}
</style>
