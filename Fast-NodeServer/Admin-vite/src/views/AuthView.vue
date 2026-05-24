<script setup>
import { ref } from 'vue'
import LoginCom from '../components/LoginCom.vue'
import RegisterCom from '../components/RegisterCom.vue'
const count = ref(0)
</script>

<template>
    <div id="auth_container">
        <LoginCom id="login_container"></LoginCom>
    </div>
</template>

<style scoped>
#auth_container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#login_container{
   
    width: 300px;
    height: 300px;
}
</style>
