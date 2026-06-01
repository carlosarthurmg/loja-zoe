<template>
  <div class="min-h-screen bg-zinc-950 pt-24 pb-12">
    <Navbar />
    <main class="max-w-6xl mx-auto px-4">
      <h1 class="text-2xl font-light text-white tracking-wide mb-8">Meus Favoritos</h1>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="n in 4" :key="n" class="bg-zinc-900 rounded-2xl aspect-square animate-pulse" />
      </div>

      <!-- Vazio -->
      <div v-else-if="products.length === 0" class="text-center py-20">
        <p class="text-5xl mb-4">🤍</p>
        <p class="text-zinc-400 mb-6">Você ainda não favoritou nenhuma peça</p>
        <RouterLink
          to="/catalog"
          class="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Ver catálogo
        </RouterLink>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import ProductCard from '../components/ProductCard.vue'
import api from '../services/api.js'

const products = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/favorites')
    products.value = data.favorites.map((f) => f.products)
  } catch {
    products.value = []
  } finally {
    loading.value = false
  }
})
</script>
