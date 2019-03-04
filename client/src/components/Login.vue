<template>
  <div class="Login">
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Login</h1>
      </md-toolbar>
      <form id="form" novalidate @submit.prevent="validateLogin(form)">
        <md-field :class="getValidationClass('email')">
          <label>Email</label>
          <md-input name="email" type="email" v-model="form.email"/>
          <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
          <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
        </md-field>
        <md-field :class="getValidationClass('password')">
          <label>Password</label>
          <md-input name="password" type="password" v-model="form.password"/>
          <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
        </md-field>

        <md-button type="submit" class="md-raised md-primary">Login</md-button>
      </form>
    </md-card>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
    name: 'Login',
    mixins: [validationMixin],
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        };
    },
    validations: {
        form: {
            email: {
                required,
                email,
            },
            password: {
                required,
            },
        },
    },
    methods: {
        // set the field to have the invalid styling if invalid or dirty
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName];

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty,
                };
            }
        },
        validateLogin(form) {
            this.$v.$touch();
            
        // make sure none of the fields are invalid
            if (!this.$v.$invalid) {
                // if none of them are invalid proceed with login
                this.submitLogin(form.email, form.password);
            }
        },
        submitLogin(email, password) {
            this.$axios
                // post to the api with the email and password so login can be processed
                .post('http://localhost:3030/login', {
                    email,
                    password,
                })
                .then((response) => {
                    // if a token is returned
                    if (response.data.token) {
                        // store token in browser storage
                        localStorage.token = response.data.token;
                        // navigate to the all files screen
                        window.location.href = '/files/';
                    } else {
                        alert('Incorrect Login Details');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert('Login Failed');
                });
        },
    },
};
</script>

<style lang="scss" scoped>
#form {
  padding: 10px 100px;
}
.Login {
  padding: 50px 500px;
}
</style>
