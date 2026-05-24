import { useAuthStore } from '@/store/auth'

export const checkUserInfo = () => {
    const authStore = useAuthStore()
    return authStore.userInfo == null ? false : true
}