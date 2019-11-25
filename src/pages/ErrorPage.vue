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
            return this.error && this.error.response.data.errors ? `${this.error.response.status}: ${this.error.response.data.errors.title}` : 'Erreur'
        },
        details() {
            return this.error &&  this.error.response.data.errors ? this.error.response.data.errors.details : 'Oups! Une erreur inconnue est survenue.'
        }
    }
}
</script>