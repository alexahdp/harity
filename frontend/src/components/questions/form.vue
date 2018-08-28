<template>
  <form
    :currentQuestion="currentQuestion"
    v-on:submit.prevent="onSubmit(currentQuestion)"
  >

    <VueTagsInput
      v-model="tag"
      v-bind:tags="currentQuestion.labels"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => currentQuestion.labels = newTags"
    />

    <div class="form-group">
      <textarea
        class="form-control"
        rows="3"
        v-model="currentQuestion.text"
      ></textarea>
    </div>

    <div class="form-group">
      <input type="submit" class="btn btn-primary" value="Save" />
      <input type="button" class="btn" value="Cancel" @click="onCancel()" />
    </div>
  </form>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import VueTagsInput from '@johmun/vue-tags-input';

export default Vue.component('question-form', {
  props: {
    currentQuestion: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters('questions', ['tagList']),
    filteredItems() {
      return this.tagList
        .filter(i => new RegExp(this.tag, 'i').test(i.text));
    },
  },

  components: {
    VueTagsInput,
  },

  methods: {
    onSubmit(currentQuestion) {
      this.$store.dispatch('questions/saveQuestion', currentQuestion);
    },
    onCancel() {
      this.$store.dispatch('questions/unsetCurrent');
    },
  },

  data() {
    return {
      tag: '',
    };
  },
});
</script>
