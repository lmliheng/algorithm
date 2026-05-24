import { api } from './useAxiosConfig'
import md5 from 'md5'
export const login = (account, password) => api({
    url: '/sys/login',
    method: 'post',
    data: {
        username: account,
        password: md5(password)
    }
})

export const requestUserInfo = () => api({
    url: '/sys/profile',
    method: 'get'
})


export const requestUser = () => api({
    url: '/user-manage/list',
    method: 'get'
})

export const requestUserDetail = (id) => api({
    // _id
    url: `/user-manage/detail/${id}`,
    method: 'get'
})


export const requestRoleList = () => api({
    url: `/role/list`,
    method: 'get'
})

export const requestPermissionList = () => api({
    url: `/permission/list`,
    method: 'get'
})


export const requestArticleList = () => api({
    url: `/article/list`,
    method: 'get'
})