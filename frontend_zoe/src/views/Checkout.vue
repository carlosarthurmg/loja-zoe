<template>
  <div class="min-h-screen bg-zinc-950 pt-24 pb-12">
    <Navbar />
    <main class="max-w-2xl mx-auto px-4">
      <h1 class="text-2xl font-light text-white tracking-wide mb-8">Finalizar Pedido</h1>

      <!-- Sucesso -->
      <div
        v-if="orderPlaced"
        class="bg-zinc-900 border border-green-800 rounded-2xl p-8 text-center"
      >
        <p class="text-4xl mb-4">✅</p>
        <h2 class="text-white text-xl font-medium mb-2">Pedido realizado!</h2>
        <p class="text-zinc-400 text-sm mb-6">
          Envie o comprovante PIX para confirmar o pagamento.
        </p>
        <RouterLink
          to="/orders"
          class="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Ver meus pedidos
        </RouterLink>
      </div>

      <div v-else>
        <!-- Resumo do pedido -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 class="text-white font-medium mb-4">Resumo</h2>
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="flex justify-between text-sm text-zinc-400 mb-2"
          >
            <span>{{ item.name }} × {{ item.quantity }}</span>
            <span
              >R$
              {{
                (
                  Number(item.is_promo && item.promo_price ? item.promo_price : item.price) *
                  item.quantity
                )
                  .toFixed(2)
                  .replace('.', ',')
              }}</span
            >
          </div>
          <div class="border-t border-zinc-800 mt-4 pt-4 flex justify-between font-semibold">
            <span class="text-white">Total</span>
            <span class="text-gold-500">R$ {{ cart.total.toFixed(2).replace('.', ',') }}</span>
          </div>
        </div>

        <!-- PIX -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 class="text-white font-medium mb-4">Pagamento via PIX</h2>
          <p class="text-zinc-400 text-sm mb-4">
            Após confirmar o pedido, realize o PIX e envie o comprovante abaixo.
          </p>

          <!-- Chave PIX -->
          <div class="bg-zinc-800 rounded-xl p-4 mb-4">
            <p class="text-zinc-500 text-xs mb-1">Chave PIX (Celular)</p>
            <div class="flex items-center justify-between gap-3">
              <p class="text-white font-mono text-sm">{{ pixKey }}</p>
              <button
                @click="copyPix"
                class="text-gold-500 hover:text-gold-400 text-xs border border-gold-500/30 px-3 py-1 rounded-lg transition-colors"
              >
                {{ copied ? 'Copiado!' : 'Copiar' }}
              </button>
            </div>
          </div>

          <p class="text-zinc-500 text-xs">Titular: Raissa Moraes</p>
        </div>

        <!-- Comprovante -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 class="text-white font-medium mb-4">Enviar Comprovante</h2>

          <!-- Upload -->
          <div class="mb-4">
            <label class="block text-zinc-400 text-sm mb-2">Upload pelo site</label>
            <input
              type="file"
              accept="image/*,.pdf"
              @change="handleFile"
              class="w-full text-zinc-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 file:cursor-pointer cursor-pointer"
            />
            <p v-if="fileName" class="text-green-400 text-xs mt-2">✓ {{ fileName }}</p>
          </div>

          <div class="flex items-center gap-3 my-4">
            <div class="flex-1 border-t border-zinc-800" />
            <span class="text-zinc-600 text-xs">ou envie por</span>
            <div class="flex-1 border-t border-zinc-800" />
          </div>

          <!-- WhatsApp e Instagram -->
          <div class="grid grid-cols-2 gap-3">
            <a
              :href="`https://wa.me/5586999282904?text=Olá! Segue o comprovante do meu pedido.`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 bg-green-900/40 hover:bg-green-900/60 border border-green-800 text-green-400 text-sm py-3 rounded-xl transition-colors"
            >
              <span>📱</span> WhatsApp
            </a>
            <a
              href="https://instagram.com/zoe.oficial__"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 bg-pink-900/40 hover:bg-pink-900/60 border border-pink-800 text-pink-400 text-sm py-3 rounded-xl transition-colors"
            >
              <span>📸</span> Instagram
            </a>
          </div>
        </div>

        <!-- Erro -->
        <div
          v-if="error"
          role="alert"
          class="bg-red-950 border border-red-800 text-red-300 text-sm rounded-xl px-4 py-3 mb-4"
        >
          {{ error }}
        </div>

        <!-- Botão confirmar -->
        <button
          @click="placeOrder"
          :disabled="loading"
          class="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-xl transition-colors text-lg"
        >
          {{ loading ? 'Processando...' : 'Confirmar Pedido' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import { useCartStore } from '../stores/cart.js'
import api from '../services/api.js'

const cart = useCartStore()
const router = useRouter()

const pixKey = '86999282904'
const copied = ref(false)
const fileName = ref('')
const loading = ref(false)
const error = ref('')
const orderPlaced = ref(false)

function copyPix() {
  navigator.clipboard.writeText(pixKey)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function handleFile(e) {
  const file = e.target.files[0]
  if (file) fileName.value = file.name
}

async function placeOrder() {
  if (cart.items.length === 0) return
  error.value = ''
  loading.value = true
  try {
    const items = cart.items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.is_promo && item.promo_price ? item.promo_price : item.price,
    }))
    await api.post('/orders', { items, total: cart.total })
    cart.clear()
    orderPlaced.value = true
  } catch (err) {
    error.value = err.response?.data?.error || 'Erro ao criar pedido'
  } finally {
    loading.value = false
  }
}
</script>
