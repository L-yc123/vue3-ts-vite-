<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="activeIndex"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        unique-opened
        router
      >
      <el-menu-item @click="handelClick" index="/home">首页</el-menu-item>
        <el-sub-menu
          v-for="(item, index) in menus"
          :key="item.id"
          :index="`${index}`"
        >
          <template #title>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
          @click="handelClick"
            :index="'/'+item.name+'/'+innerItem.name"
            v-for="innerItem in item.children"
            :key="innerItem.id"
            >{{ innerItem.title }}</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed,ref } from "vue";
import { useStore } from "vuex";
interface MenuObj {
  parentId: number;
  id: number;
  title: string;
  children?: MenuObj[];
  name: string;
}
interface newMenus {
  [key: number]: MenuObj;
}
interface routerItf{
  index:string
}
const store = useStore();
const menus = computed<newMenus>(() => store.getters.getNewMenus);
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const activeIndex=ref<string>(sessionStorage.getItem('activeRouter')||'')
const handelClick = (key: routerItf) => {
  activeIndex.value=key.index
  sessionStorage.setItem('activeRouter',key.index)
};
</script>

<style lang="less" scoped></style>
