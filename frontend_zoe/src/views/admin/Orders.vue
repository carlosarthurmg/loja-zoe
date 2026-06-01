<template>
  <div class="min-h-screen bg-zinc-950 pt-24 pb-12">
    <Navbar />
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-2xl font-light text-white tracking-wide mb-8">Pedidos</h1>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col gap-3">
        <div v-for="n in 4" :key="n" class="bg-zinc-900 rounded-2xl h-24 animate-pulse" />
      </div>

      <!-- Vazio -->
      <div v-else-if="orders.length === 0" class="text-center py-20">
        <p class="text-5xl mb-4">📭</p>
        <p class="text-zinc-400">Nenhum pedido ainda</p>
      </div>

      <!-- Lista -->
      <div v-else class="flex flex-col gap-4">
        <article
          v-for="order in orders"
          :key="order.id"
          class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
        >
          <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <p class="text-zinc-500 text-xs mb-1">
                Pedido #{{ order.id.slice(0, 8).toUpperCase() }}
              </p>
              <p class="text-white text-sm font-medium">{{ order.users?.name }}</p>
              <p class="text-zinc-500 text-xs">{{ order.users?.email }}</p>
              <p class="text-zinc-600 text-xs mt-1">{{ formatDate(order.created_at) }}</p>
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

          <!-- Itens -->
          <div class="flex flex-col gap-1 mb-4">
            <p v-for="item in order.order_items" :key="item.id" class="text-zinc-400 text-xs">
              {{ item.products?.name }} × {{ item.quantity }} — R$
              {{ (Number(item.price) * item.quantity).toFixed(2).replace('.', ',') }}
            </p>
          </div>

          <div
            class="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4"
          >
            <p class="text-gold-500 font-semibold">
              Total: R$ {{ Number(order.total).toFixed(2).replace('.', ',') }}
            </p>

            <!-- Controles de status -->
            <div class="flex flex-wrap gap-2">
              <!-- Aprovar pagamento -->
              <button
                v-if="order.payment_status === 'pendente'"
                @click="updateOrder(order.id, { payment_status: 'aprovado', status: 'pago' })"
                class="bg-green-900/40 hover:bg-green-900/60 border border-green-800 text-green-400 text-xs px-4 py-2 rounded-xl transition-colors"
              >
                ✓ Aprovar pagamento
              </button>

              <!-- Rejeitar pagamento -->
              <button
                v-if="order.payment_status === 'pendente'"
                @click="updateOrder(order.id, { payment_status: 'rejeitado' })"
                class="bg-red-900/40 hover:bg-red-900/60 border border-red-800 text-red-400 text-xs px-4 py-2 rounded-xl transition-colors"
              >
                ✗ Rejeitar
              </button>

              <!-- Marcar como enviado -->
              <button
                v-if="order.status === 'pago'"
                @click="updateOrder(order.id, { status: 'enviado' })"
                class="bg-blue-900/40 hover:bg-blue-900/60 border border-blue-800 text-blue-400 text-xs px-4 py-2 rounded-xl transition-colors"
              >
                📦 Marcar como enviado
              </button>

              <!-- Marcar como entregue -->
              <button
                v-if="order.status === 'enviado'"
                @click="updateOrder(order.id, { status: 'entregue' })"
                class="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs px-4 py-2 rounded-xl transition-colors"
              >
                ✓ Marcar como entregue
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../../components/Navbar.vue'
import api from '../../services/api.js'

const orders = ref([])
const loading = ref(true)

async function fetchOrders() {
  try {
    const { data } = await api.get('/orders/all')
    orders.value = data.orders
  } finally {
    loading.value = false
  }
}

async function updateOrder(id, updates) {
  try {
    await api.put(`/orders/${id}`, updates)
    await fetchOrders()
  } catch {}
}

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

onMounted(fetchOrders)
</script>
