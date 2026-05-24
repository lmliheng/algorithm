<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { requestUserDetail } from '../../composables/useRequest';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = useRoute()
const id=ref(route.params.id)
const loading = ref(false)

const userInfo = ref({})

 const printLoading = ref(false)
 const  printObj = {
              id: "user-info",
              popTitle: 'good print',
              extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
              extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
              beforeOpenCallback (vue) {
                vue.printLoading = true
                console.log('打开之前')
              },
              openCallback (vue) {
                vue.printLoading = false
                console.log('执行了打印')
              },
              closeCallback (vue) {
                console.log('关闭了打印工具')
              }
            }
const getUserDetail=async () => {
    loading.value = true;
    const res = await requestUserDetail(id.value);
    userInfo.value = res.data;
    console.log(userInfo.value);
    loading.value = false;
}
onMounted(() => {
    getUserDetail(id.value);
})
</script>
<template>
    <div id="user-info-container">
        <div id="user-info">
    <el-card style="max-width: 800px"  v-loading="loading">
    <template #header>
       <div id="head">
    <div id="left-head">
          <p>{{ userInfo.title || userInfo.username }}</p>
          <div id="head-more-info">
            <span>{{ userInfo.mobile }}</span>
          </div>
    </div>

    <div id="right-head">
        <el-avatar :src="userInfo.avatar" :size="40" />
    </div>

</div>
    </template>
    <el-descriptions :column="2" border>
      <el-descriptions-item :label="$t('username')">{{ userInfo.username }}</el-descriptions-item>
      <el-descriptions-item :label="$t('position')">{{ userInfo.title }}</el-descriptions-item>
      <el-descriptions-item :label="$t('mobile')">{{ userInfo.mobile }}</el-descriptions-item>
      <el-descriptions-item :label="$t('gender')">{{ userInfo.gender }}</el-descriptions-item>
      <el-descriptions-item :label="$t('nationality')">{{ userInfo.nationality }}</el-descriptions-item>
      <el-descriptions-item :label="$t('address')">{{ userInfo.address }}</el-descriptions-item>
      <el-descriptions-item :label="$t('industry')">{{ userInfo.major }}</el-descriptions-item>
      <el-descriptions-item :label="$t('honor')">{{ userInfo.glory }}</el-descriptions-item>
      <el-descriptions-item :label="$t('role')">
        <el-tag v-for="role in userInfo.role" :key="role.id" size="small">
          {{ role.title }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item :label="$t('remarks')">
        <span v-for="(item, index) in userInfo.remark" :key="index">
          {{ item }}<span v-if="index < userInfo.remark.length - 1">, </span>
        </span>
      </el-descriptions-item>
    </el-descriptions>

  </el-card>
</div>
     
      <div id="user-info-footer">
        <el-button type="primary" @click="$router.back()">{{ $t('back') }}</el-button>
        <el-button type="success" v-print="printObj">{{ $t('print') }}</el-button>
      </div>
  </div>

</template>

<style scoped>

#user-info-container{
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

#user-info{
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
#user-info-footer{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
}
.user-profile {
    border: 1px solid #e4e7ed;
    padding: 20px;
}

#head{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#footer-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
