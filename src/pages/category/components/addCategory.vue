<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  ><el-form
  ref="ruleFormRef"
  :model="ruleForm"
  :rules="rules"
  class="demo-ruleForm"
  status-icon
>
  <el-form-item label="名称" prop="name">
    <el-input v-model="ruleForm.name" />
  </el-form-item>
  <el-form-item label="父级">
    <el-input v-model.number="ruleForm.pid" />
  </el-form-item>
  <el-form-item label="分组">
    <el-input v-model="ruleForm.group" />
  </el-form-item>
</el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus';
import { reactive,ref } from 'vue';
import {categoryDataItf} from '../../../types/category'
import {addCategory} from '../../../http/category'
const ruleFormRef=ref()
const ruleForm:categoryDataItf=reactive({})
const props = defineProps<{
  dialogVisible: boolean;
}>();
const emits = defineEmits<{
  (event: "handleClose"): void;
}>();
const handleClose = () => {
  emits("handleClose");
};
const submitForm=(formEl: FormInstance | undefined)=>{
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      ruleForm.level=1
      addCategory(ruleForm).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
      handleClose()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const rules={
  name:[{ required: true, message: '请输入名称', trigger: 'blur' }]
}
</script>

<style scoped></style>
