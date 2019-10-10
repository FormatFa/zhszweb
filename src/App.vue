<template>
<el-container>

  <el-header>
    <Logo></Logo>
  </el-header>


  <el-main>
     <router-view></router-view>
  </el-main>


</el-container>
</template>

<script>

import Logo from './components/Logo.vue'
export default {
  name: 'app',
  components: {
    Logo
  }
}
</script>

<style>


</style>
