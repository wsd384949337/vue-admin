import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/union/union/loginUnion',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/union/unionUser/getLoginInfo',
    method: 'get',
    params: { 'X-Token': token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
