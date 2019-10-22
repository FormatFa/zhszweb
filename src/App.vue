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
import Canvas from "./api/canvas-nest.min.js";
import Logo from "./components/Logo.vue";
export default {
  name: "app",
  components: {
    Logo,
    Canvas
  }
};
</script>

<style>
html,
body {
  cursor: url("./images/mouse.png"), auto;
  background-color: #081951;
}
html,
body {
  cursor: url("./images/kk.png"), pointer;
}

</style>
