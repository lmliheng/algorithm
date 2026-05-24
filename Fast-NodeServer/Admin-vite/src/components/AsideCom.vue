<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  UserInfo: {
    type: Object,
    default: () => ({})
  },
  routePath: {
    type: String,
    default: '/user-profile',
  },
  isCollapse: {
    type: Boolean,
    default: () => false
  }}
)

import {
  User,
  Menu as IconMenu,
  Operation,
  Notebook,
} from '@element-plus/icons-vue'

onMounted(() => {
})
</script>

<template>
  <el-menu
    class="el-menu-vertical-demo"
    :router=true
    :default-active="props.routePath"
    :collapse="props.isCollapse"
  >

  <div id="aside-logo">
  <el-avatar id="header-avatar" shape="square" size="default" :src="props.UserInfo?.user_detail?.avatar" />
  <span id="logo-text" v-if="!props.isCollapse">{{ props.UserInfo?.user_detail?.username }}</span>
  </div>

   <el-menu-item index="/user-profile">
     <el-icon><User /></el-icon>
      <template #title>{{ $t('user_profile') }}</template>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Operation /></el-icon>
        <span>{{ $t('user') }}</span>
      </template>
        <el-menu-item index="/user/user-manage">{{ $t('user_manage') }}</el-menu-item>
        <el-menu-item index="/user/role-manage">{{ $t('role_manage') }}</el-menu-item>
        <el-menu-item index="/user/permission-manage">{{ $t('permission_manage') }}</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
       <el-icon><Notebook /></el-icon>
        <span>{{ $t('article') }}</span>
      </template>
        <el-menu-item index="/article/article-rank">{{ $t('article_rank') }}</el-menu-item>
        <el-menu-item index="/article/article-detail">{{ $t('article_detail') }}</el-menu-item>
        <el-menu-item index="/article/article-create">{{ $t('article_create') }}</el-menu-item>
        <el-menu-item index="/article/article-manage">{{ $t('article_manage') }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
::deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
  width: 200px;
  min-height: 400px;
}
#aside-logo {
height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

#logo-text {
  font-size: 16px;
  font-weight: bold;
  font-family: 'logo-en';
}
</style>
