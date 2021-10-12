/* eslint-disable vue/max-attributes-per-line */
<template>
  <div class="documentation-page">
    <div class="top">
      <div class="columns main-columns">
        <div class="column main-column is-2 themes">
          <div class="content">
            <p class="column-title">
              Documentation
            </p>
            <nav>
              <section class="">
                <header>
                  <h2>Accueil</h2>
                </header>
                <ul class="doc-tabs">
                  <li
                    id="about"
                    @click="goTo('about')"
                  >
                    À propos
                  </li>
                  <li
                    id="projet"
                    @click="goTo('projet')"
                  >
                    Le projet
                  </li>
                  <li
                    id="contact"
                    @click="goTo('contact')"
                  >
                    Contact
                  </li>
                  <li
                    id="credits"
                    @click="goTo('credits')"
                  >
                    Crédits
                  </li>
                </ul>
              </section>
         
              <section>
                <header>
                  <h2>Référentiels de données</h2>
                </header>
                <ul class="doc-tabs">
                  <li
                    id="dates"
                    @click="goTo('dates')"
                  >
                    Dates
                  </li>
                  <li
                    id="conservation"
                    @click="goTo('conservation')"
                  >
                    Lieux de conservation
                  </li>
                  <li
                    id="speech-parts"
                    @click="goTo('speech-parts')"
                  >
                    Parties du discours
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
                    id="tradition"
                    @click="goTo('tradition')"
                  >
                    Traditions
                  </li>
                  <li
                    id="acte-types"
                    @click="goTo('acte-types')"
                  >
                    Types d'auteurs et de documents
                  </li>
                  <li
                    id="commentaries"
                    @click="goTo('commentaries')"
                  >
                    Types de commentaires
                  </li>
                </ul>
              </section>
            </nav>
          </div>
        </div>
        <div class="column content-column documentation">
          <!--
          <div
            v-if="$attrs.section === 'facsimile'"
          >
            <h1>Images & facsimilés</h1>
            <p>
              Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
              proposer à un public d’étudiants...
            </p>
          </div>
          -->
          <section v-if="$attrs.section === 'about' || $attrs.section === null">
            <documentation-about />
          </section>
          <section v-if="$attrs.section === 'projet' || $attrs.section === null">
            <documentation-project />
          </section>
          <section v-if="$attrs.section === 'credits' || $attrs.section === null">
            <documentation-credits />
          </section>
          <section v-if="$attrs.section === 'acte-types'">
            <documentation-acte-types />
          </section>
          <section v-if="$attrs.section === 'speech-parts'">
            <documentation-speechparts />
          </section>
          <section v-if="$attrs.section === 'contact'">
            <documentation-contact />
          </section>
          <section v-if="$attrs.section === 'conservation'">
            <documentation-conservation />
          </section>
          <section v-if="$attrs.section === 'places'">
            <documentation-places />
          </section>
          <section v-if="$attrs.section === 'persons'">
            <documentation-persons />
          </section>
          <section v-if="$attrs.section === 'commentaries'">
            <documentation-commentaries />
          </section>
          <section v-if="$attrs.section === 'tradition'">
            <documentation-traditions />
          </section>
          <section v-if="$attrs.section === 'dates'">
            <documentation-dates />
          </section>
        </div>
      </div>
    </div>
    <div class="bottom">
      <logos />
    </div>
  </div>
</template>

<script>
import Logos from '../components/Logos.vue';
import DocumentationPlaces from '@/pages/documentation/DocumentationPlaces';
import DocumentationCredits from '@/pages/documentation/DocumentationCredits';
import DocumentationActeTypes from '@/pages/documentation/DocumentationActeTypes';
import DocumentationSpeechparts from '@/pages/documentation/DocumentationSpeechparts';
import DocumentationContact from '@/pages/documentation/DocumentationContact';
import DocumentationConservation from '@/pages/documentation/DocumentationConservation';
import DocumentationPersons from '@/pages/documentation/DocumentationPersons';
import DocumentationCommentaries from '@/pages/documentation/DocumentationCommentaries';
import DocumentationTraditions from '@/pages/documentation/DocumentationTraditions';
import DocumentationDates from '@/pages/documentation/DocumentationDates';
import DocumentationProject from "@/pages/documentation/DocumentationProject";
import DocumentationAbout from "@/pages/documentation/DocumentationAbout";

export default {
  name: "DocumentationPage",
  components: {
    Logos,
    DocumentationPlaces,
    DocumentationCredits,
    DocumentationActeTypes,
    DocumentationSpeechparts,
    DocumentationContact,
    DocumentationConservation,
    DocumentationPersons,
    DocumentationCommentaries,
    DocumentationTraditions,
    DocumentationDates,
    DocumentationProject,
    DocumentationAbout
  },
  computed: {},
  mounted() {
    document.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    const activeSection = document.querySelector(
      "#" + this.$route.params.section
    );
    if (activeSection) {
      activeSection.classList.add("active");
    }
  },
  methods: {
    goTo(section) {
      if (section != this.$route.params.section) {
        document.querySelectorAll(".active").forEach((element) => {
          element.classList.remove("active");
        });
        const activeSection = document.querySelector("#" + section);
        if (activeSection) {
          activeSection.classList.add("active");
        }
        this.$router.push({
          name: "documentation",
          params: { section: section },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
}
</style>
