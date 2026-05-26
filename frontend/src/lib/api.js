// src/lib/api.js
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:4000/api' })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('mamb_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('mamb_token')
      window.location.href = '/mamb-admin-login'
    }
    return Promise.reject(err)
  }
)

export default api