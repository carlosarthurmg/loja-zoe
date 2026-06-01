<template>
  <div class="min-h-screen bg-zinc-950 pt-24 pb-12">
    <Navbar />
    <main class="max-w-2xl mx-auto px-4">
      <!-- Cabeçalho -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-light tracking-[0.3em] text-gold-500 mb-2">ZOE</h1>
        <p class="text-zinc-500 text-sm tracking-widest">JOIAS ARTESANAIS</p>
      </div>

      <!-- História -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-6">
        <h2 class="text-white font-medium text-lg mb-4">Nossa História</h2>
        <p class="text-zinc-400 text-sm leading-relaxed mb-4">
          A Zoe nasceu do amor por peças únicas e artesanais. Cada joia é criada com dedicação,
          usando materiais de qualidade como prata 925 e banho de ouro 18k.
        </p>
        <p class="text-zinc-400 text-sm leading-relaxed">
          Nosso objetivo é que cada cliente se sinta especial com uma peça que conta uma história —
          a sua história.
        </p>
      </div>

      <!-- Contato -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-6">
        <h2 class="text-white font-medium text-lg mb-6">Contato</h2>
        <div class="flex flex-col gap-4">
          <a
            href="https://wa.me/5586999282904"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 bg-green-900/20 hover:bg-green-900/40 border border-green-900/50 rounded-xl p-4 transition-colors"
          >
            <span class="text-2xl">📱</span>
            <div>
              <p class="text-white text-sm font-medium">WhatsApp</p>
              <p class="text-zinc-400 text-xs">(86) 99928-2904</p>
            </div>
          </a>
          <a
            href="https://instagram.com/zoe.oficial__"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 bg-pink-900/20 hover:bg-pink-900/40 border border-pink-900/50 rounded-xl p-4 transition-colors"
          >
            <span class="text-2xl">📸</span>
            <div>
              <p class="text-white text-sm font-medium">Instagram</p>
              <p class="text-zinc-400 text-xs">@zoe.oficial__</p>
            </div>
          </a>
        </div>
      </div>

      <!-- Diferenciais -->
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="item in diferenciais"
          :key="item.title"
          class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center"
        >
          <p class="text-2xl mb-2">{{ item.icon }}</p>
          <p class="text-white text-sm font-medium mb-1">{{ item.title }}</p>
          <p class="text-zinc-500 text-xs">{{ item.desc }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'

const diferenciais = [
  { icon: '✦', title: 'Artesanal', desc: 'Cada peça feita à mão com cuidado' },
  { icon: '💎', title: 'Qualidade', desc: 'Prata 925 e ouro 18k' },
  { icon: '📦', title: 'Entrega', desc: 'Para todo o Brasil' },
  { icon: '💛', title: 'Com amor', desc: 'Feito com dedicação' },
]
</script>
