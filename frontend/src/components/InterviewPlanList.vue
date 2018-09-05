<template>
<el-container style="justify-content: center">
  <el-row type="flex" justify="center">
    <el-col :span="24">
      <h2>Interview Plans:</h2>

        <el-table
          :data="list"
          style="width: 100%"
        >
          <el-table-column
            prop="title"
            label="Title"
            width="180">
          </el-table-column>

          <el-table-column
            prop="createdAt"
            label="createdAt"
            width="180">
          </el-table-column>

          <el-table-column
           fixed="right"
           label="operations"
           width="160"
          >
           <template slot-scope="scope">
             <el-button @click="handleOpen(scope)" type="text" size="small">Details</el-button>
             <el-button @click="handleEdit(scope)" type="text" size="small">Edit</el-button>
             <el-button @click="handleRemove(scope)" type="text" size="small">Remove</el-button>
          </template>
          </el-table-column>

      </el-table>

      <el-button type="success" @click="create()" >Create</el-button>
    </el-col>
  </el-row>
</el-container>
</template>


<script>
import { mapGetters } from 'vuex';
import router from '../router';

export default {
  name: 'InterviewPlanList',

  components: {
  },

  computed: {
    ...mapGetters('interviewPlan', ['list']),
  },

  created() {
    this.$store.dispatch('interviewPlan/fetchList');
  },

  methods: {
    handleOpen({ row }) {
      this.$store.dispatch('interviewPlan/preview', { _id: row._id });
    },
    handleEdit({ row }) {
      this.$store.dispatch('interviewPlan/edit', { _id: row._id });
    },
    handleRemove({ row }) {
      this.$store.dispatch('interviewPlan/remove', { _id: row._id });
    },
    create() {
      this.$store.dispatch('interviewPlan/create');
      router.push('/interviewPlan');
    },
  },
};
</script>

<style>
</style>
