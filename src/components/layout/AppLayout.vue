<script setup lang="ts">
import AppAside from "./AppAside.vue";
import AppHeader from "./AppHeader.vue";
</script>


<template>
  <div class="common-layout">
    <el-container>
      <AppAside /> <!-- 侧边栏 -->
      <el-container class="header-and-main">
        <AppHeader /> <!-- 我来组成头部 -->
        <el-main>
          <el-scrollbar>
            <RouterView />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="scss" scoped>
.header-and-main {
  flex-direction: column;
  height: 100vh;
}

.el-main {
  background-color: white;
  padding-right: 0;
}
</style>
