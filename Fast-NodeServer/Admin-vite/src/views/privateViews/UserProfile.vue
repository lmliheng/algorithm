<script setup>
import { useAuthStore } from '../../store/auth';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const authStore = useAuthStore();

const permissionChange= (val) => {
   switch(val.permission_id.toString()){
    case '1':
        return '创建用户';
    case '2':
        return '导入用户';
    case '3':
        return '更新用户';
    case '4':
        return '删除用户';
    case '5':
        return '创建文章';
    case '6':
        return '导入文章';
    case '7':
        return '更新文章';
    case '8':
        return '删除文章';
    case '9':
        return '创建分类';
    case '10':
        return '导入分类';
    case '11':
        return '更新分类';
    case '12':
        return '删除分类';
    default:
        return t('unknown_permission');
   }
}
</script>
<template>
    <div class="user-profile" >
         <div class="block">
          <el-avatar :size="100" :src="authStore.userInfo?.user_detail?.avatar" />
          <p>{{ $t('user_id') }}：{{ authStore?.userInfo?.user_detail?.id  }}</p>
          <p>{{ $t('role') }}：{{ authStore?.userInfo?.user_detail?.role_name  }}</p>
          <p>{{ $t('username') }}：{{ authStore?.userInfo?.user_detail?.username }}</p>
          <p>{{ $t('permission') }}：</p>
          <ul id="permission_list">
            <li v-for="item in authStore?.userInfo?.user_permission" :key="item"  id="permission">{{ permissionChange(item) }}</li>
          </ul>
        </div>
    </div>
</template>

<style scoped>
.user-profile {
    border: 1px solid #e4e7ed;
    padding: 20px;
}

#permission_list{
    margin-left: 20px;
    list-style-type: decimal;
    padding-left: 20px;
}
</style>
