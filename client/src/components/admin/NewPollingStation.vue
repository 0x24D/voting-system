<template>
  <div id="newPollingStation">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">New Polling Station</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('address')">
                <label for="address">Address</label>
                <md-select name="campaigns" id="campaigns"
                  v-model="pollingStation.address" md-dense required>
                  <md-option v-for="address in addresses"
                    :key="address._id" :value="address._id">
                    {{ address.line_one }}, {{ address.postcode }}
                  </md-option>
                </md-select>

                <span class="md-error" v-if="!$v.pollingStation.address.required">
                    Address is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-primary" id="submitButton"
          @click="newPollingStationSubmit(pollingStation)">Submit</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'NewCampaign',
  mixins: [validationMixin],
  data() {
    return {
      pollingStation: {
        address: '',
      },
      addresses: [],
    };
  },
  /**
  * Call addresses API endpoint to get all addresses and
  * store in the addresses data property.
  */
  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/addresses')
      .then((response) => {
        this.addresses = response.data;
      });
  },
  methods: {
    /**
    * Get class name to display validation state.
    *
    * @param fieldName the field name to get the class for
    * @return the class name for the field
    */
    // eslint-disable-next-line
    getValidationClass(fieldName) {
      const field = this.$v.pollingStation[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    /**
    * Check to see if the form is valid, if it is send the data to the server.
    *
    * @param formData the form data to be sent to the server
    */
    newSystemSubmit(formData) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/pollingStations/', {
            address: formData.address,
          })
          .then(() => {
            this.$store.commit('setSetupDisplayMode', false);
          });
      }
    },
  },
  validations: {
    pollingStation: {
      address: {
        required,
      },
    },
  },
};
</script>
