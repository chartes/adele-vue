<template>
  <div class="m-b-xl">
    <div class="subtitle heading has-text-info">
      Avancement du dossier
    </div> 
    <div class="steps">
      <div
        v-if="isTranscriptionValidated"
        class="step-item is-completed"
      >
        <div class="step-marker">
          <span class="icon">
            <i class="fa fa-check" />
          </span>
        </div>
        <div class="step-details">
          Transcription 
        </div>
      </div>
      <div
        v-else
        class="step-item"
      >
        <div class="step-marker" />
        <div class="step-details">
          Transcription 
        </div>
      </div>

  
      <div
        v-if="isTranslationValidated"
        class="step-item is-completed"
      >
        <div class="step-marker">
          <span class="icon">
            <i class="fa fa-check" />
          </span>
        </div>
        <div class="step-details">
          Traduction 
        </div>
      </div>
      <div
        v-else
        class="step-item"
      >
        <div class="step-marker" />
        <div class="step-details">
          Traduction 
        </div>
      </div>


      <div
        v-if="isCommentariesValidated"
        class="step-item is-completed"
      >
        <div class="step-marker">
          <span class="icon">
            <i class="fa fa-check" />
          </span>
        </div>
        <div class="step-details">
          Commentaires 
        </div>
      </div>
      <div
        v-else
        class="step-item"
      >
        <div class="step-marker" />
        <div class="step-details">
          Commentaires 
        </div>
      </div>


      <div
        v-if="isFacsimileValidated"
        class="step-item is-completed"
      >
        <div class="step-marker">
          <span class="icon">
            <i class="fa fa-check" />
          </span>
        </div>
        <div class="step-details">
          Facsimilé 
        </div>
      </div>
      <div
        v-else
        class="step-item"
      >
        <div class="step-marker" />
        <div class="step-details">
          Facsimilé 
        </div>
      </div>


      <div
        v-if="isSpeechPartsValidated"
        class="step-item is-completed"
      >
        <div class="step-marker">
          <span class="icon">
            <i class="fa fa-check" />
          </span>
        </div>
        <div class="step-details">
          Parties du discours 
        </div>
      </div>
      <div
        v-else
        class="step-item"
      >
        <div class="step-marker" />
        <div class="step-details">
          Parties du discours
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'WorkflowSteps',
    components: {
        
    },
    props: {
        document: {type: Object, default: null}
    },
    computed: {
        isTranscriptionValidated() {
            return this.document.validation_step >= 1
        },
        isTranslationValidated() {
            return this.document.validation_step >= 2
        },
        isCommentariesValidated() {
            return this.document.validation_step >= 3
        },
        isFacsimileValidated() {
            return this.document.validation_step >= 4
        },
        isSpeechPartsValidated() {
            return this.document.validation_step >= 5
        }
    }
}
</script>