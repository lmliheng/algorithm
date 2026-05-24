
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const usePathTagStore = defineStore('pathTag', () => {

    const pathTagsList = ref([])
    const setPathTags = (val) => {
        pathTagsList.value = val
    }
    const addPathTag = (val) => { // val是一个对象，包含路由信息和标签信息
        if (pathTagsList.value.some(item => item.name === val.name)) {
            return
        }
        pathTagsList.value.push(val)
    }

    const removePathTag = (val) => {
        pathTagsList.value = pathTagsList.value.filter(item => item.name !== val.name)
    }

    const removeAllPathTags = (val) => { // 当前route
        pathTagsList.value = pathTagsList.value.filter(item => item.name == val.name)
    }

    return { pathTagsList, setPathTags, addPathTag, removePathTag, removeAllPathTags }
}, {
    persist: true,
}
)