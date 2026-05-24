<script setup>
import MarkdownCom from '@/components/MarkdownCom.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const activeName = ref('markdown')
import { ElMessage } from 'element-plus'

const handleSubmit = () => {
    ElMessage({
        type: 'success',
        message: "文章创建成功"
    })
    router.push('/article/article-rank')
}
</script>
<template>
    <div>
        <div id="article-create-header">
        <el-input
         placeholder="请输入文章标题" />
</div>

<div>
<el-tabs v-model="activeName" type="card">
    <el-tab-pane label="markdown" name="markdown">
        <MarkdownCom />
    </el-tab-pane>
    <el-tab-pane label="html" name="html">
    </el-tab-pane>
</el-tabs>
</div>

         <div style="text-align: right;">
            <el-button @click="handleSubmit" type="primary" size="large">
              提交
            </el-button>
         </div>
    </div>
</template>

<style scoped>
#article-create-header {
    margin-bottom: 20px;
}
</style>
