<template>
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="昵称">
          <el-input clearable  v-model="searchData.nameSearch" placeholder="请输入昵称进行查询" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input clearable v-model="searchData.emailSearch" placeholder="请输入邮箱进行查询" />
        </el-form-item>
        <el-form-item label="手机">
            <el-input clearable v-model="searchData.phoneSearch" placeholder="请输入手机号码进行查询" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="searchData.nameSearch===''&&searchData.emailSearch===''&&searchData.phoneSearch===''" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
  <el-table :data="userdata" stripe style="width: 100%" border > 
    <el-table-column label="id" width="80">
      <template #default="{row}">
        <div style="display: flex; align-items: center">
          <span>{{ row.id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="昵称" width="120">
      <template #default="{row}">
        <div style="display: flex; align-items: center">
          <span>{{ row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="邮箱" width="190">
      <template #default="{row}">
        <div style="display: flex; align-items: center">
          <span >{{ row.email }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="手机" width="120">
      <template #default="{row}">
        <div style="display: flex; align-items: center">
          <span >{{ row.phone }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="最近登录时间" width="174">
      <template #default="{row}">
        <div style="display: flex; align-items: center">
          <span >{{ row.updated_at }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="是否锁定" width="120">
      <template #default="{row}">
        <div style="display: flex; align-items: center">
          正常<el-switch v-model="row.is_locked" @change="changeUserStatus(row.id)" />锁定
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" >
      <template #default="scope">
        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button size="small" @click="toDetail(scope.row)"
          >详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <UserDetailCom :visiable="visiable" :userDetail="userDetail" @handleClose="handleClose" />
  <updateUserInfo :updateUser="updateUser" :dialogVisible="dialogVisible" @handleEditClose="handleEditClose" />
  <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="total_page" />
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { getUsersData,getUserDetail,lockUser } from "../../http/user";
import {userData,searchDataItf}from '../../types/user'
import UserDetailCom from './components/userDetail.vue'
import updateUserInfo from './components/updateUserInfo.vue'
const data=reactive<{
    userdata:userData[],
    searchData:searchDataItf,
    total_page:number,
    userDetail:userData,
    updateUser:userData
}>({
    userdata:[],
    searchData:{
      current:0,
    nameSearch:'',
    emailSearch:'',
    phoneSearch:'',
    },
    total_page:0,
    userDetail:{},
    updateUser:{
      id:0,
  name:'',
  email:''
    }
})
const {userdata,searchData,total_page,userDetail,updateUser} =toRefs(data)
const getList=(e?:Window,page:number=1)=>{
    searchData.value.current=page
    getUsersData(searchData.value)
  .then((res:any) => {
    res.data.map((item: { is_locked: number | boolean; })=>{
      item.is_locked=item.is_locked===0? true:false
    })
    userdata.value=res.data
    total_page.value=res.meta.pagination.total_pages
  })
  .catch((err) => {
    console.log(err);
  });
}
getList()


let dialogVisible=ref(false)
const handleEdit = (index: number, row: userData) => {
  updateUser.value={}
  updateUser.value=row
  dialogVisible.value=true
};
const handleEditClose=(r?:string)=>{
  dialogVisible.value=false
  if(r){
    getList()
  }
}
const addUser=()=>{
  updateUser.value={}
  dialogVisible.value=true
}
let visiable=ref<boolean>(false)
const toDetail=(row:userData):void=>{
  getUserDetail(row.id as number).then((res:any)=>{
    userDetail.value=res
    visiable.value=true
  }).catch(err=>{
    console.log(err);
  })
}
const handleClose=()=>{
  visiable.value=false
}
const changePage=(e:Window,page:number)=>{
    getList(e,page)
}
//更改用户状态
const changeUserStatus=(id:number)=>{
  lockUser(id).then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log(err);
  })
}
</script>

<style lang="less" scoped>
.el-pagination{
    margin-top: 10px;
}
.demo-form-inline{
  margin-top: 10px;
}
</style>
