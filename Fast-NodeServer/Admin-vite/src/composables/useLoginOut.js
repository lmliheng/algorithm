import { useAuthStore } from '@/store/auth'
import { usePathTagStore } from '@/store/pathTag'
import router from '@/router'

export const loginOut = () => {
    const authStore = useAuthStore()
    const pathTagStore = usePathTagStore()
    localStorage.removeItem('token')

    // pathTagStore.removeAllPathTags()
    authStore.setUserInfo({})
    authStore.setToken('')
    authStore.setTokenTime('')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('pathTag')
   //  localStorage.removeItem('auth')
    router.push('/auth')
}
