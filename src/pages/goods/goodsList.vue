<template>
    商品搜索：<el-input style="width: 200px;" v-model="searchData.title" clearable  />
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="title" label="书名" />
      <el-table-column label="图片">
        <template #default="{ row }">
          <img :src="row.cover_url" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit">编辑</el-button>
          <el-button @click="goodsDetail(row.id)"
            >详情</el-button
          >
        </template> </el-table-column
      >
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="changePage" />
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watchEffect } from "vue";
import { getGoods,getGoodsDetail } from "../../http/goods";
import { allgoodsItf, goodsItf } from "../../types/goods";
const data = reactive<{
  searchData: allgoodsItf;
  tableData: goodsItf[];
  total:number
}>({
  searchData: {},
  tableData: [],
  total:0
});
const { searchData, tableData,total } = toRefs(data);
//获取商品列表
const getAllGoods = () => {
  getGoods(searchData.value)
    .then((res) => {
      console.log(res);
      tableData.value = res.data;
      total.value=res.meta.pagination.total
    })
    .catch((err) => {
      console.log(err);
    });
};
getAllGoods();

//编辑商品
const handleEdit = () => {};
//商品详情
const goodsDetail = (id: number) => {
  console.log(id);
  getGoodsDetail(id).then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log(err);
  })
};
//换页
const changePage=(page:number)=>{
    console.log(page);
    searchData.value.current=page
    getAllGoods()
}
const antiShake=(keywords:string)=>{
    return setTimeout(()=>{
        if(keywords!==undefined){
            getAllGoods()
        }
    },1000)
}
watchEffect((onInvalidate)=>{
    const timer = antiShake(searchData.value.title as string)
    onInvalidate(()=>clearTimeout(timer))
})

</script>

<style lang="less" scoped>
img {
  width: 60px;
}
</style>
