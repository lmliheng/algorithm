import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePathTagStore = defineStore('pathTag', () => {
    const pathTagsList = ref([])
    const setPathTags = (val) => {
        pathTagsList.value = val
    }
    const addPathTag = (val) => {
        if (pathTagsList.value.some(item => item.name === val.name)) {
            return
        }
        pathTagsList.value.push(val)
    }

    const removePathTag = (val) => {
        pathTagsList.value = pathTagsList.value.filter(item => item.name !== val.name)
    }

    const removeAllPathTags = (val) => {
        pathTagsList.value = pathTagsList.value.filter(item => item.name == val.name)
    }

    return { pathTagsList, setPathTags, addPathTag, removePathTag, removeAllPathTags }
}, {
    persist: true,
})
