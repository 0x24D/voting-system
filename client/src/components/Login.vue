<template>
  <div id="login">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">Username</label>
                <md-input name="username" id="username"
                  v-model="username" required/>
                <span class="md-error" v-if="!$v.username.required">
                    Please enter your username</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password"
                  v-model="password" required/>
                <span class="md-error" v-if="!$v.password.required">
                    Please enter your password</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary"
            @click="loginSubmit(username, password)">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  mixins: [validationMixin],
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    // eslint-disable-next-line
    getValidationClass(fieldName) {
      const field = this.$v[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    loginSubmit(username, password) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/authentication/login', {
            username, password,
          })
          .then((authRes) => {
            localStorage.token = authRes.data.token;
            this.$axios
              .get(`http://localhost:8081/api/v1/users/${username}`)
              .then((userRes) => {
                localStorage.user = userRes.data._id;
                localStorage.type = userRes.data.__t;
                window.location.reload();
              });
          });
      }
    },
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
};
</script>

<style scoped>
form {
  width: -webkit-fill-available;
  width: -moz-available;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
