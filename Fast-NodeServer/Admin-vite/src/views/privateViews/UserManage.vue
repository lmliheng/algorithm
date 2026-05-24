<script setup>
import { onMounted, ref } from 'vue';
import {useRouter} from 'vue-router';
import { requestUser } from '../../composables/useRequest';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter();

const loading = ref(false);
const userList = ref([]);
const pageNum = ref("1");
const pageSize = ref("10");
const total = ref(0);
const tableLayout = ref('fixed')

const getUser=async () => {
    loading.value = true;
    const res = await requestUser();
    console.log(res)
    
    userList.value = res.users;
    total.value = res.users.length;
    pageNum.value = "2"
    pageSize.value = "2"
    loading.value = false;
}

const handleImport = () => {
    router.push('/user/user-import')
}

const handleDetail = (index,row) => {
      router.push('/user/user-info/' + row._id)
}

const handleEdit = (index,row) => {
    ElMessage({
        type: 'info',
        message: t('no_permission_edit')
    })
}

const handleDelete = (index,row) => {
    ElMessageBox.confirm(t('confirm_delete'), t('user_manage'), {
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        type: 'warning'
    }).then(() => {
        ElMessage({
            type: 'error',
            message: t('no_permission_delete')
        })
        getUser()
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: t('cancel_delete')
        })
    })
}

onMounted(() => {
    getUser();
})
</script>
<template>
    <div>
        <div id="user-management-head">
              <el-button  type="primary" size="large" @click="handleImport">
          {{ $t('import_user') }}({{ $t('support_format') }})
        </el-button>
          <el-button  type="primary" size="large" >
          {{ $t('export_excel') }}
        </el-button>
        </div>

    <el-table
    :data="userList"
    border
    :loading="loading"
    stripe
    :table-layout="tableLayout"
    :default-sort="{ prop: 'id', order: 'ascending' }"
    >
    <el-table-column align="center" prop="id" :label="$t('id')" sortable />
     <el-table-column align="center" :label="$t('avatar')">
        <template #default="scope">
            <el-avatar :src="scope.row.avatar" fit="fill" />
        </template>
    </el-table-column>
    <el-table-column align="center" prop="username" :label="$t('username')"  />
    <el-table-column align="center"  :label="$t('role')">
         <template #default="scope">
           <el-tag type="primary">{{ scope.row.role_name }}</el-tag>
        </template>
    </el-table-column>
    <!-- <el-table-column align="center" prop="mobile" :label="$t('mobile')"  /> -->
   <el-table-column align="center" :label="$t('operation')">
      <template #default="scope">
        <el-button type="success" size="small" @click="handleDetail(scope.$index, scope.row)">
          {{ $t('detail') }}
        </el-button>
        <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">
          {{ $t('edit') }}
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          {{ $t('delete') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div id="example-pagination-block">
    <el-pagination layout="prev, pager, next" :total="total" size="large" />
  </div>
    </div>
</template>

<style scoped>
#user-management-head {
    text-align: right;
    margin-bottom: 20px;
}

#example-pagination-block {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
