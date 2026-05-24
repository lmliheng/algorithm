<script setup>
import { ref, onMounted } from 'vue'
import { requestPermissionList } from '../../composables/useRequest';

const permissionList = ref([])
const tableLayout = ref('fixed')
const loading = ref(false)

const getPermissionList = async () => {
    loading.value = true
    const res = await requestPermissionList()
    permissionList.value = res.permissions
    loading.value = false
}

onMounted(() => {
    getPermissionList()
})
</script>

<template>
    <el-table
      :data="permissionList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :table-layout="tableLayout"
      v-loading="loading"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column align="center" prop="permission_id" :label="$t('permission_id')" sortable />
      <el-table-column align="center" prop="permission_name" :label="$t('permission_name')" sortable />
      <!-- <el-table-column align="center" prop="permission_mark" :label="$t('permission_mark')" sortable /> -->
      <el-table-column align="center" prop="permission_description" :label="$t('permission_description')" sortable />
    </el-table>
</template>
