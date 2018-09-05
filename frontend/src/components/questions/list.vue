<template>
<el-table
  :data="this.questionList"
  style="width: 100%"
>
  <el-table-column
    prop="text"
    label="Text"
  />

  <el-table-column
    label="Labels"
    with="100"
    prop="labels"
    :filters="tags"
    :filter-method="filterTag"
    filter-placement="bottom-end"
  >
    <template slot-scope="scope">
      <el-tag
        v-for="tag in scope.row.labels"
        :key="tag.text"
        disable-transitions
      >
        {{tag.text}}
      </el-tag>
    </template>
  </el-table-column>

  <el-table-column
    fixed="right"
    label="operations"
    width="160"
  >
    <template slot-scope="scope">
      <el-button @click="onEdit(scope.row._id)" type="text" size="small">Edit</el-button>
      <el-button @click="onRemove(scope.row._id)" type="text" size="small">Remove</el-button>
    </template>
  </el-table-column>

</el-table>
</template>

<script>
import Vue from 'vue';

export default Vue.component('question-list', {
  props: {
    questionList: {
      type: Array,
      required: true,
    },
  },

  computed: {
    tags() {
      const uniqTags = new Set();
      this.questionList.forEach(question => {
        question.labels.forEach(label => uniqTags.add(label.text));
      });

      return Array.from(uniqTags).map(v => ({text: v, value: v}));
    },
  },

  methods: {
    onRemove(questionId) {
      this.$store.dispatch('questions/removeQuestion', questionId);
    },
    onEdit(questionId) {
      this.$store.dispatch('questions/editQuestion', questionId);
    },
    filterTag(tag, row) {
      return row.labels.some(label => label.text === tag);
    },
  },
});
</script>
