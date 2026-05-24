
<script setup>

import { requestArticleList } from '@/composables/useRequest'
import { ref,onMounted } from 'vue'
import sortable from 'sortablejs'

const articleList = ref([])
const tableLayout = ref('fixed')
const loading = ref(false)
const total = ref(0)

import { ElMessage } from 'element-plus'

const handleSizeChange = (val) => {
    
}
const handleCurrentChange = (val) => {
   
}

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
    articleList.value = res.data.list
    total.value = res.data.total
    loading.value = false
}

// {
//     "_id": "69fa4c40cab6e042687b2c80",
//     "ranking": 1,
//     "title": "Vue3 + 全家桶",
//     "author": "Sunday",
//     "publicDate": "1629099597000",
//     "desc": "项目基于最新的vue3全家桶进行开发"
// }

onMounted(() => {
    getArticleList()
    new sortable(document.querySelector('.el-table__inner-wrapper tbody'), {
        animation: 150,// 动画时间
        onEnd: (evt) => {
            //console.log(evt)
        }
    })
  
})

</script>
<template>
    <div>
        <el-table :data="articleList" :loading="loading" stripe :table-layout="tableLayout">
            <el-table-column align="center" prop="ranking" :label="$t('ranking')"  />
            <el-table-column align="center" prop="title" :label="$t('title')"  />
            <el-table-column align="center" prop="author" :label="$t('author')"  />
            <el-table-column align="center" prop="publicDate" :label="$t('publicDate')"  />
            <el-table-column align="center" prop="desc" :label="$t('desc')"  />
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
