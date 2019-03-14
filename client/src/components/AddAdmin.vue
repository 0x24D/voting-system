<template>
  <div id="admins">
    <form novalidate class="md-layout" @submit.prevent>
   <md-card class="md-layout-item md-size-100 md-small-size-100">
      <md-card-header>
        <div class="md-title">Add New Admin</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('username')">
            <label for="username">Username</label>
              <md-input name="username" id="username" v-model="admin.username" required></md-input>
            <span class="md-error" v-if="!$v.admin.username.required">Username is required</span>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('name')">
            <label for="name">Name</label>
              <md-input name="name" id="name" v-model="admin.name" required></md-input>
            <span class="md-error" v-if="!$v.admin.name.required">Name is required</span>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
              <md-input name="email" id="email" type="email" v-model="admin.email" required></md-input>
            <span class="md-error" v-if="!$v.admin.email.required">Email is required</span>
            <span class="md-error" v-if="!$v.admin.email.email">Email is invalid</span>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
              <md-input name="password" id="password" type="password" v-model="admin.password" required></md-input>
            <span class="md-error" v-if="!$v.admin.password.required">Password is required</span>
          </md-field>
        </div>


        </md-card-content>
        <md-card-actions>
          <md-button class="md-primary" id="adminButton" @click="goToAdmin()">Back to Admin</md-button>
          <md-button class="md-primary" id="submitButton" @click="onSubmit(admin)">Submit Details</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>

/**
   *
   * Imports for validating fields above.
   * required --> the fields cannot be empty
   * email --> the field must be a valid email
   */
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

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

/**
   *
   * goToAdmin is a function used when the adminButton is clicked,
   * it switches the screen from AddAdmin.vue to Admin.vue
   * 
   */
    goToAdmin() {      
              this.$store.commit('setAdminDisplayMode', true);
              this.$store.commit('setAddAdminDisplayMode', false);      
    },

/**
   *
   * onSubmit is a function used when the submitButton is clicked,
   * 
   * @param newAdmin the admin that the user wants to add.
   * 
   */
    onSubmit(newAdmin) {
      this.$v.$touch();    
      if (!this.$v.$invalid) {
        this.$axios
        //posts admin if all fields are valid
          .post('http://localhost:8081/api/v1/admins', {
            username: newAdmin.username,
            name: newAdmin.name,
            email: newAdmin.email,
            password: newAdmin.password,
          })
          .then(() => {
            //switches the screen from AddAdmin.vue to Admin.vue
            this.$store.commit('setAdminDisplayMode', true);
            this.$store.commit('setAddAdminDisplayMode', false);   
          });
      }
    },
  },

  /**
   *
   * validations enforces the fields that are required and also the 
   * email validation
   * 
   */
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
        email,
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
