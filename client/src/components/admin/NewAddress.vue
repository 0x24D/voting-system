<template>
  <div id="newAddress">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">New Address</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('line_one')">
                <label for="line_one">Line one</label>
                <md-input name="line_one" id="line_one" v-model="address.line_one" required/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('line_two')">
                <label for="line_two">Line two</label>
                <md-input name="line_two" id="line_two" v-model="address.line_two" required/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('town')">
                <label for="town">Town</label>
                <md-input name="town" id="town" v-model="address.town" required/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('county')">
                <label for="county">County</label>
                <md-input name="county" id="county" v-model="address.county" required/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('candidates')">
                <label for="country">Country</label>
                <md-input name="country" id="country" v-model="address.country" required/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('postcode')">
                <label for="postcode">Postcode</label>
                <md-input name="postcode" id="postcode" v-model="address.postcode" required/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('constituency')">
                <label for="constituency">Constituency</label>
                <md-select name="constituency" id="constituency"
                  v-model="address.constituency" md-dense required>
                  <md-option v-for="constituency in constituencies"
                    :key="constituency._id" :value="constituency._id">
                    {{ constituency.name }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-primary" id="submitButton"
          @click="newAddressSubmit(address)">Submit</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'NewAddress',
  mixins: [validationMixin],
  data() {
    return {
      address: {
        line_one: '',
        line_two: '',
        town: '',
        county: '',
        country: '',
        postcode: '',
        constituency: '',
      },
      constituencies: [],
    };
  },
  created() {
    this.$axios
      .get('http://localhost:8081/api/v1/constituencies/')
      .then((response) => {
        this.constituencies = response.data;
      });
  },
  methods: {
    // eslint-disable-next-line
    getValidationClass(fieldName) {
      const field = this.$v.address[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    newAddressSubmit(formData) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/addresses/', {
            line_one: formData.line_one,
            line_two: formData.line_two,
            town: formData.town,
            county: formData.county,
            country: formData.country,
            postcode: formData.postcode,
            constituency: formData.constituency,
          });
      }
    },
  },
  validations: {
    address: {
      line_one: {
        required,
      },
      line_two: {
        required,
      },
      town: {
        required,
      },
      county: {
        required,
      },
      country: {
        required,
      },
      postcode: {
        required,
      },
      constituency: {
        required,
      },
    },
  },
};
</script>
