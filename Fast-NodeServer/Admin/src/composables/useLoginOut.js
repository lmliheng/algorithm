import { useAuthStore } from '@/store/auth'
import { pathTag } from '@/config/pathTag'
import router from '@/router'

export const loginOut = () => {
    
    const authStore = useAuthStore()
    localStorage.removeItem('token')
    authStore.setUserInfo({})
    authStore.setToken('')
    authStore.setTokenTime('')

    router.push('/auth')
}
