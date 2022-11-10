<template>
  <mypie :data="state.mypie" />
  <mymap :data="state.mymap" />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {getAdminStat,getHomeData} from '../../http/api'
import mypie from './components/mypie.vue'
import mymap from './components/mymap.vue'

const state = reactive<{
  mypie:{}[],
  mymap:{}[]
}>({
  mypie:[],
  mymap:[]
})
getAdminStat().then(res=>{
  state.mypie=res.data.salePie
  state.mymap=res.data.saleMap
}).catch(err=>{
  console.log(err);
  
})
getHomeData().then(res=>{
  // console.log(res);
}).catch(err=>{
  console.log(err);
})

</script>

<style lang="less" scoped></style>
