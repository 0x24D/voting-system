<template>
  <div id="adduser">
    <md-dialog id="dialog" :md-active="true">
      <md-tabs>
        <md-tab id="tab-admin" md-label="New Admin">
          <form novalidate class="md-layout" @submit.prevent>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('username')">
                  <label for="username">Username</label>
                    <md-input name="adminusername" id="adminusername"
                      v-model="admin.username" required></md-input>
                  <span class="md-error" v-if="!$v.admin.username.required">
                      Username is required</span>
                </md-field>

                <md-field :class="getValidationClass('name')">
                  <label for="name">Name</label>
                    <md-input name="adminname" id="adminname"
                      v-model="admin.name" required></md-input>
                  <span class="md-error" v-if="!$v.admin.name.required">
                      Name is required</span>
                </md-field>

                <md-field :class="getValidationClass('email')">
                  <label for="email">Email</label>
                    <md-input name="adminemail" id="adminemail" type="email"
                      v-model="admin.email" required></md-input>
                  <span class="md-error" v-if="!$v.admin.email.required">Email is required</span>
                  <span class="md-error" v-if="!$v.admin.email.email">Email is invalid</span>
                </md-field>

                <md-field :class="getValidationClass('password')">
                  <label for="password">Password</label>
                    <md-input name="adminpassword" id="adminpassword" type="password"
                      v-model="admin.password" required></md-input>
                  <span class="md-error" v-if="!$v.admin.password.required">
                      Password is required</span>
                </md-field>

                <md-button class="md-primary" id="submitAdminButton"
                  @click="onSubmitAdmin(admin)">Submit</md-button>
                <md-button class="md-primary" id="closeAdminButton"
                  @click="windowClose()">Close</md-button>
              </div>
          </form>
        </md-tab>
        <md-tab id="tab-auditor" md-label="New Auditor">
          <form novalidate class="md-layout" @submit.prevent>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('username')">
                  <label for="username">Username</label>
                    <md-input name="auditorusername" id="auditorusername"
                      v-model="auditor.username" required></md-input>
                  <span class="md-error" v-if="!$v.auditor.username.required">
                      Username is required</span>
                </md-field>

                <md-field :class="getValidationClass('name')">
                  <label for="name">Name</label>
                    <md-input name="auditorname" id="auditorname"
                      v-model="auditor.name" required></md-input>
                  <span class="md-error" v-if="!$v.auditor.name.required">Name is required</span>
                </md-field>

                <md-field :class="getValidationClass('email')">
                  <label for="email">Email</label>
                    <md-input name="auditoremail" id="auditoremail" type="email"
                      v-model="auditor.email" required></md-input>
                  <span class="md-error" v-if="!$v.auditor.email.required">Email is required</span>
                  <span class="md-error" v-if="!$v.auditor.email.email">Email is invalid</span>
                </md-field>

                  <md-field :class="getValidationClass('password')">
                    <label for="password">Password</label>
                      <md-input name="auditorpassword" id="auditorpassword" type="password"
                        v-model="auditor.password" required></md-input>
                    <span class="md-error" v-if="!$v.auditor.password.required">
                        Password is required</span>
                  </md-field>

                  <md-field :class="getValidationClass('polling_station')">
                    <label for="polling_station">Polling Station</label>
                      <md-select name="auditorpolling_station" id="auditorpolling_station"
                        v-model="auditor.polling_station" md-dense required>
                        <md-option v-for="address in addresses"
                          :key="address._id" :value="address._id">
                          {{ address.line_one }}, {{ address.postcode }}
                        </md-option>
                      </md-select>
                    <span class="md-error" v-if="!$v.auditor.polling_station.required">
                        Polling station is required</span>
                  </md-field>

                <md-button class="md-primary" id="submitAuditorButton"
                  @click="onSubmitAuditor(auditor)">Submit</md-button>
                <md-button class="md-primary" id="closeAuditorButton"
                  @click="windowClose()">Close</md-button>
            </div>
          </form>
        </md-tab>
        <md-tab id="tab-voter" md-label="New Voter">
            <form novalidate class="md-layout" @submit.prevent>

                <div class="md-layout-item md-medium-size-200 md-scrollbar">
                    <md-field :class="getValidationClass('username')">
                    <label for="username">Username</label>
                    <md-input name="voterusername" id="voterusername"
                      v-model="voter.username" required></md-input>
                    <span class="md-error" v-if="!$v.voter.username.required">
                        Username is required</span>
                    </md-field>

                    <md-field :class="getValidationClass('name')">
                    <label for="name">Name</label>
                        <md-input name="votername" id="votername"
                          v-model="voter.name" required></md-input>
                    <span class="md-error" v-if="!$v.voter.name.required">Name is required</span>
                    </md-field>

                    <md-field :class="getValidationClass('email')">
                    <label for="email">Email</label>
                        <md-input name="voteremail" id="voteremail" type="email"
                        v-model="voter.email" required></md-input>
                    <span class="md-error" v-if="!$v.voter.email.required">Email is required</span>
                    <span class="md-error" v-if="!$v.voter.email.email">Email is invalid</span>
                    </md-field>

                    <md-field :class="getValidationClass('password')">
                    <label for="password">Password</label>
                        <md-input name="voterpassword" id="voterpassword" type="password"
                        v-model="voter.password" required></md-input>
                    <span class="md-error" v-if="!$v.voter.password.required">
                        Password is required</span>
                    </md-field>

                    <md-field :class="getValidationClass('date_of_birth')">
                    <label for="date_of_birth">Date of Birth</label>
                        <md-datepicker name="voterdate_of_birth" id="voterdate_of_birth"
                        v-model="dateOfBirth" required/>
                        <span class="md-error" v-if="!$v.voter.date_of_birth.required">
                            Date of birth is required</span>
                    </md-field>

                    <md-field :class="getValidationClass('address')">
                    <label for="address">Address</label>

                        <md-select v-model="voter.address" name="vaddress"
                          id="voteraddress" md-dense required>
                            <md-option v-for="ad in addresses" :key="ad._id" :value="ad._id">
                                {{ ad.line_one }}, {{ ad.postcode }}
                            </md-option>
                        </md-select>

                    <span class="md-error" v-if="!$v.voter.address.required">
                        Address is required</span>
                    </md-field>

                    <md-field :class="getValidationClass('polling_station')">
                    <label for="polling_station">Polling Station</label>
                        <md-select name="voterpolling_station" id="voterpolling_station"
                        v-model="polling_station_address" md-dense required>
                        <md-option v-for="ad in addresses" :key="ad._id" :value="ad._id">
                        {{ ad.line_one }}, {{ ad.postcode }}
                        </md-option>
                        </md-select>
                    <span class="md-error" v-if="!$v.polling_station_address.required">
                        Polling station is required</span>
                    </md-field>

                    <md-button class="md-primary" id="submitVoterButton"
                      @click="onSubmitVoter(voter)">Submit</md-button>
                    <md-button class="md-primary" id="closeVoterButton"
                      @click="windowClose()">Close</md-button>
                </div>
            </form>
        </md-tab>
      </md-tabs>
    </md-dialog>
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
  name: 'AddUser',
  mixins: [validationMixin],
  data() {
    return {
      admin: {
        username: '',
        name: '',
        email: '',
        password: '',
      },
      auditor: {
        username: '',
        name: '',
        email: '',
        password: '',
        polling_station: '',
      },
      voter: {
        username: '',
        name: '',
        email: '',
        password: '',
        date_of_birth: '',
        address: '',
        polling_station: '',
      },
      addresses: [],
      stations: [],
      polling_station_address: '',
    };
  },

  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/pollingStations')
      .then((pollingRes) => {
        this.stations = pollingRes.data;
        this.$axios
          .get('http://localhost:8081/api/v1/addresses')
          .then((addressRes) => {
            this.addresses = addressRes.data;
          });
      });
  },

  computed: {
    dateOfBirth: {
      get() {
        return this.voter.date_of_birth ? new Date(this.voter.date_of_birth) : null;
      },
      set(date) {
        this.voter.date_of_birth = date ? new Date(date).toISOString() : null;
      },
    },
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

    windowClose() {
      this.$store.commit('setAddUserDisplayMode', false);
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
   * onSubmitAdmin is a function used when the submitButton is clicked,
   *
   * @param newAdmin the admin that the user wants to add.
   *
   */
    onSubmitAdmin(newAdmin) {
      this.$v.admin.$touch();
      if (!this.$v.admin.$invalid) {
        this.$axios
        // posts admin if all fields are valid
          .post('http://localhost:8081/api/v1/admins', {
            username: newAdmin.username,
            name: newAdmin.name,
            email: newAdmin.email,
            password: newAdmin.password,
          })
          .then(() => {
            // closes the dialog box
            this.$store.commit('setAddUserDisplayMode', false);
          });
      }
    },

    /**
   *
   * onSubmitAuditor is a function used when the submitButton is clicked,
   *
   * @param newAuditor the auditor that the user wants to add.
   *
   */
    onSubmitAuditor(newAuditor) {
      this.$v.auditor.$touch();
      if (!this.$v.auditor.$invalid) {
        // retrieve station Id from selected address
        const foundStation = this.stations.find(
          station => this.polling_station_address === station.address,
        );
        if (foundStation) {
          // eslint-disable-next-line
          newAuditor.polling_station = foundStation._id;
        }
        this.$axios
        // posts auditor if all fields are valid
          .post('http://localhost:8081/api/v1/auditors', {
            username: newAuditor.username,
            name: newAuditor.name,
            email: newAuditor.email,
            password: newAuditor.password,
            polling_station: newAuditor.polling_station,
          })
          .then(() => {
            // closes the dialog box
            this.$store.commit('setAddUserDisplayMode', false);
          });
      }
    },

    /**
   *
   * onSubmitVoter is a function used when the submitButton is clicked,
   *
   * @param newVoter the voter that the user wants to add.
   *
   */

    onSubmitVoter(newVoter) {
      this.$v.voter.$touch();
      if (!this.$v.voter.$invalid) {
      // retrieve station Id from selected address
        const foundStation = this.stations.find(
          station => this.polling_station_address === station.address,
        );
        if (foundStation) {
          this.voter.polling_station = foundStation._id;
        }
        this.$axios
        // posts voter if all fields are valid
          .post('http://localhost:8081/api/v1/voters', {
            username: newVoter.username,
            name: newVoter.name,
            email: newVoter.email,
            password: newVoter.password,
            date_of_birth: newVoter.date_of_birth,
            address: newVoter.address,
          })
          .then((voterRes) => {
            this.$axios
            // users the voterId with the subject and text
            // to the email endpoint to then send the email
              .post('http://localhost:8081/api/v1/email', {
                id: voterRes.data._id,
                subject: 'Registration Successful',
                text: 'Your Registration was successful!',
              })
              .then(() => {
                // closes the dialog box
                this.$store.commit('setAddUserDisplayMode', false);
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
#adduser {
  padding: 50px 100px;
}
</style>
