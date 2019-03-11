<template>
  <div id="admins">
    <form @submit.prevent>
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Add New Admin</h1>
      </md-toolbar>

      <md-field :class="getValidationClass('username')">
        <label for="username">Username</label>
        <md-input name="username" id="username" v-model="admin.username" required></md-input>
        <span class="md-error" v-if="!$v.admin.username.required">Username is required</span>
      </md-field>

      <md-field :class="getValidationClass('name')">
        <label for="name">Name</label>
        <md-input name="name" id="name" v-model="admin.name" required></md-input>
        <span class="md-error" v-if="!$v.admin.name.required">Name is required</span>
      </md-field>

      <md-field :class="getValidationClass('email')">
        <label for="email">Email</label>
        <md-input name="email" id="email" v-model="admin.email" required></md-input>
        <span class="md-error" v-if="!$v.admin.email.required">Email is required</span>
      </md-field>

      <md-field :class="getValidationClass('password')">
        <label for="password">Password</label>
        <md-input name="password" id="password" v-model="admin.password" required></md-input>
        <span class="md-error" v-if="!$v.admin.password.required">Password is required</span>
      </md-field>


    </md-card>
    <div>
      <md-button class="md-raised" id="adminButton" @click="goToAdmin()">Back to Admin</md-button>
      <md-button class="md-raised" id="submitButton" @click="onSubmit(admin)">Submit Details</md-button>
    </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: "AddAdmin",
  mixins: [validationMixin],
  data() {
    return {
      admin: {
            username: "",
            name: "",
            email: "",
            password: "",
      },
    };
  },

    methods: {
    // eslint-disable-next-line
    getValidationClass(fieldName) {
      const field = this.$v.admin[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },

    goToAdmin() {      
              this.$store.commit('setAdminDisplayMode', true);
              this.$store.commit('setAddAdminDisplayMode', false);      
    },

    onSubmit(newAdmin) {
      this.$v.$touch();    
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/admins', {
            username: newAdmin.username,
            name: newAdmin.name,
            email: newAdmin.email,
            password: newAdmin.password,
          })
          .then(() => {
            this.$store.commit('setAdminDisplayMode', true);
            this.$store.commit('setAddAdminDisplayMode', false);   
          });
      }
    },
  },

  validations: {
    admin: {
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
#admins {
  padding: 50px 100px;
}
</style>
