<template>
  <div v-if="document">
    <div class="content">
      <div class="columns">
        <div class="column">
          <div class="field is-grouped is-grouped-multiline">
            <div class="control ">
              <div class="tags has-addons">
                <span class="tag is-dark">Langues</span>
                <span
                  v-for="lang in document.languages"
                  :key="lang.code"
                  class="tag"
                >{{ lang.label }}</span>
              </div>
            </div>
            <div
              v-for="country in document.countries"
              :key="country.id"
            >
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag is-dark">Pays</span>
                  <span class="tag">{{ country.label }}, {{ filterDistricts(country.id) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-dark">Traditions</span>
                <span
                  v-for="tradition in document.traditions"
                  :key="tradition.id"
                  class="tag"
                >{{ tradition.label }}</span>
              </div>
            </div>
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
          </div>
        </div>
        
        <div class="column" />
      </div>
    </div>

    <div>
      <div>Date de l'acte : {{ document.creation_lab ? document.creation_lab : 'inconnue' }} </div>
      <div>Date du document : {{ document.copy_year ? document.copy_year : 'inconnue' }} </div>
      <div v-if="document.institution">
        Institution de conservation : <a :href="document.institution.ref">{{ document.institution.name }}</a>
      </div>
      <div v-else>
        Institution de conservation : inconnue
      </div>
      <div v-if="document.argument ">
        Argument : <div v-html="document.argument" />
      </div>
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