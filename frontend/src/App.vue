<template>
  <div id="app">
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="Dashboard">Dashboard</el-menu-item>
      <el-menu-item index="Questions">Questions</el-menu-item>
      <el-menu-item index="InterviewPlanList">InterviewPlanList</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
import router from './router';

export default {
  name: 'App',
  methods: {
    handleSelect(key) {
      router.push(key);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
