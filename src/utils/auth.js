import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const NameKey = 'vue_admin_template_name'
const UserKey = 'vue_admin_template_user'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(Name) {
  return Cookies.set(NameKey, Name)
}

export function removeName() {
  return Cookies.remove(NameKey)
}

export function getUser() {
  return Cookies.get(UserKey)
}

export function setUser(User) {
  return Cookies.set(UserKey, User)
}

export function removeUser() {
  return Cookies.remove(UserKey)
}
