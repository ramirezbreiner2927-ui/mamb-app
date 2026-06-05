// src/lib/store.js
import { create } from 'zustand'
import api from './api'

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('mamb_token'),
  loading: true,

  init: async () => {
    const token = localStorage.getItem('mamb_token')
    if (!token) return set({ loading: false })
    try {
      const { data } = await api.get('/auth/me')
      set({ user: data, token, loading: false })
    } catch {
      localStorage.removeItem('mamb_token')
      set({ user: null, token: null, loading: false })
    }
  },

  // Solo para admin
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('mamb_token', data.token)
    set({ user: data.user, token: data.token })
    return data.user
  },

  // Registro anónimo para visitantes de la sección Kids
  // No requiere email ni contraseña — solo nombre (y opcionalmente edad)
  anonymousRegister: async (name, age) => {
    const { data } = await api.post('/auth/anonymous', { name, age })
    // Guardamos el token en sessionStorage (no persiste entre sesiones)
    sessionStorage.setItem('mamb_anon_token', data.token)
    localStorage.setItem('mamb_token', data.token)
    set({ user: data.user, token: data.token })
    return data.user
  },

  logout: () => {
    localStorage.removeItem('mamb_token')
    sessionStorage.removeItem('mamb_anon_token')
    set({ user: null, token: null })
  }
}))
