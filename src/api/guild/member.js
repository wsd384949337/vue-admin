import request from '@/utils/request'

export function getUionUsers(url) {
  return request({
    url: '/union/unionUser/getUionUsers?' + url,
    method: 'get'
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

export function deleteUser(data) {
  return request({
    url: '/union/unionUser/delete',
    method: 'post',
    data
  })
}

export function bindLabel(data) {
  return request({
    url: '/union/unionUser/bindLabel',
    method: 'post',
    data
  })
}
