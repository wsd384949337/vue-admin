import request from '@/utils/request'

export function getLabels(type, userId, url) {
  return request({
    url: '/union/unionLabel/getLabels',
    method: 'get'
  })
}

export function removeLabel(data) {
  return request({
    url: '/union/unionLabel/removeLabel',
    method: 'post',
    data
  })
}

export function addLabel(data) {
  return request({
    url: '/union/unionLabel/addLabel',
    method: 'post',
    data
  })
}

export function updateLabel(data) {
  return request({
    url: '/union/unionLabel/updateLabel',
    method: 'post',
    data
  })
}
