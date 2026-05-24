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

const ruleFormRef = ref()
const ruleForm = reactive({
  account: 'admin',
  password: '123456'
})

const submitForm = async () => {
   loading.value = true
   const res = await login(ruleForm.account, ruleForm.password)

   if(res.code === 200){
    loading.value = false
    ElMessage.success(t('login_success'))
    localStorage.setItem('token', res.token)
    authStore.setToken(res.token)
    authStore.setUserInfo(res.user_info)
    authStore.setTokenTime(new Date().toLocaleString())
    router.push('/')
   }else{
    loading.value = false
    ElMessage.error(t('login_failed'))
   }

}

onMounted(() => {
  
})
</script>

<template>
    <div  v-loading="loading">
        <i18nCom />
        <h1 style="text-align: center;margin-bottom: 40px;">{{ $t('login') }}</h1>
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
