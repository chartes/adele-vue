<template>
  <div v-if="!loading">
    <div class="content">
      <ul class="tag-list">
        <li>
          <div class="tags has-addons">
            <span class="tag is-dark">Traditions</span>
            <span
              v-for="tradition in document.traditions"
              :key="tradition.id"
              class="tag"
            >{{ tradition.label }}</span>
          </div>
        </li>
        <li>
          <div
            v-if="document.acte_types.length > 0"
            class="control"
          >
            <div class="tags has-addons">
              <span class="tag is-dark">Type d'acte</span>
              <span
                v-for="acte_type in document.acte_types"
                :key="acte_type.id"
                class="tag"
              >{{ acte_type.label }}</span>
            </div>
          </div>
        </li>
      </ul>

      <div>
        <div>
          <p class="subtitle">
            Langue(s)
          </p>
          <select-with-tags-input
            default-text="Ajouter une langue"
            :choices="allLanguagesChoices"
            :selection="selectedLanguages"
            :on-change="onLanguagesChange"
          />
        </div>
        <div>
          <p class="subtitle">
            Pays
          </p>
          <select-with-tags-input
            default-text="Ajouter un pays"
            :choices="allCountriesChoices"
            :selection="selectedCountries"
            :on-change="onPaysChange"
          />
        </div>
        <div>
          <p class="subtitle">
            District(s)
          </p>
          <select-with-tags-input
            default-text="Ajouter un district"
            :choices="allDistrictChoices"
            :selection="selectedDistricts"
            :on-change="onDistrictsChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex'
import SelectWithTagsInput from './SelectWithTagsInput.vue'

export default {
    name: "DocumentEditionNotice",
    components: {
       SelectWithTagsInput
    },
    props: {
        document: {type: Object, default: null}
    },
    async beforeCreate() {
      Promise.all([
        this.$store.dispatch('languages/fetch'), 
        this.$store.dispatch('countries/fetch'),
        this.$store.dispatch('districts/fetch')
      ])
    },
    computed: {
        ...mapState('document', ['loading']),
        ...mapState('languages', ['languages']),
        ...mapState('countries', ['countries']),
        ...mapState('districts', ['districts']),

        allLanguagesChoices() {
          let choices = {}
          for (let item of this.languages) {
            choices[item.code] = item.label
          }
          return choices
        },
        selectedLanguages() {
          let choices = {}
          for (let key in this.document.languages) {
            choices[this.document.languages[key].code] = this.document.languages[key].label
          }
          return choices
        },

        allCountriesChoices() {
          let choices = {}
          for (let item of this.countries) {
            choices[item.ref] = item.label
          }
          return choices
        },
        selectedCountries() {
          let choices = {}
          for (let key in this.document.countries) {
            choices[this.document.countries[key].ref] = this.document.countries[key].label
          }
          return choices
        },

        allDistrictChoices() {
          let choices = {}
          for (let item of this.districts) {
            choices[item.id] = item.label
          }
          return choices
        },
        selectedDistricts() {
          let choices = {}
          for (let key in this.document.districts) {
            choices[this.document.districts[key].id] = this.document.districts[key].label
          }
          return choices
        }
    },
    created() {
       
    },
    methods: {
        filterDistricts(country_id) {
            return this.document.districts.filter(d => d.country_id === country_id).map(d => d.label).join(' et ')
        },
        onLanguagesChange(langs) {
            this.$store.dispatch("document/save", {
              docId: this.document.id,
              data: {language_code: Object.keys(langs)}
            })
        },
        onPaysChange(countries) {
            this.$store.dispatch("document/save", {
              docId: this.document.id,
              data: {country_ref: Object.keys(countries)}
            })
        },
        onDistrictsChange(districts) {
            this.$store.dispatch("document/save", {
              docId: this.document.id,
              data: {district_id: Object.keys(districts)}
            })
        }
    }
}
</script>

<style>

</style>