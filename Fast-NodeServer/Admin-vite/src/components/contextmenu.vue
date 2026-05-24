<script setup>
import { onMounted, onUnmounted,defineEmits,defineProps } from 'vue'
import { usePathTagStore } from '@/store/pathTag'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  isShow: Boolean
})

const pathTagStore = usePathTagStore()

const closeAllTag = () => {
    pathTagStore.removeAllPathTags(route)
    emit('close')
}

const emit = defineEmits(['close'])

const handleClickOutside = (e) => {
  if (props.isShow && !e.target.closest('.contextmenu-container')) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="contextmenu-container">
    <el-menu>
      <el-menu-item index="1" id="closeAllTag" @click="closeAllTag">关闭所有</el-menu-item>
    </el-menu>
  </div>
</template>
<style>
    #closeAllTag{
        width: 90px;
        height: 30px;
        color: black;
        border:1px solid #e4e7ed;
    }
</style>
