<template>
  <div class="min-h-screen bg-zinc-950 pt-24 pb-12">
    <Navbar />
    <main class="max-w-5xl mx-auto px-4">
      <!-- Loading -->
      <div v-if="loading" class="grid md:grid-cols-2 gap-8">
        <div class="aspect-square bg-zinc-900 rounded-2xl animate-pulse" />
        <div class="flex flex-col gap-4">
          <div class="h-8 bg-zinc-900 rounded-xl animate-pulse" />
          <div class="h-4 bg-zinc-900 rounded-xl animate-pulse w-1/2" />
          <div class="h-20 bg-zinc-900 rounded-xl animate-pulse" />
        </div>
      </div>

      <!-- Produto -->
      <div v-else-if="product" class="grid md:grid-cols-2 gap-8">
        <!-- Imagem -->
        <div class="aspect-square bg-zinc-900 rounded-2xl overflow-hidden relative">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-8xl">💍</div>

          <span
            v-if="product.is_promo"
            class="absolute top-4 left-4 bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full"
          >
            PROMOÇÃO
          </span>
          <span
            v-if="product.stock === 0"
            class="absolute top-4 right-4 bg-zinc-800 text-zinc-400 text-xs px-3 py-1 rounded-full border border-zinc-700"
          >
            Indisponível
          </span>
        </div>

        <!-- Info -->
        <div class="flex flex-col">
          <p v-if="product.category" class="text-zinc-500 text-xs uppercase tracking-widest mb-2">
            {{ categoryLabel[product.category] }}
          </p>
          <h1 class="text-white text-2xl font-light mb-4">{{ product.name }}</h1>

          <!-- Preço -->
          <div class="flex items-center gap-3 mb-6">
            <span
              v-if="product.is_promo && product.promo_price"
              class="text-gold-500 text-3xl font-semibold"
            >
              R$ {{ Number(product.promo_price).toFixed(2).replace('.', ',') }}
            </span>
            <span
              :class="
                product.is_promo && product.promo_price
                  ? 'text-zinc-600 line-through text-lg'
                  : 'text-white text-3xl font-semibold'
              "
            >
              R$ {{ Number(product.price).toFixed(2).replace('.', ',') }}
            </span>
          </div>

          <!-- Descrição -->
          <p v-if="product.description" class="text-zinc-400 text-sm leading-relaxed mb-6">
            {{ product.description }}
          </p>

          <!-- Detalhes -->
          <div class="flex flex-col gap-2 mb-6">
            <div
              v-if="product.material"
              class="flex justify-between text-sm border-b border-zinc-800 pb-2"
            >
              <span class="text-zinc-500">Material</span>
              <span class="text-white">{{ product.material }}</span>
            </div>
            <div
              v-if="product.size"
              class="flex justify-between text-sm border-b border-zinc-800 pb-2"
            >
              <span class="text-zinc-500">Tamanhos</span>
              <span class="text-white">{{ product.size }}</span>
            </div>
            <div class="flex justify-between text-sm border-b border-zinc-800 pb-2">
              <span class="text-zinc-500">Disponibilidade</span>
              <span :class="product.stock > 0 ? 'text-green-400' : 'text-red-400'">
                {{ product.stock > 0 ? `${product.stock} em estoque` : 'Indisponível' }}
              </span>
            </div>
          </div>

          <!-- Ações -->
          <div class="flex gap-3 mt-auto">
            <button
              v-if="product.stock > 0"
              @click="addToCart"
              class="flex-1 bg-gold-500 hover:bg-gold-600 text-black font-semibold py-4 rounded-xl transition-colors"
            >
              {{ added ? '✓ Adicionado!' : 'Adicionar ao carrinho' }}
            </button>
            <p
              v-else
              class="flex-1 text-center text-zinc-600 py-4 border border-zinc-800 rounded-xl text-sm"
            >
              Indisponível no momento
            </p>

            <button
              v-if="auth.isAuthenticated"
              @click="toggleFav"
              class="border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-red-400 p-4 rounded-xl transition-colors"
              :aria-label="isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                :fill="isFav ? 'currentColor' : 'none'"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <!-- Voltar -->
          <RouterLink
            to="/catalog"
            class="text-center text-zinc-600 hover:text-zinc-400 text-sm mt-4 transition-colors"
          >
            ← Voltar ao catálogo
          </RouterLink>
        </div>
      </div>

      <!-- Não encontrado -->
      <div v-else class="text-center py-20">
        <p class="text-5xl mb-4">🔍</p>
        <p class="text-zinc-400">Produto não encontrado</p>
        <RouterLink to="/catalog" class="text-gold-500 text-sm mt-4 block"
          >Voltar ao catálogo</RouterLink
        >
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import { useAuthStore } from '../stores/auth.js'
import { useCartStore } from '../stores/cart.js'
import { useFavoritesStore } from '../stores/favorites.js'
import api from '../services/api.js'

const route = useRoute()
const auth = useAuthStore()
const cart = useCartStore()
const favStore = useFavoritesStore()

const product = ref(null)
const loading = ref(true)
const added = ref(false)

const isFav = computed(() => favStore.isFavorite(route.params.id))

const categoryLabel = {
  aneis: 'Anéis',
  colares: 'Colares',
  brincos: 'Brincos',
  pulseiras: 'Pulseiras',
}

function addToCart() {
  cart.add(product.value)
  added.value = true
  setTimeout(() => (added.value = false), 2000)
}

function toggleFav() {
  favStore.toggle(product.value.id)
}

onMounted(async () => {
  try {
    const { data } = await api.get(`/products/${route.params.id}`)
    product.value = data.product
  } catch {
    product.value = null
  } finally {
    loading.value = false
  }
})
</script>
