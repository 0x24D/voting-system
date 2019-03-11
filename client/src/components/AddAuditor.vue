<template>
  <div id="auditors">
    <form @submit.prevent>
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Add New Auditor</h1>
      </md-toolbar>

      <md-field :class="getValidationClass('username')">
        <label for="username">Username</label>
        <md-input name="username" id="username" v-model="auditor.username" required></md-input>
        <span class="md-error" v-if="!$v.auditor.username.required">Username is required</span>
      </md-field>

      <md-field :class="getValidationClass('name')">
        <label for="name">Name</label>
        <md-input name="name" id="name" v-model="auditor.name" required></md-input>
        <span class="md-error" v-if="!$v.auditor.name.required">Name is required</span>
      </md-field>

      <md-field :class="getValidationClass('email')">
        <label for="email">Email</label>
        <md-input name="email" id="email" v-model="auditor.email" required></md-input>
        <span class="md-error" v-if="!$v.auditor.email.required">Email is required</span>
      </md-field>

      <md-field :class="getValidationClass('password')">
        <label for="password">Password</label>
        <md-input name="password" id="password" v-model="auditor.password" required></md-input>
        <span class="md-error" v-if="!$v.auditor.password.required">Password is required</span>
      </md-field>


    </md-card>
    <div>
      <md-button class="md-raised" id="adminButton" @click="goToAdmin()">Back to Admin</md-button>
      <md-button class="md-raised" id="submitButton" @click="onSubmit(auditor)">Submit Details</md-button>
    </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: "AddAuditor",
  mixins: [validationMixin],
  data() {
    return {
      auditor: {
            username: "",
            name: "",
            email: "",
            password: "",
            polling_station: "",
      },
    };
  },

    methods: {
    // eslint-disable-next-line
    getValidationClass(fieldName) {
      const field = this.$v.auditor[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },

    goToAdmin() {      
              this.$store.commit('setAdminDisplayMode', true);
              this.$store.commit('setAddAuditorDisplayMode', false);      
    },

    onSubmit(newAuditor) {
      this.$v.$touch();    
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/auditors', {
            username: newAuditor.username,
            name: newAuditor.name,
            email: newAuditor.email,
            password: newAuditor.password,
            polling_station: newAuditor.polling_station,
          })
          .then(() => {
            this.$store.commit('setAdminDisplayMode', true);
            this.$store.commit('setAddAuditorDisplayMode', false);   
          });
      }
    },
  },

  validations: {
    auditor: {
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
#auditors {
  padding: 50px 100px;
}
</style>
