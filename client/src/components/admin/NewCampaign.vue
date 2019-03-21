<template>
  <div id="newCampaign">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">New Campaign</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Campaign name</label>
                <md-input name="name" id="name" v-model="campaign.name" required/>
                <span class="md-error" v-if="!$v.campaign.name.required">
                    Campaign name is required</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('type')">
                <label for="type">Campaign type</label>
                <md-input name="type" id="type" v-model="campaign.campaign_type" required/>
                <span class="md-error" v-if="!$v.campaign.campaign_type.required">
                    Campaign type is required</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('start_date')">
                <label for="start_date">Start date</label>
                <md-datepicker name="start_date" id="start_date" v-model="startDate" required/>
                <span class="md-error" v-if="!$v.campaign.start_date.required">
                    Campaign start date is required</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('end_date')">
                <label for="end_date">End date</label>
                <md-datepicker name="end_date" id="end_date" v-model="endDate" required/>
                <span class="md-error" v-if="!$v.campaign.end_date.required">
                    Campaign end date is required</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('candidates')">
                <label for="candidates">Candidates</label>
                <md-select name="candidates" id="candidates"
                  v-model="campaign.candidates" md-dense required multiple>
                  <md-option v-for="candidate in candidates"
                    :key="candidate._id" :value="candidate._id">
                    {{ candidate.name }}
                  </md-option>
                  <span class="md-error" v-if="!$v.campaign.candidates.required">
                      Campaign candidates is required</span>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('constituencies')">
                <label for="constituencies">Constituencies</label>
                <md-select name="constituencies" id="constituencies"
                  v-model="campaign.constituencies" md-dense required multiple>
                  <md-option v-for="constituency in constituencies"
                    :key="constituency._id" :value="constituency._id">
                    {{ constituency.name }}
                  </md-option>
                  <span class="md-error" v-if="!$v.campaign.constituencies.required">
                      Campaign constituencies is required</span>
                </md-select>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-primary" id="submitButton"
          @click="newCampaignSubmit(campaign)">Submit</md-button>
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
      campaign: {
        name: '',
        candidates: [],
        campaign_type: '',
        active: '',
        constituencies: [],
        start_date: new Date(Date.now()).toISOString(),
        end_date: null,
      },
      candidates: [],
      constituencies: [],
    };
  },
  /**
    * Call candidates and constituencies API endpoints to get all
    * candidates and constituencies, store these in the relevant data properties.
    */
  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/candidates/')
      .then((response) => {
        this.candidates = response.data;
      });
    this.$axios
      .get('http://localhost:8081/api/v1/constituencies/')
      .then((response) => {
        this.constituencies = response.data;
      });
  },
  computed: {
    /**
    * Covert the campaign's start date to the required formats.
    *
    * @param date the date to set
    * @return the campaign start date in date format
    */
    startDate: {
      get() {
        return this.campaign.start_date ? new Date(this.campaign.start_date) : null;
      },
      set(date) {
        this.campaign.start_date = date ? new Date(date).toISOString() : null;
      },
    },
    /**
    * Covert the campaign's end date to the required formats.
    *
    * @param date the date to set
    * @return the campaign end date in date format
    */
    endDate: {
      get() {
        return this.campaign.end_date ? new Date(this.campaign.end_date) : null;
      },
      set(date) {
        this.campaign.end_date = date ? new Date(date).toISOString() : null;
      },
    },
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
      const field = this.$v.campaign[fieldName];
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
    newCampaignSubmit(formData) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/campaigns/', {
            name: formData.name,
            campaign_type: formData.campaign_type,
            start_date: formData.start_date,
            end_date: formData.end_date,
            candidates: formData.candidates,
            constituencies: formData.constituencies,
          })
          .then(() => {
            this.$store.commit('setSetupDisplayMode', false);
          });
      }
    },
  },
  validations: {
    campaign: {
      name: {
        required,
      },
      candidates: {
        required,
      },
      campaign_type: {
        required,
      },
      constituencies: {
        required,
      },
      start_date: {
        required,
      },
      end_date: {
        required,
      },
    },
  },
};
</script>
