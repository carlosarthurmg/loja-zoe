import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('zoe_user')) || null)
  const token = ref(localStorage.getItem('zoe_token') || null)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function register(name, email, password) {
    const { data } = await api.post('/auth/register', { name, email, password })
    setSession(data.user, data.token)
    return data
  }

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    setSession(data.user, data.token)
    return data
  }

  function setSession(userData, tokenData) {
    user.value = userData
    token.value = tokenData
    localStorage.setItem('zoe_user', JSON.stringify(userData))
    localStorage.setItem('zoe_token', tokenData)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('zoe_user')
    localStorage.removeItem('zoe_token')
  }

  return { user, token, isAuthenticated, isAdmin, register, login, logout }
})
