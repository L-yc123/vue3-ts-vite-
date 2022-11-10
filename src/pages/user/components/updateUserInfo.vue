<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑用户"
    width="30%"
    :before-close="handleEditClose"
  >
    <el-form
      ref="ruleFormRef"
      :model="userInfo"
      :rules="rules"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="昵称" prop="name">
        <el-input v-model="userInfo.name" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email" />
      </el-form-item>
      <el-form-item v-if="!updateUser.id" label="密码" prop="password">
        <el-input v-model="userInfo.password" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleEditClose">取消</el-button>
        <el-button type="primary" @click="Submit(ruleFormRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus/es/components/form";
import { FormRules } from "element-plus/es/tokens/form";
import { reactive, toRefs, watch, ref } from "vue";
import { userData } from "../../../types/user";
import { updateUserDetail,addUser } from "../../../http/user";
import { ElMessage } from "element-plus";
const ruleFormRef = ref<FormInstance>();
const props = defineProps<{
  dialogVisible: boolean;
  updateUser: userData;
}>();
const data = reactive<{
  userInfo: userData;
}>({
  userInfo: {
    name: "",
    email: "",
    password: ""
  },
});
const { userInfo } = toRefs(data);

watch(
  () => props.updateUser,
  () => {
    userInfo.value = { ...props.updateUser };
  }
);
const emits = defineEmits<{
  (event: "handleEditClose", r?: string): void;
}>();

const handleEditClose = (r?: string) => {
  emits("handleEditClose", r);
};
const Submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if(userInfo.id){
        updateUserDetail(userInfo.value.id as number, userInfo.value)
        .then((res) => {
          ElMessage({
            message: "修改成功",
            type: "success",
          });
          handleEditClose("reload");
        })
        .catch((err) => {
          console.log(err);
        });
      }else{
        addUser(userInfo.value).then(res=>{
            ElMessage({
            message: "添加成功",
            type: "success",
          });
          handleEditClose("reload");
        }).catch(err=>{
            ElMessage({
            message: '邮箱已经存在，请输入一个新的邮箱',
            type: "error",
          });
        })
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const checkEmail = (rule: any, value: any, callback: any) => {
  const regEmial =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else if (!regEmial.test(value)) {
    callback(new Error("请输入正确的邮箱"));
  } else {
    callback();
  }
};
const checkPwd = (rule: any, value: any, callback: any) => {
  const regPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (!regPwd.test(value)) {
    callback(new Error("密码需包含一个数字和一个字母且长度在8-16位之间"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入昵称", trigger: "blur" },
    { min: 6, max: 12, message: "长度应在6-12位之间", trigger: "blur" },
  ],
  email: [{ required: true, validator: checkEmail, trigger: "blur" }],
  password: [{ required: true, validator: checkPwd, trigger: "blur" }],
});
</script>

<style scoped></style>
