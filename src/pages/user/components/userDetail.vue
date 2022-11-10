<template>
  <el-dialog
    v-model="visiable"
    title="用户详情"
    width="50%"
    :before-close="handleClose"
  >
    <table>
      <tr>
        <td>id</td>
        <td>{{userInfo.id}}</td>
      </tr>
      <tr>
        <td>昵称</td>
        <td>{{userInfo.name}}</td>
      </tr>
      <tr>
        <td>邮箱</td>
        <td>{{userInfo.email}}</td>
      </tr>
      <tr>
        <td>是否激活？</td>
        <td>{{userInfo.is_locked}}</td>
      </tr>
      <tr>
        <td>最近登录</td>
        <td>{{userInfo.updated_at}}</td>
      </tr>
      <tr>
        <td>创建时间</td>
        <td>{{userInfo.created_at}}</td>
      </tr>
      <tr>
        <td>头像</td>
        <td style="line-height: 10px;"><img :src="userInfo.avatar_url" alt=""></td>
      </tr>
    </table>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleClose">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch } from "vue";
import {userData}from '../../../types/user'

const props = defineProps<{
    visiable: boolean;
    userDetail:userData
}>();
const data=reactive<{
  userInfo:userData
}>({
  userInfo:{}
})
const {userInfo} = toRefs(data)
watch(()=>props.userDetail,()=>{
  userInfo.value={}
userInfo.value={...props.userDetail}
})
const emit = defineEmits<{
  (event: "handleClose"): void;
}>();
const handleClose = () => {
  emit("handleClose");
};
</script>

<style scoped lang="less">

table{
  width: 100%;
  border-collapse: collapse;
  tr{
    line-height: 30px;
  }
  tr>td:nth-of-type(1){
    color: gray;
  }
  td{
    border: 1px solid gray;
    padding-left: 10px;
  }
  
}
img{
  width: 40px;
}
</style>
