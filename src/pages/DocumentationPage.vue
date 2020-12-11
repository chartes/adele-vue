<template>
  <div class="container landing-page">
    <div class="top">
      <div class="columns">
        <div class="column is-3 themes">
          <div class="content">
            <p class="column-title">
              Dossiers thématiques
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
        <div class="column">
          <h1>Bienvenue</h1>
          <p class="intro">
            Développée par l’École nationale des chartes avec le soutien de Scripta et du DIM Ile-de-France, l’application ADELE entend
            proposer à un public d’étudiants et de chercheurs un manuel de diplomatique progressivement construit autour du déchiffrement
            interactif, de l’annotation, si besoin de la traduction et enfin de l’analyse diplomatique d’actes et de
            documents de gestion. Appuyée sur un outil de mise au point collaborative des dossiers, en classe ou par des chercheurs
            associés, elle est dès l’origine conçue pour dilater le champ de vision de son noyau primitif (actes médiévaux français) dans
            l’espace, le temps, le type.
          </p>
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
    created() {
     
    },
    methods: {
     
    }
}
</script>

<style lang="scss" scoped>

</style>