<template>
  <modal-form
    :title="'Choisissez une zone'"
    :cancel="cancelAction"
    :submit="submitAction"
    :valid="!!selected"
  >
    <div class="ZoneForm">
      <a
        v-for="fragment in transcriptionFragments"
        :key="fragment.zone_id"
        class="zones-list-item list-item"
        :class="{ selected: fragment.zone_id == selected }"
        @click="selectItem(fragment.zone_id)"
      >
        <div class="content">
          <img :src="fragment.fragment_url">
        </div>
      </a>
    </div>
    <loading-indicator :active="loading" />
  </modal-form>
</template>

<script>

  import { mapGetters } from 'vuex'
  import ModalForm from './ModalForm';
  //import LoadingIndicator from '../ui/LoadingIndicator';

  export default {
    name: "FacsimileZoneListForm",
    components: {
      //LoadingIndicator,
      ModalForm
    },
    props: ['title', 'zoneId', 'cancel', 'submit'],
    data() {
      return {
        selected: null,
        loading: false
      }
    },
    mounted () {
      console.log('FacsimileZoneListForm mounted', this.zoneId)
      this.selected = this.zoneId
      this.loading = true
      this.$store.dispatch('facsimile/fetchFragments').then(() => { this.loading = false })
    },
    methods: {
      selectItem (zoneId) {
        this.selected = zoneId;
      },
      submitAction () {
        console.log("FacsimileZoneListForm.submitAction", this.selected)
        this.$props.submit(this.selected);
      },
      cancelAction () {
        this.$props.cancel();
      }
    },
    computed: {
      ...mapGetters('facsimile', ['transcriptionFragments'])
    }
  }
</script>
