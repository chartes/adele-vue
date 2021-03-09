<template>
  <div class="landing-page">
    <div class="top">
      <div class="columns">
        <div class="column themes">
          <div class="content">
            <p class="column-title">
              À découvrir
            </p>
            <ul>
              <li>
                <div
                  class="document-card card featured"
                  @click="goToFeature(featuredCollections[0])"
                >
                  <div class="card-header" />
                  <div class="card-image">
                    <figure class="image is-3by1">
                      <img
                        src="https://iiif.chartes.psl.eu/images/adele/dossiers/27.jpg/full/500,/0/default.jpg"
                        alt="Placeholder image"
                      >
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <p class="title">
                        Expansion et diversification formelle des chirographes
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div
                  class="document-card card featured"
                  @click="goToFeature(featuredCollections[1])"
                >
                  <div class="card-header" />
                  <div class="card-image">
                    <figure class="image is-3by1">
                      <img
                        src="https://iiif.chartes.psl.eu/images/adele/dossiers/34.jpg/full/500,/0/default.jpg"
                        alt="Placeholder image"
                      >
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <p class="title">
                        Naissance d’une bureaucratie paperassière: les documents du contrôle comptable
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div
                  class="document-card card featured"
                  @click="goToFeature(featuredCollections[2])"
                >
                  <div class="card-header" />
                  <div class="card-image">
                    <figure class="image is-3by1">
                      <img
                        src="https://iiif.chartes.psl.eu/images/adele/dossiers/24.jpg/full/500,/0/default.jpg"
                        alt="Placeholder image"
                      >
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <p class="title">
                        Le modèle royal de l’acte princier en France
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div
                  class="document-card card featured"
                  @click="goToFeature(featuredCollections[3])"
                >
                  <div class="card-header" />
                  <div class="card-image">
                    <figure class="image is-3by1">
                      <img
                        src="https://iiif.chartes.psl.eu/images/adele/dossiers/20.jpg/full/500,/0/default.jpg"
                        alt="Placeholder image"
                      >
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <p class="title">
                        La pression des vernaculaires au XIII<sup>e</sup> siècle
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-half">
          <h1>Bienvenue</h1>          
          <p class="intro">
            Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
            proposer à un public d’étudiants et de chercheurs un manuel de diplomatique progressivement construit autour du déchiffrement
            interactif, de l’annotation, si besoin de la traduction et enfin de l’analyse diplomatique d’actes et de
            documents de gestion. Appuyée sur un outil de mise au point collaborative des dossiers, en classe ou par des chercheurs
            associés, elle est dès l’origine conçue pour dilater le champ de vision de son noyau primitif (actes médiévaux français) dans
            l’espace dans le type et dans le temps.
          </p>

          <nav class="navbar inner-navbar know-more">
            <router-link
              :to="{name: 'documentation', params: {section: 'projet'}}"
              class="navbar-item"
            >
              En savoir plus
            </router-link>
            <router-link
              :to="{name: 'search'}"
              class="button consult"
            >
              Consulter les dossiers
            </router-link>
          </nav>
          
          <div class="intro-cards">
            <div class="card">
              <div class="card-image">
                <img
                  src="../assets/images/accueil_illus01.svg"
                  alt=""
                >
              </div>
              <div class="card-content">
                <div class="card-title">
                  Un album européen de diplomatique en construction<div class="card-subtitle">
                    conçu pour favoriser les apprentissages et le comparatisme
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-image">
                <img
                  src="../assets/images/accueil_illus02.svg"
                  alt=""
                >
              </div>
              <div class="card-content">
                <div class="card-title">
                  Un outil collaboratif de saisie et d'analyse pour l'enseignement <div class="card-subtitle">
                    accompagnant les nouvelles curiosités de la diplomatique
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-image">
                <img
                  src="../assets/images/accueil_illus03.svg"
                  alt=""
                >
              </div>
              <div class="card-content">
                <div class="card-title">
                  De multiples capacités de tri permettant de créer des sous-corpus à volonté<div class="card-subtitle">
                    permettant de créer des sous-corpus à volonté
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column documents">
          <div class="content">
            <p class="column-title">
              Nouveaux dossiers
            </p>
            <ul>
              <li
                v-for="doc in documents"
                :key="doc.id"
              >
                <document-card :doc="doc" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <logos />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DocumentCard from '../components/document/DocumentCard.vue';
import Logos from '../components/Logos.vue';

export default {
    name: "LandingPage",
    components: {
      DocumentCard,
      Logos    
    },
    data() {
      return {
        featuredCollections: [
          {
            title: 'Expansion et diversification formelle des chirographes',
            filters:{
              availableCommentaries: [],
              acteTypes: [],
              centuries: [],
              copyCenturies: [],
              countries: [],
              creationRange: [
              
              ],
              districts: [],
              institutions: [],
              languages: [
                
              ],
              traditions: [8],
            }
          },
          {
            title: 'Naissance d’une bureaucratie paperassière: les documents du contrôle comptable ',
            filters: {
              availableCommentaries: [],
              acteTypes: [7],
              centuries: [],
              copyCenturies: [],
              countries: [],
              creationRange: [
                1300, 1500
              ],
              districts: [],
              institutions: [],
              languages: [
                
              ],
              traditions: [],
            }
          },
          {
            title: 'Le modèle royal de l’acte princier en France',
            filters: {
              availableCommentaries: [],
              acteTypes: [20,21],
              centuries: [],
              copyCenturies: [],
              countries: [1],
              creationRange: [
              
              ],
              districts: [],
              institutions: [],
              languages: [
                
              ],
              traditions: [],
            }
          },
          {
            title: 'La pression des vernaculaires au XIII<sup>e</sup> siècle',
            filters: {
              availableCommentaries: [],
              acteTypes: [],
              centuries: [],
              copyCenturies: [],
              countries: [],
              creationRange: [
                1200,
                1300
              ],
              districts: [],
              institutions: [],
              languages: [
                "oci", "fre"
              ],
              traditions: [],
            }
          }
        ]
      }
    },
    computed: {
      ...mapState('document', ['documents', 'loading'])
    },
    async created() {
      await this.fetchLastItems()
    },
    methods: {
      ...mapActions('document', ['fetchLastItems']),
      goToFeature(collection) {
        console.log(collection)
        this.$store.dispatch('search/set', {
          title: collection.title,
          filters: collection.filters
        }) ;
        this.$router.push({name: 'search'})
      }
    }
}
</script>

<style>

</style>