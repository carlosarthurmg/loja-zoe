<template>
  <div class="min-h-screen bg-zinc-950 pt-24 pb-12">
    <Navbar />
    <main class="max-w-4xl mx-auto px-4">
      <h1 class="text-2xl font-light text-white tracking-wide mb-8">Carrinho</h1>

      <!-- Vazio -->
      <div v-if="cart.items.length === 0" class="text-center py-20">
        <p class="text-5xl mb-4">🛍️</p>
        <p class="text-zinc-400 mb-6">Seu carrinho está vazio</p>
        <RouterLink
          to="/catalog"
          class="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Ver catálogo
        </RouterLink>
      </div>

      <div v-else class="grid md:grid-cols-3 gap-6">
        <!-- Itens -->
        <div class="md:col-span-2 flex flex-col gap-4">
          <article
            v-for="item in cart.items"
            :key="item.id"
            class="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-4"
          >
            <!-- Imagem -->
            <div class="w-20 h-20 bg-zinc-800 rounded-xl flex-shrink-0 overflow-hidden">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-2xl">💍</div>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <h3 class="text-white text-sm font-medium truncate">{{ item.name }}</h3>
              <p class="text-gold-500 text-sm font-semibold mt-1">
                R$
                {{
                  Number(item.is_promo && item.promo_price ? item.promo_price : item.price)
                    .toFixed(2)
                    .replace('.', ',')
                }}
              </p>

              <!-- Quantidade -->
              <div class="flex items-center gap-3 mt-3">
                <button
                  @click="cart.updateQuantity(item.id, item.quantity - 1)"
                  class="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm transition-colors"
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>
                <span class="text-white text-sm w-4 text-center">{{ item.quantity }}</span>
                <button
                  @click="cart.updateQuantity(item.id, item.quantity + 1)"
                  class="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm transition-colors"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
                <button
                  @click="cart.remove(item.id)"
                  class="ml-auto text-zinc-600 hover:text-red-400 text-xs transition-colors"
                  aria-label="Remover item"
                >
                  Remover
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Resumo -->
        <aside class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit">
          <h2 class="text-white font-medium mb-4">Resumo</h2>
          <div class="flex justify-between text-sm text-zinc-400 mb-2">
            <span>{{ cart.itemCount }} {{ cart.itemCount === 1 ? 'item' : 'itens' }}</span>
            <span>R$ {{ cart.total.toFixed(2).replace('.', ',') }}</span>
          </div>
          <div class="border-t border-zinc-800 my-4" />
          <div class="flex justify-between text-white font-semibold mb-6">
            <span>Total</span>
            <span class="text-gold-500">R$ {{ cart.total.toFixed(2).replace('.', ',') }}</span>
          </div>
          <RouterLink
            to="/checkout"
            class="block w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold text-center py-3 rounded-xl transition-colors"
          >
            Finalizar pedido
          </RouterLink>
          <RouterLink
            to="/catalog"
            class="block w-full text-center text-zinc-500 hover:text-white text-sm mt-3 transition-colors"
          >
            Continuar comprando
          </RouterLink>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { useCartStore } from '../stores/cart.js'
const cart = useCartStore()
</script>
