// 用于检查token是否过期，过期则登录出用户

import { useAuthStore } from '@/store/auth'
import { loginOut } from '@/composables/useLoginOut'


export const checkTokenUsed = () => {
    const authStore = useAuthStore()
    const tokenTime = authStore.tokenTime
    const nowTime = new Date().toLocaleString()
    const diffTime = new Date(nowTime) - new Date(tokenTime)
    if (diffTime > 1000 * 60) {
        loginOut()
    }
}