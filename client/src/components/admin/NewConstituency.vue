<template>
  <div id="newConstituency">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">New Constituency</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Constituency name</label>
                <md-input name="name" id="name" v-model="constituency.name" required/>
                <span class="md-error" v-if="!$v.constituency.name.required">
                    Constituency name is required</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('minimum_age')">
                <label for="minimum_age">Minimum age</label>
                <md-input name="minimum_age" id="minimum_age"
                  v-model="constituency.minimum_age" required/>
                  <span class="md-error" v-if="!$v.constituency.minimum_age.required">
                      Minimum age is required</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('voting_system')">
                <label for="voting_system">Voting system</label>
                <md-input name="voting_system" id="voting_system"
                  v-model="constituency.voting_system" required/>
                  <span class="md-error" v-if="!$v.constituency.voting_system.required">
                      Voting system is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-primary" id="submitButton"
          @click="newConstituencySubmit(constituency)">Submit</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'NewConstituency',
  mixins: [validationMixin],
  data() {
    return {
      constituency: {
        name: '',
        minimum_age: '',
        voting_system: '',
      },
    };
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
      const field = this.$v.constituency[fieldName];
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
    newConstituencySubmit(formData) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/constituencies/', {
            name: formData.name,
            minimum_age: formData.minimum_age,
            voting_system: formData.voting_system,
          })
          .then(() => {
            this.$store.commit('setSetupDisplayMode', false);
          });
      }
    },
  },
  validations: {
    constituency: {
      name: {
        required,
      },
      minimum_age: {
        required,
      },
      voting_system: {
        required,
      },
    },
  },
};
</script>
