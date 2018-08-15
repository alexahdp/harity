<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <form
          :currentQuestion="currentQuestion"
          v-on:submit.prevent="onSubmit(currentQuestion)"
        >

          <VueTagsInput
            v-model="tag"
            :autocomplete-items="filteredItems"
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
      </div>

      <div class="col-md-6">
        <h4>Questions list...</h4>
        <ul>
          <li
            class="list-group-item"
            v-for="question in questionList"
            :key="question._id"
          >
            <div class="text-right">
              <span
                class="badge badge-success"
                v-for="label in question.labels"
                :key="label"
              >
                {{label}}
              </span>
            </div>

            <p class="text-left">{{question.text}}</p>

            <div class="text-right">
              <span
                @click="onEdit(question._id)"
                class="badge badge-primary badge-pill book-close-btn"
                >edit</span>
              <span
                @click="onRemove(question._id)"
                class="badge badge-primary badge-pill book-close-btn"
                >remove</span>
              </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'Questions',
  components: {
    VueTagsInput,
  },
  computed: {
    ...mapGetters('questions', ['currentQuestion', 'questionList', 'tagList']),
    filteredItems() {
      return this.tagList
        .filter(i => new RegExp(this.tag, 'i').test(i.text));
    },
  },
  created() {
    this.$store.dispatch('questions/fetchQuestions');
    this.$store.dispatch('questions/fetchTags');
  },
  data() {
    return {
      tag: '',
    };
  },
  methods: {
    onSubmit(currentQuestion) {
      this.$store.dispatch('questions/saveQuestion', currentQuestion);
    },
    onRemove(questionId) {
      this.$store.dispatch('questions/removeQuestion', questionId);
    },
    onEdit(questionId) {
      this.$store.dispatch('questions/editQuestion', questionId);
    },
    onCancel() {
      this.$store.dispatch('questions/unsetCurrent');
    },
  },
};
</script>

<style scoped>

</style>
