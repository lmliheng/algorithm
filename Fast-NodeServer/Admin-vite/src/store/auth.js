import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', () => {
    const token = ref('')
    const setToken = (newToken) => {
        token.value = newToken
    }

    const userInfo = ref({})
    const setUserInfo = (newUserInfo) => {
        userInfo.value = newUserInfo
    }

    const tokenTime = ref('')
    const setTokenTime = (newTokenTime) => {
        tokenTime.value = newTokenTime
    }

    return { token, setToken, userInfo, setUserInfo, tokenTime, setTokenTime }
}, {
    persist: true,
}
)
