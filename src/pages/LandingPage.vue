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
                        :src="featuredCollections[0].imgUrl"
                        alt="Placeholder image"
                      >
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <p
                        class="title"
                        v-html="featuredCollections[0].title"
                      />
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
                        :src="featuredCollections[1].imgUrl"
                        alt="Placeholder image"
                      >
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <p
                        class="title"
                        v-html="featuredCollections[1].title"
                      />
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
                        :src="featuredCollections[2].imgUrl"
                        alt="Placeholder image" 
                      >
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <p
                        class="title"
                        v-html="featuredCollections[2].title"
                      />
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
                        :src="featuredCollections[3].imgUrl"
                        alt="Placeholder image"
                      >
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <p
                        class="title"
                        v-html="featuredCollections[3].title"
                      />
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
                  De multiples capacités de tri<div class="card-subtitle">
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
            
            <draggable
              v-model="bookmarksTmpList"
              class="list-group"
              tag="ul"
              handle=".handle"
              v-bind="dragOptions"
              @start="drag = true"
              @end="dragEnd"
            >
              <transition-group
                type="transition"
                :name="!drag ? 'flip-list' : null"
              >
                <li
                  v-for="doc in bookmarksTmpList"
                  :key="doc.id"
                >
                  <document-card
                    :doc="doc"
                    @toggle-bookmark="refreshBookmarks"
                  >
                    <template v-slot:handle>
                      <span class="handle control ">
                        <button class="button is-small is-light">
                          <span class="icon is-small">
                            <i class="fas fa-grip-vertical" />
                          </span>
                        </button>
                      </span>
                    </template>
                  </document-card>
                </li>
              </transition-group>
            </draggable>
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
import draggable from "vuedraggable";

export default {
    name: "LandingPage",
    components: {
      DocumentCard,
      draggable,
      Logos    
    },
    data() {
      return {
        drag: false,
        dragOptions: {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost",
        },
        bookmarksTmpList: [],
        
        featuredCollections: [
          {
            title: 'Expansion et diversification formelle des chirographes',
            sorts: ['creation'],
            imgUrl: "https://iiif.chartes.psl.eu/images/adele/dossiers/27.jpg/full/500,/0/default.jpg",
            filters:{
              availableCommentaries: [],
              acteTypes: [],
              centuries: [],
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
            sorts: ['creation'],
            imgUrl: "https://iiif.chartes.psl.eu/images/adele/dossiers/34.jpg/full/500,/0/default.jpg",
            filters: {
              availableCommentaries: [],
              acteTypes: [7],
              centuries: [],
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
            sorts: ['creation'],
            imgUrl: "https://iiif.chartes.psl.eu/images/adele/dossiers/24.jpg/full/500,/0/default.jpg",
            filters: {
              availableCommentaries: [],
              acteTypes: [20,21],
              centuries: [],
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
            title: 'Documents propres à la diplomatie',
            sorts: ['creation'],
            imgUrl: "https://iiif.chartes.psl.eu/images/adele/dossiers/169.jpg/full/500,/0/default.jpg",
            filters: {
              availableCommentaries: [],
              acteTypes: [25],
              centuries: [],
              countries: [],
              creationRange: [
              ],
              districts: [],
              institutions: [],
              languages: [
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
      await this.refreshBookmarks()
    },
    methods: {
      ...mapActions('document', ['fetchBookmarks']),
      goToFeature(collection) {
        this.$store.dispatch('search/set', {
          title: collection.title,
          filters: collection.filters,
          sorts: collection.sorts
        }) ;
        this.$router.push({name: 'search'})
      },
      async dragEnd() {
        this.drag = false;
        await this.recomputeOrder();
      },
      async recomputeOrder() {
        this.bookmarksTmpList.forEach((element, i) => {
          element.bookmark_order = i + 1;
        });
        
        await this.$store.dispatch("document/reorderBookmarks", this.bookmarksTmpList);
        
        await this.refreshBookmarks()
      },
      async refreshBookmarks() {
        console.log('refresh bookmarks')
        await this.fetchBookmarks()
        this.bookmarksTmpList = this.documents
      }
    }
}
</script>

<style>

</style>