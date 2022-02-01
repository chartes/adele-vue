<template>
  <div class="container">
    <article class="message is-danger m-t-xxl">
      <div class="message-header">
        <p>{{ title }}</p>
      </div>
      <div class="message-body">
        {{ details }}
      </div>
    </article>
  </div>
</template>


<script>
export default {
    name: 'ErrorPage',
    components: {
        
    },
    props: {
        error: {type: Object, default: null}
    },
    computed: {
        title() {
          try {
            return `${this.error.response.status}: ${this.error.response.data.errors.title}`
          } catch(error) {
            return 'Erreur'
          }
        },
        details() {
          try {
            return this.error.response.data.errors.details
          } catch(error) {
            return 'Oups! Une erreur inconnue est survenue.'
          }
        }
    }
}
</script>