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
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Notices</p>
                  </div>
                  <div class="card-content">
                    <p>Risus turpis, at commodo neque dictum eget. Nullam pretium suscipit sagittis. Proin ac consectetur metus, quis ultrices nisl.</p>
                  </div>
                </div>
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Documents féodaux</p>
                  </div>
                  <div class="card-content">
                    <p>Pellentesque interdum libero diam, facilisis pulvinar mi aliquam at.</p>
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
              En savoir plus sur le projet
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
                  Un album européen de diplomatique en construction<span class="card-subtitle">conçu pour favoriser les apprentissages et le comparatisme</span>
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
                  Un outil collaboratif de saisie et d'analyse pour l'enseignement <span class="card-subtitle">accompagnant les nouvelles curiosités de la diplomatique</span>
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
                  De multiples capacités de tri permettant de créer des sous-corpus à volonté<span class="card-subtitle">permettant de créer des sous-corpus à volonté</span>
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
              <li>
                <a href="#">
                  <div class="document-card card">
                    <div class="card-header" />
                    <div class="card-image">
                      <figure class="image is-3by1">
                        <img
                          src="https://iiif.chartes.psl.eu/images/adele/dossiers/20.jpg/full/800,/0/default.jpg"
                          alt="Placeholder image"
                        >
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="content">
                        <p class="title">Acte sous le sceau de l’officialité épiscopale de Beauvais</p>
                        <p class="subtitle">Une opération de remembrement&nbsp;: la vente à l’abbaye Saint-Germer-de-Fly d’une terre tenue à champart test</p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a>
                  <div class="document-card card">
                    <div class="card-header" />
                    <div class="card-image">
                      <figure class="image is-3by1">
                        <img
                          src="https://iiif.chartes.psl.eu/images/adele/dossiers/39.jpg/full/800,/0/default.jpg"
                          alt="Placeholder image"
                        >
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="content">
                        <p class="title">Acte sous les sceaux de l’officialité archidiaconale de Verdun et d’un seigneur (Lorraine)</p>
                        <p class="subtitle">Un montage féodal complexe : reprises et cessions d’un fief épiscopal en cascade</p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="logos">
        Logos Scripta, ENC DIM stcn et de la commission internationale de diplomatique
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: "LandingPage",
    components: {
    },
    computed: {
    },
    created() {
     
    },
    methods: {
     
    }
}
</script>

<style>

</style>