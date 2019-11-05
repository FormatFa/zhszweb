<template>
<div id="app">
  <vue-particles
        color="#CD5555"
        :particleOpacity="1"
        :particlesNumber="200"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="1"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
  <el-container style="position:absolute;top:0;width:100%; height: 100%">
    <el-header>
      <Logo></Logo>
    </el-header>

    <el-main >
      <router-view></router-view>
    </el-main>
  </el-container>
   
</div>
</template>

<script>
// import Canvas from "./api/canvas-nest.min.js";
import Logo from "./components/Logo.vue";
export default {
  name: "app",
  components: {
    Logo,
    
    // Canvas
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
