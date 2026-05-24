<script setup>
import { computed } from 'vue'
import { ElDialog } from 'element-plus'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false
    },
})


const emit = defineEmits(['update:dialogVisible'])
const dialogVisible = computed({
    get() {
        return props.dialogVisible
    },
    set(val) {
        emit('update:dialogVisible', val)
    }
})



</script>


<template>
    <el-dialog
        :title="$t('assign_permission_title')"
        width="20%"
        align="center"
        v-model="dialogVisible" 
    >

    {{ $t('no_permission_content') }}
    </el-dialog>
</template>
