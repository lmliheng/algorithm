import { useAuthStore } from '@/store/auth'
import { requestUserInfo } from './useRequest'

export const checkUserinfo = async () => {
    const authStore = useAuthStore()
    if (!localStorage.getItem('token')) {
        return false
    }
    try {
        const res = await requestUserInfo()
        authStore.setUserInfo(res)
        return true
    } catch (error) {
        return false
    }
}
