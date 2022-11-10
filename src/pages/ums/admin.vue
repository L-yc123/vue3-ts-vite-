<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="编号" width="60" />
    <el-table-column prop="nickName" label="账号" />
    <el-table-column prop="username" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column label="添加时间"
      ><template #default="scope">{{
        parseTime(scope.row.createTime, 3)
      }}</template></el-table-column
    >
    <el-table-column label="最后登录" width="100"
      ><template #default="scope">{{
        parseTime(scope.row.loginTime)
      }}</template></el-table-column
    >
    <el-table-column label="是否启用">
      <template #default="scope">
        <el-switch
          v-model="scope.row.status"
          :active-value="0"
          :inactive-value="1"
          @change="handleEditStatus"
        />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="addButton(row)"
          >分配角色</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="handleEdit(row)"
          >编辑</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <AdminEdit :visiable="visiable" :form="form" @closeDialog="closeDialog" />
  <AdminSelect
    :addvisiable="addvisiable"
    :ruleForm="ruleForm"
    @handleClose="handleClose"
  />
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import {
  getAdminList,
  updateAdmin,
  getRoleList,
  getAdminRole,
} from "../../http/api";
import AdminEdit from "./components/adminEdit.vue";
import AdminSelect from "./components/adminSelect.vue";

const data = reactive<{
  tableData: {}[];
  visiable: boolean;
  addvisiable: boolean;
  form: adminItf;
  ruleForm: role;
}>({
  tableData: [],
  visiable: false,
  addvisiable: false,
  form: {},
  ruleForm: {
    roleList: [],
    roleUser: [],
    id:0
  },
});
const { tableData, visiable, form, addvisiable, ruleForm } = toRefs(data);
const getList = (): void => {
  getAdminList({
    keyword: "",
    pageSize: 10,
    pageNum: 1,
  })
    .then((res) => {
      tableData.value = res.data.list;
    })
    .catch((err) => {
      console.log(err);
    });
};
getList();
const getRole = (): void => {
  getRoleList()
    .then((res) => {
      ruleForm.value.roleList = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
getRole();
const handleEdit = (row: adminItf) => {
  form.value = row;
  visiable.value = true;
};
const closeDialog = (r: string) => {
  if (r.length > 1) {
    getList();
  }
  form.value = {};
  visiable.value = false;
};
const handleEditStatus = (val: any, row: any): void => {
  // updateAdmin(row.id as number,form.value).then((res)=>{
  //   console.log(res);
  // }).catch(err=>{
  //     console.log(err);
  // })
};

//获取用户角色
const getAdminRoleById = (id: number) => {
  ruleForm.value.roleUser=[]
  getAdminRole(id)
    .then((res) => {
      console.log(res);
      const {data}={...res}
      ruleForm.value.id=id
      ruleForm.value.roleUser=data.map((item: { id: any; })=> item.id)
    })
    .catch((err) => {});
};
const addButton = (row: any): void => {
  addvisiable.value = true;
  getAdminRoleById(row.id);
};
const handleClose = (r:string): void => {
  if(r.length>1){
    getList()
  }
  addvisiable.value = false;
};
const parseTime = (time: string | undefined, timeFormat: number = 4) => {
  if (!time) {
    return "";
  }
  const date = new Date(time);
  const y = date.getFullYear();
  const m =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const i =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (timeFormat === 3) {
    const time_str = `${y}-${m}-${d}`;
    return time_str;
  } else {
    const time_str = `${y}-${m}-${d} ${h}:${i}:${s}`;
    return time_str;
  }
};
</script>

<style scoped></style>
