<script setup>
import { ref, onMounted, watch } from 'vue'
import { requestRoleList } from '../../composables/useRequest';
import { ElMessage, ElMessageBox } from 'element-plus'
import RolePermissionDialog from '../../components/RolePermissionDialog.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const DialogVisible = ref(false)
const roleList = ref([])
const loading = ref(false)
const tableLayout = ref('fixed')

const getRoleList = async () => {
    loading.value = true
    const res = await requestRoleList()
    
    roleList.value = res.roles
    loading.value = false
}

const handlePermission = (row) => {
    DialogVisible.value = true
}

const handleDelete = (row) => {
    ElMessageBox.confirm(t('confirm_delete_role'), t('role_manage'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning'
    }).then(() => {
        ElMessage({
            type: 'error',
            message: t('no_permission')
        })
        getRoleList()
    }).catch(() => {
        ElMessage({
            type: 'primary',
            message: t('cancel_delete')
        })
    })
}

watch(
    () => DialogVisible.value,
    (newVal) => {
    console.log(newVal)
})

onMounted(() => {
    getRoleList()
})
</script>

<template>
    <div>
    <RolePermissionDialog  :dialogVisible="DialogVisible" @update:dialogVisible="DialogVisible = $event" />
    <el-table :data="roleList" :table-layout="tableLayout" v-loading="loading">
        <el-table-column align="center" prop="role_id" :label="$t('role_id')"  />
        <el-table-column align="center" prop="role_name" :label="$t('role_name')"  />
        <el-table-column align="center" :label="$t('operation')">
            <template #default="scope">
                <el-button type="primary" size="small" @click="handlePermission(scope.row)">{{ $t('assign_permission') }}</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row)">{{ $t('delete_role') }}</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>
