<template>
  <div class="min-h-screen bg-zinc-950 pt-24 pb-12">
    <Navbar />

    <main class="max-w-6xl mx-auto px-4">
      <!-- Título -->
      <div class="mb-8">
        <h1 class="text-2xl font-light text-white tracking-wide">Catálogo</h1>
        <p class="text-zinc-500 text-sm mt-1">{{ products.length }} peças encontradas</p>
      </div>

      <!-- Filtros -->
      <div class="flex flex-wrap gap-3 mb-8">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="selectedCategory = cat.value"
          :class="
            selectedCategory === cat.value
              ? 'bg-gold-500 text-black'
              : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
          "
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Busca -->
      <div class="mb-8">
        <input
          v-model="search"
          type="search"
          placeholder="Buscar peças..."
          class="w-full max-w-md bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-gold-500 transition-colors"
        />
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="n in 8" :key="n" class="bg-zinc-900 rounded-2xl aspect-square animate-pulse" />
      </div>

      <!-- Grid de Produtos -->
      <div
        v-else-if="products.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>

      <!-- Vazio -->
      <div v-else class="text-center py-20">
        <p class="text-5xl mb-4">💍</p>
        <p class="text-zinc-400">Nenhuma peça encontrada</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import ProductCard from '../components/ProductCard.vue'
import api from '../services/api.js'

const products = ref([])
const loading = ref(true)
const search = ref('')
const selectedCategory = ref('')
const route = useRoute()

const categories = [
  { value: '', label: 'Todos' },
  { value: 'aneis', label: 'Anéis' },
  { value: 'colares', label: 'Colares' },
  { value: 'brincos', label: 'Brincos' },
  { value: 'pulseiras', label: 'Pulseiras' },
]

async function fetchProducts() {
  loading.value = true
  try {
    const params = {}
    if (selectedCategory.value) params.category = selectedCategory.value
    if (search.value) params.search = search.value
    const { data } = await api.get('/products', { params })
    products.value = data.products
  } catch {
    products.value = []
  } finally {
    loading.value = false
  }
}

watch([selectedCategory, search], () => fetchProducts())
onMounted(() => fetchProducts())
</script>
