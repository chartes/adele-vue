<template>
  <div v-if="document">
    <div class="content">
      <ul class="tag-list">
        <li>
          <div class="tags has-addons">
            <span class="tag is-dark">Langues</span>
            <span
              v-for="(lang, i) in document.languages"
              :key="lang.code"
              class="tag"
            >{{ lang.label }}<span
              v-if="i < document.languages.length-1"
              style="white-space: pre"
            >, </span></span>
          </div>
        </li>
        <li
          v-for="country in document.countries"
          :key="country.id"
        >
          <div class="tags has-addons">
            <span class="tag is-dark">Pays</span>
            <span class="tag">{{ country.label }}, {{ filterDistricts(country.id) }}</span>
          </div>
        </li>
        <li
          v-if="document.traditions.length > 0"
          class="control"
        >
          <div class="tags has-addons">
            <span class="tag is-dark">Traditions</span>
            <span
              v-for="tradition in document.traditions"
              :key="tradition.id"
              class="tag"
            >{{ tradition.label }}</span>
          </div>
        </li>
        <li
          v-if="document.acte_types.length > 0"
        >
          <div class="tags has-addons">
            <span class="tag is-dark">Types d'auteurs et de documents</span>
            <span
              v-for="(acte_type, i) in document.acte_types"
              :key="acte_type.id"
              class="tag"
            >{{ acte_type.label }}<span
              v-if="i < document.acte_types.length-1"
              style="white-space: pre"
            >, </span></span>
          </div>
        </li>
        <li>
          <div class="tags has-addons">
            <span class="tag is-dark">Date de l’original</span>
            <span class="tag">{{ document.creation_lab ? document.creation_lab : 'inconnue' }}</span>
          </div>
        </li>
        <li>
          <div
            v-if="document.copy_year"
            class="tags has-addons"
          >
            <span class="tag is-dark">Date de l’état présenté</span>
            <span class="tag">{{ document.copy_year }}</span>
          </div>
        </li>
        <li v-if="document.institution">
          <div class="tags has-addons">
            <span class="tag is-dark">Institution de conservation</span>
            <span class="tag"><a :href="document.institution.ref">{{ document.institution.name }}</a></span>
          </div>
        </li>
        <li v-if="document.pressmark">
          <div class="tags has-addons">
            <span class="tag is-dark">Cote de conservation</span>
            <span class="tag">{{ document.pressmark ? document.pressmark : 'inconnue' }}</span>
          </div>
        </li>
        <li
          v-if="document.argument"
          style="margin-top: 20px"
        >
          <span class="tag is-dark">Argument</span>
          <div v-html="document.argument" />
        </li>
      </ul>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex';

export default {
    name: "DocumentNotice",
    components: {
        
    },
    props: {
        document: {type: Object, default: null}
    },
    computed: {
        ...mapState('document', ['loading']),
    },
    created() {
       
    },
    methods: {
        filterDistricts(country_id) {
            return this.document.districts.filter(d => d.country_id === country_id).map(d => d.label).join(' et ')
        }
    }
}
</script>

<style>

</style>