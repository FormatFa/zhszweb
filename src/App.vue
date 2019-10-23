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
   /* background-color:#d1dbee;   */
}
html,
body {
  cursor: url("./images/kk.png"), pointer;
}
/* .chart {
width: 100%;
 border: 2px solid #a9b4c2; 
 box-shadow:0 0 13px #000 inset;  
} */
</style>
