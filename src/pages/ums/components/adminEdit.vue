<template>
    <el-dialog v-model="visiable" title="Shipping address"
    :before-close="closeDialog">
      <el-form :model="userInfo">
        <el-form-item label="账号" label-width="120px">
          <el-input v-model="userInfo.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="userInfo.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="userInfo.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="userInfo.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" label-width="120px">
          <el-input type="textarea" v-model="userInfo.note" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否启用" label-width="120px">
            <el-radio-group v-model="userInfo.status" class="ml-4">
                <el-radio :label="0" size="large">是</el-radio>
                <el-radio :label="1" size="large">否</el-radio>
              </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="handleEdit"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch } from 'vue';
import {updateAdmin} from '../../../http/api';
const props = defineProps<{
    visiable:boolean,
    form:adminItf
}>()
const state =reactive<{
    userInfo:adminItf
}>({
    userInfo:{}
})
const {userInfo} =toRefs(state)

watch(()=>props.form,()=>{
userInfo.value={...props.form}
})

const emit=defineEmits<{
    (event:'closeDialog',r:string):void
}>()
const closeDialog=(r:string='')=>{
    emit('closeDialog',r)
}
const handleEdit=()=>{
    updateAdmin(userInfo.value.id as number,userInfo.value).then(()=>{
    closeDialog('reload')
    }).catch(err=>{
        console.log(err);
    })
}
</script>

<style scoped>

</style>