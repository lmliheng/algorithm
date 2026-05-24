
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useUserInfoStore = defineStore('userInfo', () => {

    const userInfo = ref([])
    const setUserInfo = (val) => {
        userInfo.value = val
    }
    return { userInfo, setUserInfo }
}
)