import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('zoe_cart')) || [])

  const itemCount = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

  function add(product) {
    const existing = items.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    save()
  }

  function remove(productId) {
    items.value = items.value.filter((i) => i.id !== productId)
    save()
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find((i) => i.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) remove(productId)
    }
    save()
  }

  function clear() {
    items.value = []
    save()
  }

  function save() {
    localStorage.setItem('zoe_cart', JSON.stringify(items.value))
  }

  return { items, itemCount, total, add, remove, updateQuantity, clear }
})
