<template>
  <article
    class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all group"
  >
    <!-- Imagem -->
    <div class="relative aspect-square overflow-hidden bg-zinc-800">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <span class="text-4xl">💍</span>
      </div>

      <!-- Tag Promoção -->
      <span
        v-if="product.is_promo"
        class="absolute top-3 left-3 bg-gold-500 text-black text-xs font-bold px-2 py-1 rounded-full"
      >
        PROMOÇÃO
      </span>

      <!-- Tag Indisponível -->
      <span
        v-if="product.stock === 0"
        class="absolute top-3 right-3 bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded-full border border-zinc-700"
      >
        Indisponível
      </span>

      <!-- Botão Favoritar -->
      <button
        v-if="auth.isAuthenticated"
        @click.prevent="toggleFavorite"
        class="absolute bottom-3 right-3 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-400 hover:text-red-400 p-2 rounded-full transition-colors"
        :aria-label="isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
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

    <!-- Info -->
    <RouterLink :to="`/product/${product.id}`" class="block p-4">
      <p v-if="product.category" class="text-zinc-600 text-xs uppercase tracking-widest mb-1">
        {{ categoryLabel[product.category] || product.category }}
      </p>
      <h3 class="text-white text-sm font-medium mb-2 line-clamp-2">{{ product.name }}</h3>

      <!-- Preço -->
      <div class="flex items-center gap-2">
        <span v-if="product.is_promo && product.promo_price" class="text-gold-500 font-semibold">
          R$ {{ Number(product.promo_price).toFixed(2).replace('.', ',') }}
        </span>
        <span
          :class="
            product.is_promo && product.promo_price
              ? 'text-zinc-600 line-through text-xs'
              : 'text-white font-semibold'
          "
        >
          R$ {{ Number(product.price).toFixed(2).replace('.', ',') }}
        </span>
      </div>
    </RouterLink>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useFavoritesStore } from '../stores/favorites.js'

const props = defineProps({ product: { type: Object, required: true } })

const auth = useAuthStore()

let favStore
try {
  favStore = useFavoritesStore()
} catch {}

const isFav = computed(() => favStore?.isFavorite(props.product.id) || false)

function toggleFavorite() {
  favStore?.toggle(props.product.id)
}

const categoryLabel = {
  aneis: 'Anéis',
  colares: 'Colares',
  brincos: 'Brincos',
  pulseiras: 'Pulseiras',
}
</script>
