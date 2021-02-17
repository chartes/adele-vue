<template>
  <ul>
    <li>
      <div class="step">
        <validation-radio-icon
          class="validation-icon"
          :is-validated="validation.transcription"
          :is-content-empty="!exist.transcription"
        />
        <span class="step-label">Transcription</span>
      </div>
    </li>
    <li>
      <div class="step">
        <validation-radio-icon
          class="validation-icon"

          :is-validated="validation.translation"
          :is-content-empty="!exist.translation"
        />
        <span class="step-label">Traduction</span>
      </div>
    </li>
    <li>
      <div class="step">
        <validation-radio-icon
          class="validation-icon"
          :is-validated="exist['alignment-translation']"
          :is-content-empty="!exist['alignment-translation']"
        />
        <span class="step-label">Alignement</span>
      </div>
    </li>
    <li>
      <div class="step">
        <validation-radio-icon
          class="validation-icon"

          :is-validated="validation.facsimile"
          :is-content-empty="!exist.facsimile"
        />
        <span class="step-label">Facsimilé</span>
      </div>
    </li>
    <li>
      <div class="step">
        <validation-radio-icon
          class="validation-icon"

          :is-validated="validation.commentaries"
          :is-content-empty="!exist.commentaries"
        />
        <span class="step-label">Commentaires</span>
      </div>
    </li>
    <li>
      <div class="step">
        <validation-radio-icon
          class="validation-icon"
          :is-validated="validation['speech-parts']"
          :is-content-empty="!exist['speech-parts']"
        />
        <span class="step-label">Parties du discours</span>
      </div>
    </li>
  </ul>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import ValidationRadioIcon from '@/components/ui/ValidationRadioIcon.vue'
export default {
    name: 'WorkflowRadioStepsLight',
    components: {
      ValidationRadioIcon
    },
    props: {
      validation: {type: Object, required: true, default: () => {}},
      exist: {type: Object, required: true, default: () => {}},
    },
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
}
  .step-label {
  }
  .step {
  }
  .validation-icon {
  }
</style>