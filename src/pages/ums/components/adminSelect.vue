<template>
    <el-dialog
    v-model="addvisiable"
    title="分配角色"
    width="50%"
    :before-close="handleClose"
  >
  <el-form
  ref="formRef"
  :model="form"
  class="demo-ruleForm"
  status-icon
>
  <el-form-item label="角色名称" prop="region">
    <el-select style="width:400px" multiple v-model="form.roleUser
    ">
      <el-option v-for="item in form.roleList" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </el-form-item>
</el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleEdit"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs, watch} from 'vue'
import {updateAdminRole} from '../../../http/api'
const props =defineProps<{
    addvisiable:boolean,
    ruleForm:role
}>()
const state=reactive<{
    form:role
}>({
    form:{
        roleUser:[],
        id:0
    }
})

const {form}=toRefs(state)
watch(()=>props.ruleForm,()=>{
    form.value={...props.ruleForm}
    console.log(form);
},{deep:true})
const emit=defineEmits<{
    (event:'handleClose',r:string):void
}>()
const handleClose = (r:string=''):void => {
    emit('handleClose',r)
}
const handleEdit = ():void => {
    updateAdminRole({adminId:form.value.id as number,roleIds:form.value.roleUser.join(',')}).then(res=>{
        console.log(res);
        handleClose('reload')
    }).catch(err=>{
        console.log(err);
        
    })
}
</script>

<style scoped>

</style>