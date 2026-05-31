import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api.js'

export const useFavoritesStore = defineStore('favorites', () => {
  const ids = ref([])

  async function load() {
    try {
      const { data } = await api.get('/favorites')
      ids.value = data.favorites.map((f) => f.product_id)
    } catch {}
  }

  function isFavorite(productId) {
    return ids.value.includes(productId)
  }

  async function toggle(productId) {
    if (isFavorite(productId)) {
      ids.value = ids.value.filter((id) => id !== productId)
      try {
        await api.delete(`/favorites/${productId}`)
      } catch {}
    } else {
      ids.value.push(productId)
      try {
        await api.post('/favorites', { product_id: productId })
      } catch {}
    }
  }

  return { ids, load, isFavorite, toggle }
})
