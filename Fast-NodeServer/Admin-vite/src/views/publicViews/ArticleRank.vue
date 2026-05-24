<script setup>
import { ref, onMounted } from 'vue'
import { requestArticleList } from '@/composables/useRequest'
import sortable from 'sortablejs'

const articleList = ref([])
const tableLayout = ref('fixed')
const loading = ref(false)
const total = ref(0)

import { ElMessage } from 'element-plus'

const handleSizeChange = (val) => {}
const handleCurrentChange = (val) => {}

const handleDetail = (row) => {
    ElMessage({
        type: 'error',
        message: "权限不足"
    })
}

const handleDelete = (row) => {
    ElMessage({
        type: 'error',
        message: "权限不足"
    })
}

const getArticleList = async () => {
    loading.value = true
    const res = await requestArticleList()
    console.log(res)
    articleList.value = res.articleList
    total.value = res.articleList.length
    loading.value = false
}

onMounted(() => {
    getArticleList()
    new sortable(document.querySelector('.el-table__inner-wrapper tbody'), {
        animation: 150,
        onEnd: (evt) => {}
    })
})
</script>
<template>
    <div>
        <el-table :data="articleList" :loading="loading" stripe :table-layout="tableLayout">
            <el-table-column align="center" prop="article_id" label="排名"  />
            <el-table-column align="center" prop="title" label="标题"  />
            <!-- <el-table-column align="center" prop="category" label="分类"  /> -->
            <el-table-column align="center" prop="status" label="状态"  />
            <el-table-column align="center" prop="user" label="作者"  />
            <el-table-column align="center" prop="updated_at" label="修改日期"  />
            <!-- <el-table-column align="center" prop="desc" label="描述"  /> -->
            <el-table-column align="center" label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="handleDetail(scope.row)">{{ $t('detail') }}</el-button>
                    <el-button type="danger " @click="handleDelete(scope.row)">{{ $t('delete') }}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div id="pagination">
        <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="100"
            :page-size.sync="10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
        </div>
    </div>
</template>

<style scoped>
#pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
