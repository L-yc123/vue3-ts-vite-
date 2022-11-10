<template>
    <el-dialog
    v-model="visible"
    title="详情"
    width="50%"
    :before-close="handleDetailClose"
  >
  <table>
      <tr>
          <td>Id</td>
          <td>{{detailData.id}}</td>
      </tr>
      <tr>
          <td>组名</td>
          <td>{{detailData.group}}</td>
      </tr>
      <tr>
          <td>级别</td>
          <td>{{detailData.level}}</td>
      </tr>
      <tr>
          <td>名称</td>
          <td>{{detailData.name}}</td>
      </tr>
      <tr>
          <td>排序</td>
          <td>{{detailData.seq}}</td>
      </tr>
      <tr>
          <td>状态</td>
          <td>{{detailData.status===0? '正常':'禁用'}}</td>
      </tr>
      <tr>
          <td>创建时间</td>
          <td>{{detailData.created_at}}</td>
      </tr>
      <tr>
          <td>最近登录时间</td>
          <td>{{detailData.updated_at}}</td>
      </tr>
  </table>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleDetailClose">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
import {detailItf} from '../../../types/category'
const props=defineProps<{
    visible:boolean,
    detailData:detailItf
}>()
const emits=defineEmits<{
    (event:"handleDetailClose"):void
}>()
watch(()=>props.detailData,()=>{

})
const {detailData}=toRefs(props)
const handleDetailClose=()=>{
    emits('handleDetailClose')
}
</script>

<style lang="less" scoped>
table{
    width: 100%;
    border-collapse: collapse;
    tr{
        line-height: 30px;
    }
    td{
        border: 1px solid gray;
        padding-left: 10px;
    }
}
</style>