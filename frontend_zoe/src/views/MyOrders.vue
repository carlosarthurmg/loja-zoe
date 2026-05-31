<template>
  <div class="min-h-screen bg-zinc-950 pt-24 pb-12">
    <Navbar />
    <main class="max-w-4xl mx-auto px-4">
      <h1 class="text-2xl font-light text-white tracking-wide mb-8">Meus Pedidos</h1>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col gap-4">
        <div v-for="n in 3" :key="n" class="bg-zinc-900 rounded-2xl h-32 animate-pulse" />
      </div>

      <!-- Vazio -->
      <div v-else-if="orders.length === 0" class="text-center py-20">
        <p class="text-5xl mb-4">📦</p>
        <p class="text-zinc-400 mb-6">Você ainda não fez nenhum pedido</p>
        <RouterLink
          to="/catalog"
          class="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Ver catálogo
        </RouterLink>
      </div>

      <!-- Lista de pedidos -->
      <div v-else class="flex flex-col gap-4">
        <article
          v-for="order in orders"
          :key="order.id"
          class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
        >
          <!-- Cabeçalho do pedido -->
          <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <p class="text-zinc-500 text-xs mb-1">
                Pedido #{{ order.id.slice(0, 8).toUpperCase() }}
              </p>
              <p class="text-zinc-400 text-xs">{{ formatDate(order.created_at) }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                :class="statusClass(order.status)"
                class="text-xs px-3 py-1 rounded-full font-medium"
              >
                {{ statusLabel(order.status) }}
              </span>
              <span
                :class="paymentClass(order.payment_status)"
                class="text-xs px-3 py-1 rounded-full font-medium"
              >
                {{ paymentLabel(order.payment_status) }}
              </span>
            </div>
          </div>

          <!-- Itens do pedido -->
          <div class="flex flex-col gap-2 mb-4">
            <div v-for="item in order.order_items" :key="item.id" class="flex items-center gap-3">
              <div class="w-10 h-10 bg-zinc-800 rounded-lg flex-shrink-0 overflow-hidden">
                <img
                  v-if="item.products?.image"
                  :src="item.products.image"
                  :alt="item.products?.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-sm">💍</div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-white text-sm truncate">{{ item.products?.name }}</p>
                <p class="text-zinc-500 text-xs">
                  Qtd: {{ item.quantity }} · R$
                  {{ Number(item.price).toFixed(2).replace('.', ',') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Total e ação -->
          <div class="flex items-center justify-between border-t border-zinc-800 pt-4">
            <div>
              <p class="text-zinc-500 text-xs">Total</p>
              <p class="text-gold-500 font-semibold">
                R$ {{ Number(order.total).toFixed(2).replace('.', ',') }}
              </p>
            </div>

            <!-- Botão enviar comprovante se pendente -->
            <RouterLink
              v-if="order.payment_status === 'pendente'"
              to="/checkout"
              class="text-xs border border-gold-500/40 text-gold-500 hover:bg-gold-500/10 px-4 py-2 rounded-xl transition-colors"
            >
              Enviar comprovante
            </RouterLink>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import api from '../services/api.js'

const orders = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/orders/my')
    orders.value = data.orders
  } catch {
    orders.value = []
  } finally {
    loading.value = false
  }
})

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function statusLabel(s) {
  return (
    {
      aguardando_pagamento: 'Aguardando pagamento',
      pago: 'Pago',
      enviado: 'Enviado',
      entregue: 'Entregue',
    }[s] || s
  )
}

function paymentLabel(s) {
  return (
    {
      pendente: 'Pagamento pendente',
      aprovado: 'Pagamento aprovado',
      rejeitado: 'Pagamento rejeitado',
    }[s] || s
  )
}

function statusClass(s) {
  return (
    {
      aguardando_pagamento: 'bg-yellow-900/40 text-yellow-400 border border-yellow-800',
      pago: 'bg-green-900/40 text-green-400 border border-green-800',
      enviado: 'bg-blue-900/40 text-blue-400 border border-blue-800',
      entregue: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
    }[s] || 'bg-zinc-800 text-zinc-400'
  )
}

function paymentClass(s) {
  return (
    {
      pendente: 'bg-orange-900/40 text-orange-400 border border-orange-800',
      aprovado: 'bg-green-900/40 text-green-400 border border-green-800',
      rejeitado: 'bg-red-900/40 text-red-400 border border-red-800',
    }[s] || 'bg-zinc-800 text-zinc-400'
  )
}
</script>
