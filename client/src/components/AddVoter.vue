<template>
  <div id="voters">
    <form novalidate class="md-layout" @submit.prevent>
   <md-card class="md-layout-item md-size-100 md-small-size-100">
      <md-card-header>
        <div class="md-title">Add New Voter</div>
      </md-card-header>

    <md-card-content>
      <div class="md-layout-item md-small-size-100">
        <md-field :class="getValidationClass('username')">
          <label for="username">Username</label>
          <md-input name="username" id="username" v-model="voter.username" required></md-input>
          <span class="md-error" v-if="!$v.voter.username.required">Username is required</span>
        </md-field>
      </div>

      <div class="md-layout-item md-small-size-100">
        <md-field :class="getValidationClass('name')">
          <label for="name">Name</label>
            <md-input name="name" id="name" v-model="voter.name" required></md-input>
          <span class="md-error" v-if="!$v.voter.name.required">Name is required</span>
        </md-field>
      </div>

      <div class="md-layout-item md-small-size-100">
        <md-field :class="getValidationClass('email')">
          <label for="email">Email</label>
            <md-input name="email" id="email" type="email" v-model="voter.email" required></md-input>
          <span class="md-error" v-if="!$v.voter.email.required">Email is required</span>
          <span class="md-error" v-if="!$v.voter.email.email">Email is invalid</span>
        </md-field>
      </div>

      <div class="md-layout-item md-small-size-100">
        <md-field :class="getValidationClass('password')">
          <label for="password">Password</label>
            <md-input name="password" id="password" type="password" v-model="voter.password" required></md-input>
          <span class="md-error" v-if="!$v.voter.password.required">Password is required</span>
        </md-field>
      </div>

      <div class="md-layout-item md-small-size-100">
        <md-field :class="getValidationClass('date_of_birth')">
          <label for="date_of_birth">Date of Birth</label>
            <md-datepicker name="date_of_birth" id="date_of_birth" v-model="dateOfBirth" required/>
            <span class="md-error" v-if="!$v.voter.date_of_birth.required">Date of birth is required</span>
        </md-field>
      </div>

      <div class="md-layout-item md-small-size-100">
        <md-field :class="getValidationClass('address')">
          <label for="address">Address</label>

            <md-select v-model="voter.address" name="address" id="address"  md-dense required>
              <md-option v-for="ad in address" :key="ad._id" :value="ad._id">
                  {{ ad.postcode }}
              </md-option>
            </md-select>

          <span class="md-error" v-if="!$v.voter.address.required">Address is required</span>
        </md-field>
      </div>

      <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('polling_station')">
              <label for="polling_station">Polling Station</label>
                <md-select name="polling_station" id="polling_station" v-model="polling_station_address" md-dense required>
                  <md-option v-for="ad in addresses" :key="ad._id" :value="ad._id">
                    {{ ad.postcode }}
                  </md-option>
                </md-select>
              <span class="md-error" v-if="!$v.polling_station_address.required">Polling station is required</span>
            </md-field>
          </div>

        </md-card-content>
        <md-card-actions>
          <md-button class="md-primary" id="adminButton" @click="goToAdmin()">Back to Admin</md-button>
          <md-button class="md-primary" id="submitButton" @click="onSubmit(voter)">Submit Details</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

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
            date_of_birth: "",
            address: "",
            polling_station: '',
      },
      address: [],
      addresses: [],
      stations: [],
      polling_station_address: "",
    };
  },

/**
   *
   * The first address array is for the voters physical address, this is
   * stored in the voter object
   *
   * The created method also populates the addresses and stations array in order
   * to supply options for the polling station drop down in the form above.
   *
   */

    created() {
      this.$axios
        .get('http://localhost:8081/api/v1/addresses')
        .then((response) => {
          this.address = response.data;
        });

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
    computed: {
      dateOfBirth: {
        get () {
          return this.voter.date_of_birth ? new Date(this.voter.date_of_birth) : null;
        },
        set (date) {
          this.voter.date_of_birth = date ? new Date(date).toISOString() : null;
        }
      },
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

/**
   *
   * goToAdmin is a function used when the adminButton is clicked,
   * it switches the screen from AddVoter.vue to Admin.vue
   *
   */

    goToAdmin() {
              this.$store.commit('setAdminDisplayMode', true);
              this.$store.commit('setAddVoterDisplayMode', false);
    },

    /**
   *
   * onSubmit is a function used when the submitButton is clicked,
   *
   * @param newVoter the voter that the user wants to add.
   *
   */

    onSubmit(newVoter) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
      //retrieve station Id from selected address
        for (let station of this.stations) {
            if(this.polling_station_address === station.address)
              this.voter.polling_station = station._id;
              break;
        };
        this.$axios
        //posts voter if all fields are valid
          .post('http://localhost:8081/api/v1/voters', {
            username: newVoter.username,
            name: newVoter.name,
            email: newVoter.email,
            password: newVoter.password,
            date_of_birth: newVoter.date_of_birth,
            address: newVoter.address,
          })
          .then((voterRes) => {
            let systemId;
            this.$axios
            .get('http://localhost:8081/api/v1/systems')
            .then((systemsRes) => {
              for (let system of systemsRes.data){
                if (system.station === this.voter.polling_station) {
                  systemId = system._id;
                  break;
                }
              };
                this.$axios
                .put(`http://localhost:8081/api/v1/systems/${systemId}`, {
                  voter: voterRes.data._id
                })
                .then(() => {
                 //switches the screen from AddAuditor.vue to Admin.vue
                  this.$store.commit('setAdminDisplayMode', true);
                  this.$store.commit('setAddVoterDisplayMode', false);
                });
            });
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
    voter: {
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
      date_of_birth: {
        required,
      },
      address: {
        required,
      },
    },
    polling_station_address: {
        required,
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
