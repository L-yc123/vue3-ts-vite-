<template>
  <div class="common-layout">
    <el-container>
      <el-header>头部</el-header>
      <el-container>
        <el-aside width="200px"><layoutaside /></el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import layoutaside from '../components/layoutCom/layoutAside.vue'

</script>

<style lang="less" scoped>

</style>