<template>
  <div class="container">
    <div class="row">

      <div class="col-md-6">
        <QuestionForm v-bind:currentQuestion="currentQuestion" />
      </div>

      <div class="col-md-6">
        <h4>Questions list...</h4>
        <QuestionList
          v-bind:question-list="questionList"
        />
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuestionList from './questions/list';
import QuestionForm from './questions/form';

export default {
  name: 'Questions',
  components: {
    QuestionList,
    QuestionForm,
  },
  computed: {
    ...mapGetters('questions', ['currentQuestion', 'questionList']),
  },
  created() {
    this.$store.dispatch('questions/fetchQuestions');
    this.$store.dispatch('questions/fetchTags');
  },

  methods: {
  },
};
</script>

<style scoped>

</style>
