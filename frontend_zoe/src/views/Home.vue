<template>
  <div class="min-h-screen bg-zinc-950">
    <Navbar />

    <!-- Hero -->
    <section class="relative min-h-screen flex items-center justify-center px-4 pt-16">
      <div class="text-center max-w-2xl mx-auto">
        <p class="text-gold-500 text-xs tracking-[0.4em] uppercase mb-6">Coleção Exclusiva</p>
        <h1 class="text-5xl md:text-7xl font-light text-white tracking-wide mb-6">ZOE</h1>
        <p class="text-zinc-400 text-lg font-light mb-10 leading-relaxed">
          Joias artesanais que contam histórias.<br />
          Cada peça criada com amor e dedicação.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink
            to="/catalog"
            class="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-8 py-4 rounded-xl transition-colors text-sm tracking-wide"
          >
            Ver Coleção
          </RouterLink>
          <RouterLink
            to="/about"
            class="border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white px-8 py-4 rounded-xl transition-colors text-sm"
          >
            Nossa História
          </RouterLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
      >
        <div class="w-px h-8 bg-zinc-700" />
        <p class="text-zinc-600 text-xs tracking-widest">EXPLORAR</p>
      </div>
    </section>

    <!-- Categorias -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-light text-white tracking-wide mb-2">Categorias</h2>
          <p class="text-zinc-500 text-sm">Encontre a peça perfeita para você</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <RouterLink
            v-for="cat in categories"
            :key="cat.value"
            :to="`/catalog?category=${cat.value}`"
            class="bg-zinc-900 border border-zinc-800 hover:border-gold-500/50 rounded-2xl p-6 text-center transition-all group"
          >
            <p class="text-3xl mb-3">{{ cat.icon }}</p>
            <p class="text-white text-sm font-medium group-hover:text-gold-500 transition-colors">
              {{ cat.label }}
            </p>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Produtos em destaque -->
    <section class="py-20 px-4 bg-zinc-900/30">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-2xl font-light text-white tracking-wide mb-1">Em Destaque</h2>
            <p class="text-zinc-500 text-sm">Peças mais amadas da coleção</p>
          </div>
          <RouterLink
            to="/catalog"
            class="text-gold-500 hover:text-gold-400 text-sm transition-colors"
          >
            Ver todas →
          </RouterLink>
        </div>

        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="n in 4"
            :key="n"
            class="bg-zinc-900 rounded-2xl aspect-square animate-pulse"
          />
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProductCard v-for="product in featured" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Promoções -->
    <section v-if="promos.length > 0" class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-2xl font-light text-white tracking-wide mb-1">Promoções</h2>
            <p class="text-zinc-500 text-sm">Aproveite os preços especiais</p>
          </div>
          <RouterLink
            to="/catalog"
            class="text-gold-500 hover:text-gold-400 text-sm transition-colors"
          >
            Ver todas →
          </RouterLink>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProductCard v-for="product in promos" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Banner PIX -->
    <section class="py-20 px-4 bg-zinc-900/30">
      <div class="max-w-2xl mx-auto text-center">
        <p class="text-3xl mb-4">✦</p>
        <h2 class="text-2xl font-light text-white mb-4">Pagamento Simples e Seguro</h2>
        <p class="text-zinc-400 text-sm leading-relaxed mb-8">
          Aceitamos pagamento via PIX. Rápido, seguro e sem complicações. Faça seu pedido e envie o
          comprovante pelo site, WhatsApp ou Instagram.
        </p>
        <div class="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <span class="flex items-center gap-2">✓ Pagamento via PIX</span>
          <span class="flex items-center gap-2">✓ Entrega para todo Brasil</span>
          <span class="flex items-center gap-2">✓ Peças artesanais</span>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-zinc-800 py-12 px-4">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-center md:text-left">
          <p class="text-gold-500 text-xl font-light tracking-[0.3em]">ZOE</p>
          <p class="text-zinc-600 text-xs mt-1">Joias artesanais com amor</p>
        </div>
        <div class="flex gap-6 text-sm text-zinc-500">
          <RouterLink to="/catalog" class="hover:text-white transition-colors">Catálogo</RouterLink>
          <RouterLink to="/about" class="hover:text-white transition-colors">Sobre</RouterLink>
          <a
            href="https://instagram.com/zoe.oficial__"
            target="_blank"
            class="hover:text-white transition-colors"
            >Instagram</a
          >
        </div>
        <p class="text-zinc-700 text-xs">© 2025 Zoe Joias</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import ProductCard from '../components/ProductCard.vue'
import api from '../services/api.js'

const featured = ref([])
const promos = ref([])
const loading = ref(true)

const categories = [
  { value: 'aneis', label: 'Anéis', icon: '💍' },
  { value: 'colares', label: 'Colares', icon: '📿' },
  { value: 'brincos', label: 'Brincos', icon: '✨' },
  { value: 'pulseiras', label: 'Pulseiras', icon: '⭕' },
]

onMounted(async () => {
  try {
    const { data } = await api.get('/products')
    const all = data.products
    featured.value = all.slice(0, 4)
    promos.value = all.filter((p) => p.is_promo).slice(0, 4)
  } catch {
    featured.value = []
  } finally {
    loading.value = false
  }
})
</script>
