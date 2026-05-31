<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur border-b border-zinc-800"
  >
    <nav
      class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"
      aria-label="Navegação principal"
    >
      <!-- Logo -->
      <RouterLink to="/" class="text-gold-500 text-xl font-light tracking-[0.3em]">ZOE</RouterLink>

      <!-- Menu Desktop -->
      <ul class="hidden md:flex items-center gap-6 list-none">
        <li>
          <RouterLink to="/" class="text-zinc-400 hover:text-white text-sm transition-colors"
            >Início</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/catalog" class="text-zinc-400 hover:text-white text-sm transition-colors"
            >Catálogo</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/about" class="text-zinc-400 hover:text-white text-sm transition-colors"
            >Sobre</RouterLink
          >
        </li>
      </ul>

      <!-- Ações -->
      <div class="flex items-center gap-3">
        <!-- Favoritos -->
        <RouterLink
          v-if="auth.isAuthenticated"
          to="/favorites"
          class="text-zinc-400 hover:text-gold-500 transition-colors p-2"
          aria-label="Meus favoritos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
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
        </RouterLink>

        <!-- Carrinho -->
        <RouterLink
          to="/cart"
          class="relative text-zinc-400 hover:text-gold-500 transition-colors p-2"
          aria-label="Carrinho de compras"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-gold-500 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </RouterLink>

        <!-- Admin -->
        <RouterLink
          v-if="auth.isAdmin"
          to="/admin"
          class="text-zinc-400 hover:text-gold-500 transition-colors p-2 text-xs border border-zinc-700 rounded-lg px-3"
          aria-label="Painel administrativo"
        >
          Admin
        </RouterLink>

        <!-- Usuário logado -->
        <div v-if="auth.isAuthenticated" class="relative">
          <button
            @click="menuOpen = !menuOpen"
            class="text-zinc-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
            :aria-expanded="menuOpen"
            aria-haspopup="true"
          >
            <span class="hidden sm:block">{{ auth.user?.name?.split(' ')[0] }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            v-if="menuOpen"
            class="absolute right-0 mt-2 w-44 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden"
          >
            <RouterLink
              to="/orders"
              @click="menuOpen = false"
              class="block px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              Meus Pedidos
            </RouterLink>
            <button
              @click="handleLogout"
              class="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-zinc-800 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        <!-- Não logado -->
        <RouterLink
          v-else
          to="/login"
          class="bg-gold-500 hover:bg-gold-600 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Entrar
        </RouterLink>

        <!-- Menu Mobile -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="md:hidden text-zinc-400 hover:text-white p-2"
          :aria-expanded="mobileOpen"
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Menu Mobile Aberto -->
    <div v-if="mobileOpen" class="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4">
      <ul class="flex flex-col gap-4 list-none">
        <li>
          <RouterLink
            to="/"
            @click="mobileOpen = false"
            class="text-zinc-400 hover:text-white text-sm"
            >Início</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/catalog"
            @click="mobileOpen = false"
            class="text-zinc-400 hover:text-white text-sm"
            >Catálogo</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/about"
            @click="mobileOpen = false"
            class="text-zinc-400 hover:text-white text-sm"
            >Sobre</RouterLink
          >
        </li>
        <li v-if="auth.isAuthenticated">
          <RouterLink
            to="/orders"
            @click="mobileOpen = false"
            class="text-zinc-400 hover:text-white text-sm"
            >Meus Pedidos</RouterLink
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useCartStore } from '../stores/cart.js'

const auth = useAuthStore()
const router = useRouter()
const menuOpen = ref(false)
const mobileOpen = ref(false)

let cartStore
try {
  cartStore = useCartStore()
} catch {}
const cartCount = computed(() => cartStore?.itemCount || 0)

function handleLogout() {
  auth.logout()
  menuOpen.value = false
  router.push('/login')
}
</script>
