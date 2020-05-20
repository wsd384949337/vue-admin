import request from '@/utils/request'

export function getUnionApplys(type, url) {
  return request({
    url: '/union/unionApply/getUnionApplys?applyType=' + type + '&' + url,
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

export function audit(data) {
  return request({
    url: '/union/unionApply/audit',
    method: 'post',
    data
  })
}
