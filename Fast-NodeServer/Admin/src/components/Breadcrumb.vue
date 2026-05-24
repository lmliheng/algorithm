<script setup>
import { useRoute } from 'vue-router'
import { onMounted,watch,ref } from 'vue';
const routePath = useRoute() 

onMounted(() => {
   
})
</script>
<template>
     <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>   
            <el-breadcrumb-item>{{routePath.matched[1].name}}</el-breadcrumb-item> 
            <el-breadcrumb-item>{{routePath.matched.length > 2 ? routePath.matched[2].name : ''}}</el-breadcrumb-item>         
        </el-breadcrumb>
</template>