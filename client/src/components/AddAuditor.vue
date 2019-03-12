<template>
  <div id="auditors">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Add New Auditor</div>
        </md-card-header>

      <md-card-content>
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('username')">
            <label for="username">Username</label>
              <md-input name="username" id="username" v-model="auditor.username" required></md-input>
            <span class="md-error" v-if="!$v.auditor.username.required">Username is required</span>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('name')">
            <label for="name">Name</label>
              <md-input name="name" id="name" v-model="auditor.name" required></md-input>
            <span class="md-error" v-if="!$v.auditor.name.required">Name is required</span>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
              <md-input name="email" id="email" type="email" v-model="auditor.email" required></md-input>
            <span class="md-error" v-if="!$v.auditor.email.required">Email is required</span>
            <span class="md-error" v-if="!$v.auditor.email.email">Email is invalid</span>
          </md-field>
        </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password">Password</label>
                <md-input name="password" id="password" type="password" v-model="auditor.password" required></md-input>
              <span class="md-error" v-if="!$v.auditor.password.required">Password is required</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('polling_station')">
              <label for="polling_station">Polling Station</label>
                <md-select name="polling_station" id="polling_station" v-model="auditor.polling_station" md-dense required>
                  <md-option v-for="address in addresses" :key="address._id" :value="address._id">
                    {{ address.postcode }}
                  </md-option>
                </md-select>
              <span class="md-error" v-if="!$v.auditor.polling_station.required">Polling station is required</span>
            </md-field>
          </div>

        </md-card-content>
        <md-card-actions>
          <md-button class="md-primary" id="adminButton" @click="goToAdmin()">Back to Admin</md-button>
          <md-button class="md-primary" id="submitButton" @click="onSubmit(auditor)">Submit Details</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email} from 'vuelidate/lib/validators';

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
      stations: [],
      addresses: [],
    };
  },

  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/pollingStations')
        .then((pollingRes) => {
          this.stations = pollingRes.data;
          pollingRes.data.forEach((addressArr) => {
              this.$axios
              .get(`http://localhost:8081/api/v1/addresses/${addressArr.address}`)
              .then((res) => {
                this.addresses.push(res.data)
            });
          }); 
        });
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
        this.stations.forEach((station) => {
            if(newAuditor.polling_station === station.address)
              newAuditor.polling_station = station._id;
        });
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
        email,
      },
      password: {
        required,
      },
      polling_station: {
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
