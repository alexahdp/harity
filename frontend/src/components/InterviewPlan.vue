<template>
<el-container style="justify-content: center">
  <el-row type="flex" justify="center">
    <el-col :span="24">

      <el-input
        placeholder="title"
        v-model="interviewPlan.title"
        @change="resetTitleError"
      ></el-input>

      <el-alert
        v-if="titleValidationError"
        title="Area is required"
        type="error"
      ></el-alert>

      <br />

      <el-transfer
        id="createInterviewPlan-form"
        :titles="['Backlog', 'For interview']"
        :data="questions"
        style="width: 1200px"
        v-model="interviewPlan.questions"
        filterable
      />

      <br />
      <el-button
        type="success"
        @click="onSave()"
      >Save</el-button>

    </el-col>
  </el-row>
</el-container>
</template>


<script>
import { mapGetters } from 'vuex';

// http://element.eleme.io/#/en-US/component/transfer
// http://element.eleme.io/#/en-US/component/layout

export default {
  name: 'CreateInterviewPlan',

  components: {
  },

  computed: {
    ...mapGetters('questions', ['questionList']),
    ...mapGetters('interviewPlan', ['interviewPlan']),
    questions() {
      return this.questionList.map(question => ({
        key: question._id,
        label: `${question.text}::${question.labels.map(label => label.text).join('/')}`,
      }));
    },
  },

  created() {
    if (this.$route.params.id) {
      this.$store.dispatch('interviewPlan/get', { _id: this.$route.params.id });
    }

    this.$store.dispatch('questions/fetchQuestions');
  },

  data() {
    return {
      titleValidationError: null,
    };
  },

  methods: {
    resetAllErrors() {
    },

    resetTitleError() {
      this.titleValidationError = null;
    },

    onSave() {
      if (!this.interviewPlan.title) {
        this.titleValidationError = 'Error, title is required';
        return;
      }

      this.$store.dispatch('interviewPlan/save', {
        interviewPlan: this.interviewPlan,
        questionList: this.questionList,
      });
    },
  },
};
</script>

<style>
  #createInterviewPlan-form .el-transfer-panel {
    width: 550px;
  }
</style>
