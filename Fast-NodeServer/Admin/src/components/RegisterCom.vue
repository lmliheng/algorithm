<script setup>
import { ref } from 'vue'
import router from '../router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
    <div>
        <h1>{{ $t('register_component') }}</h1>
    </div>
</template>
