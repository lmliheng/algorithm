<script setup>
import { reactive, ref,onMounted } from 'vue'
import { login } from '../composables/useRequest'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import { useAuthStore } from '../store/auth'
import { useI18n } from 'vue-i18n'
import i18nCom from './i18nCom.vue'
const { t } = useI18n()
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

// 没写校验规则
// const rules = reactive({
//   account: [{required: true, message: '请输入账号', trigger: 'blur'}],
//   password: [{required: true, message: '请输入密码', trigger: 'blur'}],
// })
const ruleFormRef = ref()
const ruleForm = reactive({
  account: 'super-admin',
  password: '123456'
})

const submitForm = async () => {
   loading.value = true
   // await ruleFormRef.value.validate()
   const res = await login(ruleForm.account, ruleForm.password)
   if(res.code === 200){
    loading.value = false
    ElMessage.success(t('login_success'))
    // 登录成功后，将token分别存储到localStorage，pinia store中
    localStorage.setItem('token', res.data.token)
    authStore.setToken(res.data.token)
    authStore.setTokenTime(new Date().toLocaleString())
    router.push('/')
   }
}
onMounted(() => {
    // env未生效
  console.log('process.env',process.env)
})
</script>

<template>
    
    <div  v-loading="loading">
        <i18nCom />
        <h1 style="text-align: center;">{{ $t('login') }}</h1>
        <div id="login-form">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="50px">
                <el-form-item :label="$t('account')" prop="account">
                    <el-input v-model="ruleForm.account" :placeholder="$t('placeholder_account')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('password')" prop="password">
                    <el-input v-model="ruleForm.password" :placeholder="$t('placeholder_password')" show-password></el-input>
                </el-form-item>
                    <el-button type="primary" @click="submitForm" style="width: 300px;">{{ $t('login') }}</el-button>
            </el-form>

        </div>



    </div>
</template>
<style scoped>
#login-form{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
