<template>
  <div class="container documentation-page">
    <div class="top">
      <div class="columns">
        <div class="column is-3 themes">
          <div class="content">
            <p class="column-title">
              Documentation
            </p>
            <ul>
              <li>
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Accueil</p>
                  </div>
                  <div class="card-content">
                    <ul class="doc-tabs">
                      <li
                        id="about"
                        @click="goTo('about')"
                      >
                        À propos
                      </li>
                      <li
                        id="contact"
                        @click="goTo('contact')"
                      >
                        Contact
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Référentiels de données</p>
                  </div>
                  <div class="card-content">
                    <ul class="doc-tabs">
                      <li
                        id="speech-parts"
                        @click="goTo('speech-parts')"
                      >
                        Parties du discours
                      </li>
                      <li
                        id="institutions"
                        @click="goTo('institutions')"
                      >
                        Institutions
                      </li>
                      <li
                        id="langs"
                        @click="goTo('langs')"
                      >
                        Langues des documents
                      </li>
                      <li
                        id="places"
                        @click="goTo('places')"
                      >
                        Pays & lieux identifiés
                      </li>
                      <li
                        id="persons"
                        @click="goTo('persons')"
                      >
                        Personnes identifiées
                      </li>
                      <li
                        id="commentaries"
                        @click="goTo('commentaries')"
                      >
                        Types de commentaires
                      </li>
                      <li
                        id="acte-types"
                        @click="goTo('acte-types')"
                      >
                        Types d'acte
                      </li>
                      <li
                        id="dates"
                        @click="goTo('dates')"
                      >
                        Dates 
                      </li>
                      <li
                        id="facsimile"
                        @click="goTo('facsimile')"
                      >
                        Images & facsimilés
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div
            v-if="$attrs.section === 'about' || $attrs.section === null"
          >
            <h1>À propos</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'contact'"
          >
            <h1>Contact</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'speech-parts'"
          >
            <h1>Parties du discours</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'institutions'"
          >
            <h1>Institutions</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'langs'"
          >
            <h1>Langues des documents</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'places'"
          >
            <h1>Pays & lieux identifiés</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'persons'"
          >
            <h1>Personnes identifiées</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'commentaries'"
          >
            <h1>Types de commentaire</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'acte-types'"
          >
            <h1>Types d'acte</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'dates'"
          >
            <h1>Dates</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          <div
            v-if="$attrs.section === 'facsimile'"
          >
            <h1>Images & facsimilés</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: "DocumentationPage",
    components: {
    },
    computed: {
    },
    mounted() {
        document.querySelectorAll('.active').forEach(element => {
          element.classList.remove('active')
        });
        const activeSection = document.querySelector('#' + this.$route.params.section)
        if (activeSection) {
          activeSection.classList.add('active');
        }    },
    methods: {
     goTo(section) {
       if (section !=  this.$route.params.section) {
        document.querySelectorAll('.active').forEach(element => {
          element.classList.remove('active')
        });
        const activeSection = document.querySelector('#' + section)
        if (activeSection) {
          activeSection.classList.add('active');
        }
        this.$router.push({name: 'documentation', params: {section: section}})
        }
     }
    }
}
</script>

<style lang="scss" scoped>
  .content {
    min-height: 100vh;
  }
</style>