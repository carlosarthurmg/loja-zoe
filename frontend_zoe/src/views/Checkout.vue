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
        <!-- Resumo -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 class="text-white font-medium mb-4">Resumo do pedido</h2>
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

        <!-- Dados do cliente -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 class="text-white font-medium mb-4">Seus dados</h2>
          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-zinc-400 text-sm mb-2">Nome completo *</label>
              <input
                v-model="form.customer_name"
                type="text"
                placeholder="Seu nome completo"
                class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div>
              <label class="block text-zinc-400 text-sm mb-2">WhatsApp *</label>
              <input
                v-model="form.customer_phone"
                type="tel"
                placeholder="(00) 00000-0000"
                class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <!-- Endereço -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 class="text-white font-medium mb-4">Endereço de entrega</h2>
          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-zinc-400 text-sm mb-2">CEP *</label>
              <input
                v-model="form.address_zip"
                type="text"
                placeholder="00000-000"
                maxlength="9"
                @input="fetchCep"
                class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
              <p v-if="cepLoading" class="text-zinc-500 text-xs mt-1">Buscando CEP...</p>
              <p v-if="cepError" class="text-red-400 text-xs mt-1">{{ cepError }}</p>
            </div>
            <div>
              <label class="block text-zinc-400 text-sm mb-2">Rua *</label>
              <input
                v-model="form.address_street"
                type="text"
                placeholder="Nome da rua"
                class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-zinc-400 text-sm mb-2">Número *</label>
                <input
                  v-model="form.address_number"
                  type="text"
                  placeholder="123"
                  class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-zinc-400 text-sm mb-2">Complemento</label>
                <input
                  v-model="form.address_complement"
                  type="text"
                  placeholder="Apto, bloco..."
                  class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label class="block text-zinc-400 text-sm mb-2">Bairro</label>
              <input
                v-model="form.address_neighborhood"
                type="text"
                placeholder="Bairro"
                class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-zinc-400 text-sm mb-2">Cidade *</label>
                <input
                  v-model="form.address_city"
                  type="text"
                  placeholder="Cidade"
                  class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-zinc-400 text-sm mb-2">Estado</label>
                <input
                  v-model="form.address_state"
                  type="text"
                  placeholder="UF"
                  maxlength="2"
                  class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- PIX -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 class="text-white font-medium mb-4">Pagamento via PIX</h2>
          <p class="text-zinc-400 text-sm mb-4">
            Após confirmar o pedido, realize o PIX e envie o comprovante.
          </p>
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
          <div class="grid grid-cols-2 gap-3">
            <a
              :href="`https://wa.me/5586999282904?text=Olá! Segue o comprovante do meu pedido.`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 bg-green-900/40 hover:bg-green-900/60 border border-green-800 text-green-400 text-sm py-3 rounded-xl transition-colors"
            >
              📱 WhatsApp
            </a>
            <a
              href="https://instagram.com/zoe.oficial__"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 bg-pink-900/40 hover:bg-pink-900/60 border border-pink-800 text-pink-400 text-sm py-3 rounded-xl transition-colors"
            >
              📸 Instagram
            </a>
          </div>
        </div>

        <!-- Termos -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              v-model="acceptedTerms"
              type="checkbox"
              class="mt-1 w-4 h-4 accent-yellow-500 cursor-pointer flex-shrink-0"
            />
            <span class="text-zinc-400 text-sm leading-relaxed">
              Li e aceito os
              <RouterLink to="/terms" class="text-gold-500 hover:text-gold-400 underline"
                >Termos de Uso</RouterLink
              >
              e a
              <RouterLink to="/privacy" class="text-gold-500 hover:text-gold-400 underline"
                >Política de Privacidade</RouterLink
              >
              da Zoe Acessórios.
            </span>
          </label>
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
          :disabled="loading || !acceptedTerms"
          class="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-xl transition-colors text-lg"
        >
          {{ loading ? 'Processando...' : 'Confirmar Pedido' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import { useCartStore } from '../stores/cart.js'
import { useAuthStore } from '../stores/auth.js'
import api from '../services/api.js'

const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()

const pixKey = '86999282904'
const copied = ref(false)
const fileName = ref('')
const loading = ref(false)
const error = ref('')
const orderPlaced = ref(false)
const acceptedTerms = ref(false)
const cepLoading = ref(false)
const cepError = ref('')

const form = reactive({
  customer_name: auth.user?.name || '',
  customer_phone: '',
  address_zip: '',
  address_street: '',
  address_number: '',
  address_complement: '',
  address_neighborhood: '',
  address_city: '',
  address_state: '',
})

function copyPix() {
  navigator.clipboard.writeText(pixKey)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function handleFile(e) {
  const file = e.target.files[0]
  if (file) fileName.value = file.name
}

async function fetchCep() {
  const cep = form.address_zip.replace(/\D/g, '')
  if (cep.length !== 8) return
  cepLoading.value = true
  cepError.value = ''
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await res.json()
    if (data.erro) {
      cepError.value = 'CEP não encontrado'
      return
    }
    form.address_street = data.logradouro || ''
    form.address_neighborhood = data.bairro || ''
    form.address_city = data.localidade || ''
    form.address_state = data.uf || ''
  } catch {
    cepError.value = 'Erro ao buscar CEP'
  } finally {
    cepLoading.value = false
  }
}

async function placeOrder() {
  if (cart.items.length === 0) return
  if (!form.customer_name || !form.customer_phone) {
    error.value = 'Preencha seu nome e WhatsApp'
    return
  }
  if (!form.address_street || !form.address_number || !form.address_city || !form.address_zip) {
    error.value = 'Preencha o endereço completo'
    return
  }
  if (!acceptedTerms.value) {
    error.value = 'Você precisa aceitar os termos para continuar'
    return
  }

  error.value = ''
  loading.value = true
  try {
    const items = cart.items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.is_promo && item.promo_price ? item.promo_price : item.price,
    }))
    await api.post('/orders', { items, total: cart.total, ...form })
    cart.clear()
    orderPlaced.value = true
  } catch (err) {
    error.value = err.response?.data?.error || 'Erro ao criar pedido'
  } finally {
    loading.value = false
  }
}
</script>
