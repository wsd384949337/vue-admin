import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/union/union/loginUnion',
    method: 'post',
    data
  })
}

export function getInfo(userId) {
  return request({
    url: '/union/unionUser/getLoginInfo?userId=' + userId,
    method: 'get',
    // params: { 'userId': token }
  })
}

export function getUnionMemberCount(userId) {
  return request({
    url: '/union/unionUser/getUnionMemberCount?unionId=' + userId,
    method: 'get',
    // params: { 'userId': token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
