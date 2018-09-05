<template>
  <el-container style="justify-content: center">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <h3>{{interviewPlan.title}}</h3>
        <h4>Questions:</h4>
        <ul>
          <li v-for="question in interviewPlan.questions">
            <p>{{question.text}}</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'InterviewPlanPreview',
  computed: {
    ...mapGetters('interviewPlan', ['interviewPlan']),
  },
  created() {
    this.$store.dispatch('interviewPlan/get', { _id: this.$route.params.id });
  },
};
</script>
