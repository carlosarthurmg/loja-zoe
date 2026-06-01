<template>
  <div class="min-h-screen bg-zinc-950 pt-24 pb-12">
    <Navbar />
    <div class="max-w-6xl mx-auto px-4">
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-2xl font-light text-white tracking-wide">Painel Admin</h1>
        <p class="text-zinc-500 text-sm mt-1">Bem-vinda, {{ auth.user?.name }} ✦</p>
      </div>

      <!-- Cards de resumo -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div
          v-for="card in cards"
          :key="card.label"
          class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
        >
          <p class="text-zinc-500 text-xs mb-2">{{ card.label }}</p>
          <p class="text-white text-2xl font-semibold">{{ card.value }}</p>
        </div>
      </div>

      <!-- Atalhos -->
      <div class="grid md:grid-cols-2 gap-4">
        <RouterLink
          to="/admin/products"
          class="bg-zinc-900 border border-zinc-800 hover:border-gold-500/50 rounded-2xl p-6 transition-colors group"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-2xl"
            >
              💍
            </div>
            <div>
              <h2 class="text-white font-medium group-hover:text-gold-500 transition-colors">
                Gerenciar Produtos
              </h2>
              <p class="text-zinc-500 text-sm">Cadastrar, editar e excluir peças</p>
            </div>
          </div>
        </RouterLink>

        <RouterLink
          to="/admin/orders"
          class="bg-zinc-900 border border-zinc-800 hover:border-gold-500/50 rounded-2xl p-6 transition-colors group"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-2xl"
            >
              📦
            </div>
            <div>
              <h2 class="text-white font-medium group-hover:text-gold-500 transition-colors">
                Gerenciar Pedidos
              </h2>
              <p class="text-zinc-500 text-sm">Aprovar pagamentos e atualizar status</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../../components/Navbar.vue'
import { useAuthStore } from '../../stores/auth.js'
import api from '../../services/api.js'

const auth = useAuthStore()
const cards = ref([
  { label: 'Total de Pedidos', value: '—' },
  { label: 'Aguardando Pagamento', value: '—' },
  { label: 'Produtos Cadastrados', value: '—' },
  { label: 'Pedidos Entregues', value: '—' },
])

onMounted(async () => {
  try {
    const [ordersRes, productsRes] = await Promise.all([
      api.get('/orders/all'),
      api.get('/products'),
    ])
    const orders = ordersRes.data.orders
    const products = productsRes.data.products
    cards.value = [
      { label: 'Total de Pedidos', value: orders.length },
      {
        label: 'Aguardando Pagamento',
        value: orders.filter((o) => o.payment_status === 'pendente').length,
      },
      { label: 'Produtos Cadastrados', value: products.length },
      { label: 'Pedidos Entregues', value: orders.filter((o) => o.status === 'entregue').length },
    ]
  } catch {}
})
</script>
