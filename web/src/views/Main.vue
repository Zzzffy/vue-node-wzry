<template>
  <div>
    <!-- 顶部 -->
    <div class="topbar bg-black d-flex px-3 py-2 ai-center">
      <img src="../assets/logo.png" height="30">
      <div class="flex-1 px-2">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>
    <!-- 导航栏 -->
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse jc-around text-white pb-1">
        <div class="nav-item active">
          <router-link to="/" class="nav-link" tag="div">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/" class="nav-link" tag="div">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/" class="nav-link" tag="div">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}

</style>