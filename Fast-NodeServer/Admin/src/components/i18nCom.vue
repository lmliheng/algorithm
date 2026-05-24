<script setup>

import {onMounted} from 'vue'
import { useLangStore } from '@/store/lang'
import { useI18n } from 'vue-i18n'
const { locale,t } = useI18n()

const langStore = useLangStore()

const handleChangeLang = (val) => {
    locale.value = val
    langStore.setLang(val)
}

onMounted(() => {
    locale.value = langStore.lang
})
</script>
<template>
     <el-tooltip
        class="box-item"
        effect="dark"
        :content="$t('language_switch')"
        placement="bottom"
      >
         <el-dropdown placement="top-start" trigger="click" @command="handleChangeLang">
               <svg width="25px" id="logo-i18n" t="1777560913112" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9309" ><path d="M549.12 643.008L440.768 535.936l1.28-1.28A747.52 747.52 0 0 0 600.32 256h125.056V170.688H426.688V85.376H341.376v85.312H42.688v84.928h476.608A670.4 670.4 0 0 1 384 484.288a667.52 667.52 0 0 1-98.56-142.912H200.128a749.312 749.312 0 0 0 127.168 194.56L110.08 750.08l60.608 60.544L384 597.376l132.736 132.672 32.384-87.04z m240.256-216.32H704l-192 512h85.376l47.744-128h202.688l48.192 128h85.376l-192-512z m-111.808 298.688l69.12-184.768 69.12 184.768h-138.24z" p-id="9310"></path></svg>
                <template #dropdown>
                 <el-dropdown-menu>
                <el-dropdown-item  command="cn" :disabled="langStore.lang === 'cn'">{{ $t('language_cn') }}</el-dropdown-item>
                <el-dropdown-item  command="en" :disabled="langStore.lang === 'en'">{{ $t('language_en') }}</el-dropdown-item>
                <el-dropdown-item  command="jp" :disabled="langStore.lang === 'jp'">{{ $t('language_jp') }}</el-dropdown-item>
                <el-dropdown-item  command="ru" :disabled="langStore.lang === 'ru'">{{ $t('language_ru') }}</el-dropdown-item>
                </el-dropdown-menu>
                  </template>
              </el-dropdown>
      </el-tooltip>
  
</template>
