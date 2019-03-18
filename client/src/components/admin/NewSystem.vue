<template>
  <div id="newSystem">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">New System</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('campaigns')">
                <label for="campaigns">Campaigns</label>
                <md-select name="campaigns" id="campaigns"
                  v-model="system.campaigns" md-dense required multiple>
                  <md-option v-for="campaign in campaigns"
                    :key="campaign._id" :value="campaign._id">
                    {{ campaign.name }}
                  </md-option>
                </md-select>
                <span class="md-error" v-if="!$v.system.campaigns.required">
                    System campaigns is required</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('station')">
                <label for="station">Polling Station</label>
                <md-select name="station" id="station"
                  v-model="system.station" md-dense required>
                  <md-option v-for="station in stations"
                    :key="station._id" :value="station._id">
                    {{ station.address.postcode }}
                  </md-option>
                </md-select>
                <span class="md-error" v-if="!$v.system.station.required">
                    System polling station is required</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('voters')">
                <label for="voters">Voters</label>
                <md-select name="voters" id="voters"
                  v-model="system.voters" md-dense required multiple>
                  <md-option v-for="voter in voters"
                    :key="voter._id" :value="voter._id">
                    {{ voter.name }}
                  </md-option>
                </md-select>
                <span class="md-error" v-if="!$v.system.voters.required">
                    System voters is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-primary" id="submitButton"
          @click="newSystemSubmit(system)">Submit</md-button>
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
      system: {
        campaigns: [],
        station: '',
        voters: [],
      },
      campaigns: [],
      stations: [],
      voters: [],
    };
  },
  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/campaigns')
      .then((campaignsRes) => {
        this.campaigns = campaignsRes.data;
      });
    this.$axios
      .get('http://localhost:8081/api/v1/pollingStations')
      .then((stationsRes) => {
        const pollingStations = stationsRes.data;
        pollingStations.forEach((pollingStation) => {
          this.$axios
            .get(`http://localhost:8081/api/v1/addresses/${pollingStation.address}`)
            .then((addressesRes) => {
              // eslint-disable-next-line
              pollingStation.address = addressesRes.data;
            });
        });
        this.stations = pollingStations;
      });
    this.$axios
      .get('http://localhost:8081/api/v1/voters')
      .then((response) => {
        this.voters = response.data;
      });
  },
  methods: {
    // eslint-disable-next-line
    getValidationClass(fieldName) {
      const field = this.$v.system[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    newSystemSubmit(formData) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/systems/', {
            campaigns: formData.campaigns,
            station: formData.station,
            voters: formData.voters,
          });
      }
    },
  },
  validations: {
    system: {
      campaigns: {
        required,
      },
      station: {
        required,
      },
      voters: {
        required,
      },
    },
  },
};
</script>
