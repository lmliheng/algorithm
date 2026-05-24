<script setup>
import { useAuthStore } from '../../store/auth';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const authStore = useAuthStore();

const permissionChange= (val) => {
   switch(val){
    case 'distributeRole':
        return t('distribute_role');
    case 'importUser':
        return t('import_user');
    case 'removeUser':
        return t('remove_user');
    case 'distributePermission':
        return t('distribute_permission');
    default:
        return t('unknown_permission');
   }
    
}

</script>
<template>
    <div class="user-profile" >
         <div class="block">
          <el-avatar :size="100" :src="authStore.userInfo.avatar" />
          <p>{{ $t('user_id') }}：{{ authStore?.userInfo?.id  }}</p>
          <p>{{ $t('role') }}：{{ authStore?.userInfo?.title  }}</p>
          <p>{{ $t('username') }}：{{ authStore?.userInfo?.username }}</p>
          <p>{{ $t('permission') }}：</p>
          <ul>
            <li v-for="item in authStore?.userInfo?.permission?.points" :key="item"  id="permission">{{ permissionChange(item) }}</li>
            
          </ul>
        </div>
    </div>
</template>

<style scoped>
.user-profile {
    border: 1px solid #e4e7ed;
    padding: 20px;
}
#permission{
    list-style-type: decimal;
}

</style>
