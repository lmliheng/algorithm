// 使用
import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
  }

  const userInfo = ref({})
  const setUserInfo = (newUserInfo) => { // 拿的对象存的字符串,存字符串不好拿键值对
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