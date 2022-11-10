<template>
    <el-button type="primary" @click="addCategory">添加分类</el-button>
  <el-table
    :data="tableData"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
  >
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="status" label="状态">
        <template #default="{row}">
            <el-switch
            v-model="row.is_locked"
            active-text="禁用"
            inactive-text="正常"
            @change="changeStatus(row.id)"
          />
        </template>
    </el-table-column>
    <el-table-column label="操作">
        <template #default="{row}">
            <el-button type="primary" @click="toDetail(row.id)">详情</el-button>
        </template>
    </el-table-column>
  </el-table>
  <addCategoryVue :dialogVisible="dialogVisible" @handleClose="handleClose" />
  <detailVue :detailData="detailData" @handleDetailClose="handleDetailClose" :visible="visible" />
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { getList,updateCategoryStatus,getDetail } from "../../http/category";
import { categoryItf,detailItf } from "../../types/category";
import addCategoryVue from "./components/addCategory.vue";
import detailVue from "./components/detail.vue";
const data = reactive<{
  tableData: categoryItf[];
  dialogVisible:boolean,
  visible:boolean,
  detailData:detailItf
}>({
  tableData: [],
  dialogVisible:false,
  visible:false,
  detailData:{}
});
const { tableData,dialogVisible,detailData,visible } = toRefs(data);
const getData = () => {
  getList()
    .then((res:any) => {
      console.log(res);
    res.map(item=>{
      item.is_locked=item.status===true? true:false
    })
      tableData.value = res;
    })
    .catch((err) => {
      console.log(err);
    });
};
getData();
//更改分类状态
const changeStatus=(id:number)=>{
    console.log(id);
    updateCategoryStatus(id).then(res=>{
        console.log(res);
        
    }).catch(err=>{
        console.log(err);
    })
}
//添加分类
const addCategory=()=>{
    dialogVisible.value=true
}
const handleClose=()=>{
    dialogVisible.value=false
}

//分类详情
const toDetail=(id:number)=>{
  getDetail(id).then(res=>{
    console.log(res);
    detailData.value=res
    visible.value=true
  }).catch(err=>{
    console.log(err);
  })
}
const handleDetailClose=()=>{
    visible.value=false
}
</script>

<style scoped></style>
