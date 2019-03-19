<template>
  <div id="addcandidateparty">
    <md-dialog id="dialog" :md-active="true">
      <md-tabs>
        <md-tab id="tab-candidate" md-label="New Candidate">
          <form novalidate class="md-layout" @submit.prevent>
            
           <div class="md-layout-item md-small-size-50">
            <md-field :class="getValidationClass('candidate','name')">
              <label for="name">Name</label>
                <md-input name="name" id="name" type="name" v-model="candidate.name" required></md-input>
              <span class="md-error" v-if="!$v.candidate.name.required">Name is required</span>
            </md-field>
          
            <md-field :class="getValidationClass('candidate','party')">
              <label for="party">Party</label>
              <md-select v-model="candidate.party" name="party" id="party">
                <md-option v-for="p in parties" :key="p._id" :value="p._id">
                  {{p.name}}
                </md-option>
              </md-select>
              <span class="md-error" v-if="!$v.candidate.party.required">Party is required</span>
            </md-field>
          
            <md-field :class="getValidationClass('candidate','description')">
              <label for="description">Description</label>
                <md-input name="description" id="description" type="description" v-model="candidate.description" required></md-input>
              <span class="md-error" v-if="!$v.candidate.description.required">Description is required</span>
            </md-field>
            <md-button class="md-primary" id="submitButton" @click="onSubmitCandidate(candidate)">Submit</md-button>
            <md-button class="md-primary" id="closeButton" @click="windowClose()">Close</md-button>
          </div>
          </form>
        </md-tab>

        <md-tab id="tab-party" md-label="New Party">
        <form novalidate class="md-layout" @submit.prevent>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('party','name')">
              <label for="name">Name</label>
                <md-input name="name" id="name" type="name" v-model="party.name" required></md-input>
              <span class="md-error" v-if="!$v.party.name.required">Name is required</span>
            </md-field>
          
            <md-field :class="getValidationClass('party','description')"> 
              <label for="description">description</label>
                <md-input name="description" id="description" type="description" v-model="party.description" required></md-input>
              <span class="md-error" v-if="!$v.party.description.required">description is required</span>
            </md-field>

            <md-button class="md-primary" id="submitButton" @click="onSubmitParty(party)">Submit</md-button>
            <md-button class="md-primary" id="closeButton" @click="windowClose()">Close</md-button>
          </div>

          </form>
        </md-tab>
      </md-tabs>
    </md-dialog>
  </div>
</template>

<script>

import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
  name: 'AddCandidateParty',
  mixins: [validationMixin],

  data() {
    return {
      party: {
            name: "",
            description: "",
      },
      candidate: {
            name: "",
            party: "",
            description: "",
      },
      parties: [],
    };
  },

/**
   *
   * The Created method obtains all of the parties in the database
   * These parties are then pushed into an array, later used for adding a new candidate
   * 
   */

  created() {
      this.$axios
        .get(`http://localhost:8081/api/v1/parties/`)
        .then((partyRes) => {
          partyRes.data.forEach((party) => {
              this.parties.push(
                party
            );   
          });
        });
  },
  methods: {

  /**
   *
   * getValidationClass validates the input from the user
   * @param model is a variable that tells the validation class whether it is validating the information for a candidate or a party
   * @param fieldName is the field which needs to be validated within either the candidate or the party
   * 
   */
  
  getValidationClass(model, fieldName) {
      const field = this.$v[model][fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },

     /**
    *
    * the windowClose function closes the dialog box by clicking a close button
    * 
    */
    
    windowClose() {
        this.$store.commit('setCandidatePartyDisplayMode', false);
    },

    /**
    *
    * onSubmitParty is a function that is called when submit is clicked on the add new party tab
    * @param newParty an object containing the information about the new party to be added to the database
    * 
    */

    onSubmitParty(newParty) {
      this.$v.party.$touch();    
      if (!this.$v.party.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/parties', {
            name: newParty.name,
            description: newParty.description,
          })
          .then(() => {
            this.$store.commit('setCandidatePartyDisplayMode', false);   
          });
      }
    },

    /**
    *
    * onSubmitCandidate is a function that is called when submit is clicked on the add new candidate tab
    * @param newCandidate an object containing the information about the new candidate to be added to the database
    * 
    */

    onSubmitCandidate(newCandidate) {
      this.$v.candidate.$touch();    
      if (!this.$v.candidate.$invalid) {
        this.$axios
          .post('http://localhost:8081/api/v1/candidates', {
            name: newCandidate.name,
            party: newCandidate.party,
            description: newCandidate.description,
          })
          .then(() => {
            this.$store.commit('setCandidatePartyDisplayMode', false);   
          });
      }
    },

  },

  validations: {
      party: {
        name: {
          required,
        },
        description: {
          required,
        },
      },
      candidate: {
        name: {
          required,
        },
        party: {
          required,
        },
        description: {
          required,
        },
      }
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