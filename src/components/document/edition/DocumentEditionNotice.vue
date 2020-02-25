<template>
  <div>
    <div class="content">
      <div class="columns">
        <div class="column is-two-fifths">
          <!-- titre -->
          <div class="field">
            <label class="label">Titre</label>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    v-model="document.title"
                    class="input"
                    type="text"
                    placeholder="Mandement du roi de France Philippe V"
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- sous-titre -->
          <div class="field">
            <label class="label">Sous titre</label>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    v-model="document.subtitle"
                    class="input"
                    type="text"
                    placeholder="Une seigneurie difficile à tenir"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="is-divider" />
          <!-- année de création -->
          <div class="columns">
            <div class="column is-half">
              <div class="field">
                <label class="label">Année de création (pour le tri)</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        v-model="document.creation"
                        class="input"
                        type="text"
                        placeholder="1200"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Année de la copie (formatée)</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        v-model="document.copy_year"
                        class="input"
                        type="text"
                        placeholder="[1200-1210 ca.]"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Institution de conservation</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <select
                        v-model="document.institution_id"
                        class="select"
                        style="width: 300px"
                      >
                        <option :value="null">
                          Non définie
                        </option>
                        <option
                          v-for="institution in institutions"
                          :key="institution.id"
                          :value="institution.id"
                        >
                          {{ institution.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Année de création (formatée)</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        v-model="document.creation_lab"
                        class="input"
                        type="text"
                        placeholder="[1200-1210 ca.]"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Siècle de de la copie</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <select
                        v-model="document.copy_cent"
                        class="select"
                      >
                        <option :value="null">
                          Non défini
                        </option>
                        <option
                          v-for="(val, cent) in centuries"
                          :key="cent"
                          :value="cent"
                        >
                          {{ val }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Côte de conservation</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        v-model="document.pressmark"
                        class="input"
                        type="text"
                        placeholder="nouv. acq. fr. 8761"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="is-divider" />
          <!-- regeste -->
          <div class="field">
            <p class="control">
              <label class="label">Regeste</label>
            </p>
            <div class="editor-area">
              <div
                ref="controls"
                class="editor-controls m-b-sm"
              >
                <editor-button
                  :selected="buttons.bold"
                  :active="editorHasFocus"
                  :callback="simpleFormat"
                  :format="'bold'"
                />
                <editor-button
                  :selected="buttons.italic"
                  :active="editorHasFocus"
                  :callback="simpleFormat"
                  :format="'italic'"
                />
                <editor-button
                  :selected="buttons.superscript"
                  :active="editorHasFocus"
                  :callback="simpleFormat"
                  :format="'superscript'"
                />
                <editor-button
                  :selected="buttons.smallcaps"
                  :active="editorHasFocus"
                  :callback="simpleFormat"
                  :format="'smallcaps'"
                />
                <editor-button
                  :selected="buttons.underline"
                  :active="editorHasFocus"
                  :callback="simpleFormat"
                  :format="'underline'"
                />
                <editor-button
                  :selected="buttons.del"
                  :active="editorHasFocus"
                  :callback="simpleFormat"
                  :format="'del'"
                />
              </div>

              <div
                ref="editor"
                class="quill-editor"
                spellcheck="false"
              />
            </div>
            <argument-action-bar class="m-t-sm is-pulled-right" />
          </div>
        </div>
        <div class="is-divider-vertical m-sm" />

        <div class="column">
          <div class="columns">
            <div class="column">
              <div>
                <div class="select-with-tags">
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
                <div class="select-with-tags">
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
                <div class="select-with-tags">
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
            <div class="column">
              <div class="select-with-tags">
                <p class="subtitle">
                  Tradition(s)
                </p>
                <select-with-tags-input
                  default-text="Ajouter une tradition"
                  :choices="allTraditionsChoices"
                  :selection="selectedTraditions"
                  :on-change="onTraditionsChange"
                />
              </div>
              <div class="select-with-tags">
                <p class="subtitle">
                  Type(s) d'acte
                </p>
                <select-with-tags-input
                  default-text="Ajouter un type d'acte"
                  :choices="allActeTypesChoices"
                  :selection="selectedActeTypes"
                  :on-change="onActeTypesChange"
                />
              </div>
              <div class="select-with-tags">
                <p class="subtitle">
                  Éditeur(s)
                </p>
                <select-with-tags-input
                  default-text="Ajouter un éditeur"
                  :choices="allEditorsChoices"
                  :selection="selectedEditors"
                  :on-change="onEditorsChange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex'
import SelectWithTagsInput from './SelectWithTagsInput.vue'
import EditorMixins from '../../../mixins/EditorMixins'
import EditorButton from "../../editors/EditorButton"
import ArgumentActionBar from '../edition/actionbars/ArgumentActionBar'
import { getNewQuill } from '../../../modules/quill/AdeleQuill'

export default {
    name: "DocumentEditionNotice",
    components: {
       SelectWithTagsInput,
       EditorButton,
       ArgumentActionBar,
    },
    mixins: [EditorMixins],
    props: {
        //document: {type: Object, default: null}
    },
    data() {
      return {
          centuries: {
            1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
            6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X',
            11: 'XI', 12: 'XII', 13: 'XIII', 14: 'XIV', 15: 'XV',
            16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX', 20: 'XX'
          },
          status: 'normal',
          buttons: {
            bold: false,
            italic: false,
            superscript: false,
            smallcaps: false,
            underline: false,
            del: false,
          },
      }
    },
    async beforeCreate() {
      Promise.all([
        this.$store.dispatch('languages/fetch'), 
        this.$store.dispatch('countries/fetch'),
        this.$store.dispatch('districts/fetch'),
        this.$store.dispatch('traditions/fetch'),
        this.$store.dispatch('acteTypes/fetch'),
        this.$store.dispatch('editors/fetch'),
        this.$store.dispatch('institutions/fetch')
      ])
    },
    mounted() {
      this.$refs.editor.innerHTML = this.document.argument;
      this.editor = getNewQuill(this.$refs.editor);
      this.editor.on('selection-change', this.onSelection);
      this.editor.on('selection-change', this.onFocus);
      this.editor.on('text-change', this.onTextChange);
      this.textLength = this.editor.getLength();
    },
    computed: {
        ...mapState('document', ['loading', 'document']),
        ...mapState('languages', ['languages']),
        ...mapState('countries', ['countries']),
        ...mapState('districts', ['districts']),
        ...mapState('traditions', ['traditions']),
        ...mapState('acteTypes', ['acteTypes']),
        ...mapState('editors', ['editors']),
        ...mapState('institutions', ['institutions']),

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
        },

        allTraditionsChoices() {
          let choices = {}
          for (let item of this.traditions) {
            choices[item.id] = item.label
          }
          return choices
        },
        selectedTraditions() {
          let choices = {}
          for (let key in this.document.traditions) {
            choices[this.document.traditions[key].id] = this.document.traditions[key].label
          }
          return choices
        },

        allActeTypesChoices() {
          let choices = {}
          for (let item of this.acteTypes) {
            choices[item.id] = item.label
          }
          return choices
        },
        selectedActeTypes() {
          let choices = {}
          for (let key in this.document.acte_types) {
            choices[this.document.acte_types[key].id] = this.document.acte_types[key].label
          }
          return choices
        },

        allEditorsChoices() {
          let choices = {}
          for (let item of this.editors) {
            choices[item.ref] = item.name
          }
          return choices
        },
        selectedEditors() {
          let choices = {}
          for (let key in this.document.editors) {
            choices[this.document.editors[key].ref] = this.document.editors[key].name
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
            return this.$store.dispatch("document/save", {
              docId: this.document.id,
              data: {language_code: Object.keys(langs)}
            })
        },
        onPaysChange(countries) {
            return this.$store.dispatch("document/save", {
              docId: this.document.id,
              data: {country_ref: Object.keys(countries)}
            })
        },
        onDistrictsChange(districts) {
            return this.$store.dispatch("document/save", {
              docId: this.document.id,
              data: {district_id: Object.keys(districts)}
            })
        },
        onTraditionsChange(traditions) {
            return this.$store.dispatch("document/save", {
              docId: this.document.id,
              data: {tradition_id: Object.keys(traditions)}
            })
        },
        onActeTypesChange(acteTypes) {
            return this.$store.dispatch("document/save", {
              docId: this.document.id,
              data: {acte_type_id: Object.keys(acteTypes)}
            })
        },
        onEditorsChange(editors) {
            return this.$store.dispatch("document/save", {
              docId: this.document.id,
              data: {editor_ref: Object.keys(editors)}
            })
        },
        onTextChange (delta, oldDelta, source) {
            return this.$store.dispatch("document/partialUpdate", {
              argument: this.$refs.editor.childNodes[0].innerHTML
            })
        },
    }
}
</script>

<style>
  .select-with-tags {
    margin-top: 10px;
    margin-bottom: 28px;
    
  }
</style>