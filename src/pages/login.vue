<template>
  <div class="loginBox">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="60px"
      class="demo-ruleForm"
      status-icon
    >
    <h2>后台系统</h2>
      <el-form-item label="用户" prop="email">
        <el-input type="text" v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" />
      </el-form-item>
      <el-form-item class="loginButton" label-width="0">
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import {login,getData,getCategoriesData} from '../http/api'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

let ruleFormRef=ref()
let store = useStore()
let router = useRouter()
const state = reactive({
  ruleForm:{
    email: "super@a.com",
    pwd: "123123",
  },
  rules: {
    email: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    pwd: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 16, message: "密码应在6-16位之间", trigger: "blur" },
    ],
  }
});
const { ruleForm, rules } = toRefs(state);
const submitForm=(): void => {
    ruleFormRef.value.validate().then(()=>{
      
        login({email:state.ruleForm.email,password:state.ruleForm.pwd}).then(res=>{
            const {data} = res
            localStorage.setItem('token',res.access_token)
            sessionStorage.setItem('activeRouter','/home')
            store.dispatch("getAdminInfo").then((res1)=>{
                router.push('/home')
            }).catch(err1=>{
              console.log(err1);
            })
        }).catch(err=>{
            console.log(err);
        })
    }).catch(()=>{
        console.log('err');
        
    })
  }
</script>

<style lang="less" scoped>
.loginBox {
  width: 100vw;
  height: 100vh;
  background: url(../assets/3333.webp);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  .el-form{
    width: 400px;
    margin: auto;
    background-color: white;
    padding: 20px;
    h2{
        padding: 0 0 20px 0;
        margin: 0;
    }
  }
}

.loginButton>.el-form-item__content{
    display: flex;
    .el-button{
        margin: auto;
    }
}
</style>
