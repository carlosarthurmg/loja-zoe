<template>
  <div class="min-h-screen bg-black">
    <Navbar />

    <!-- HERO com carrossel ticker -->
    <section class="relative h-screen overflow-hidden pt-16">
      <div class="flex h-full ticker-track">
        <div
          v-for="slide in slidesLoop"
          :key="slide.idUnique"
          class="flex-shrink-0 h-full w-[80vw] sm:w-[45vw] md:w-[32vw] px-1"
        >
          <div class="w-full h-full overflow-hidden">
            <img
              v-if="slide.image"
              :src="slide.image"
              alt="Zoe Joias"
              class="w-full h-full object-cover object-center"
            />
            <div v-else class="w-full h-full bg-zinc-900 flex items-center justify-center">
              <span class="text-zinc-700 text-4xl">✦</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Logo sobreposta -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-end pb-16 pointer-events-none z-10"
      >
        <div class="text-center">
          <div class="w-16 h-px bg-white/40 mx-auto mb-4" />
          <h1 class="text-6xl md:text-8xl font-thin tracking-[0.5em] text-white drop-shadow-lg">
            ZOE
          </h1>
          <p class="text-white/70 text-xs tracking-[0.4em] uppercase mt-2">Acessórios Femininos</p>
          <div class="w-16 h-px bg-white/40 mx-auto mt-4 mb-6" />
          <RouterLink
            to="/catalog"
            class="pointer-events-auto border border-white/60 hover:border-white hover:bg-white hover:text-black text-white text-xs tracking-[0.3em] uppercase px-8 py-3 transition-all duration-300 inline-block"
          >
            Ver Coleção
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- FRASE DE IMPACTO -->
    <section class="py-24 px-4 bg-black">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-white/20 text-xs tracking-[0.4em] uppercase mb-6">Nossa essência</p>
        <blockquote class="text-2xl md:text-3xl font-thin text-white leading-relaxed">
          "Mais do que acessórios,<br />
          <span class="text-white/70">peças que acompanham a sua história."</span>
        </blockquote>
        <div class="w-8 h-px bg-white/30 mx-auto mt-8" />
      </div>
    </section>

    <!-- CATEGORIAS -->
    <section class="py-20 px-4 bg-zinc-950">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-3">Explore</p>
          <h2 class="text-2xl font-thin text-white tracking-widest">COLEÇÕES</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <RouterLink
            v-for="cat in categories"
            :key="cat.value"
            :to="`/catalog?category=${cat.value}`"
            class="relative aspect-square overflow-hidden group"
          >
            <!-- Foto ou placeholder -->
            <img
              v-if="cat.image"
              :src="cat.image"
              :alt="cat.label"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              v-else
              class="w-full h-full bg-zinc-900 flex items-center justify-center transition-colors group-hover:bg-zinc-800"
            >
              <span class="text-zinc-600 text-4xl">{{ cat.icon }}</span>
            </div>
            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"
            />
            <!-- Label -->
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <p class="text-white text-sm tracking-[0.2em] uppercase font-light">
                {{ cat.label }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- EM DESTAQUE -->
    <section class="py-20 px-4 bg-black">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-3">Seleção especial</p>
            <h2 class="text-2xl font-thin text-white tracking-widest">EM DESTAQUE</h2>
          </div>
          <RouterLink
            to="/catalog"
            class="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors border-b border-white/20 hover:border-white pb-0.5"
          >
            Ver tudo
          </RouterLink>
        </div>

        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="n in 4" :key="n" class="bg-zinc-900 rounded aspect-square animate-pulse" />
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProductCard v-for="product in featured" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- QUEM É A MULHER ZOE -->
    <section class="py-24 px-4 bg-zinc-950">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Foto Raissa -->
          <div class="aspect-[3/4] overflow-hidden">
            <img
              src="/ftRaissa.jpeg"
              alt="Raissa — Zoe Acessórios"
              class="w-full h-full object-contain bg-zinc-950"
            />
          </div>
          <!-- Texto -->
          <div>
            <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">Para você que</p>
            <h2 class="text-3xl font-thin text-white leading-relaxed mb-8">
              Se cuida,<br />valoriza detalhes<br />
              <span class="text-white/50">e sabe que um acessório<br />transforma o visual.</span>
            </h2>
            <p class="text-white/50 text-sm leading-relaxed mb-8">
              A mulher que usa peças da Zoe busca beleza, praticidade e autenticidade. Ela entende
              que cada peça diz algo sobre quem ela é.
            </p>
            <RouterLink
              to="/catalog"
              class="inline-block border border-white/40 hover:border-white hover:bg-white hover:text-black text-white text-xs tracking-[0.3em] uppercase px-6 py-3 transition-all duration-300"
            >
              Encontrar minha peça
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- PROMOÇÕES -->
    <section v-if="promos.length > 0" class="py-20 px-4 bg-black">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-3">Preços especiais</p>
            <h2 class="text-2xl font-thin text-white tracking-widest">PROMOÇÕES</h2>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProductCard v-for="product in promos" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section class="py-24 px-4 bg-zinc-950">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-3">Simples assim</p>
        <h2 class="text-2xl font-thin text-white tracking-widest mb-16">COMO COMPRAR</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="step in steps" :key="step.num" class="flex flex-col items-center gap-4">
            <div
              class="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 text-sm font-thin"
            >
              {{ step.num }}
            </div>
            <p class="text-white text-sm font-light">{{ step.title }}</p>
            <p class="text-white/40 text-xs leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-white/10 py-16 px-4 bg-black">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p class="text-white text-2xl font-thin tracking-[0.4em] mb-3">ZOE</p>
            <p class="text-white/40 text-xs leading-relaxed">
              Acessórios femininos escolhidos com carinho para mulheres que valorizam beleza e
              autenticidade.
            </p>
          </div>
          <div>
            <p class="text-white/30 text-xs tracking-widest uppercase mb-4">Navegação</p>
            <div class="flex flex-col gap-3">
              <RouterLink to="/" class="text-white/50 hover:text-white text-sm transition-colors"
                >Início</RouterLink
              >
              <RouterLink
                to="/catalog"
                class="text-white/50 hover:text-white text-sm transition-colors"
                >Catálogo</RouterLink
              >
              <RouterLink
                to="/about"
                class="text-white/50 hover:text-white text-sm transition-colors"
                >Sobre</RouterLink
              >
            </div>
          </div>
          <div>
            <p class="text-white/30 text-xs tracking-widest uppercase mb-4">Contato</p>
            <div class="flex flex-col gap-3">
              <a
                href="https://wa.me/5586999282904"
                target="_blank"
                class="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  class="w-4 h-4"
                />
                (86) 99928-2904
              </a>
              <a
                href="https://instagram.com/zoe.oficial__"
                target="_blank"
                class="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  class="w-4 h-4 rounded-sm"
                />
                @zoe.oficial__
              </a>
            </div>
          </div>
        </div>
        <div
          class="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p class="text-white/20 text-xs tracking-widest">© 2026 ZOE ACESSÓRIOS</p>
          <p class="text-white/20 text-xs">Pagamento via PIX · Entrega para todo o Brasil</p>
          <p class="text-white/20 text-xs">
            Desenvolvido por
            <a
              href="https://instagram.com/carlosarthurmg"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white/60 transition-colors underline underline-offset-2"
            >
              @carlosarthurmg
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import ProductCard from '../components/ProductCard.vue'
import api from '../services/api.js'

const featured = ref([])
const promos = ref([])
const loading = ref(true)

const slides = ref([
  { image: 'Brinco_zoe.jpeg' },
  { image: 'Bracelet_zoe.jpeg' },
  { image: 'Colar_zoe.jpeg' },
  { image: 'Bracelete_zoe.jpeg' },
])

const slidesLoop = computed(() => {
  const original = slides.value.map((slide, index) => ({ ...slide, idUnique: `orig-${index}` }))
  const copia = slides.value.map((slide, index) => ({ ...slide, idUnique: `copia-${index}` }))
  return [...original, ...copia]
})

const categories = [
  { value: 'aneis', label: 'Anéis', icon: '💍', image: '' },
  { value: 'colares', label: 'Colares', icon: '📿', image: '' },
  { value: 'brincos', label: 'Brincos', icon: '✨', image: '' },
  { value: 'pulseiras', label: 'Pulseiras', icon: '⭕', image: '' },
]

const steps = [
  { num: '01', title: 'Escolha', desc: 'Navegue pelo catálogo e encontre sua peça' },
  { num: '02', title: 'Pedido', desc: 'Adicione ao carrinho e finalize' },
  { num: '03', title: 'PIX', desc: 'Pague via PIX e envie o comprovante' },
  { num: '04', title: 'Entrega', desc: 'Receba em casa com todo cuidado' },
]

onMounted(async () => {
  try {
    const { data } = await api.get('/products')
    const all = data.products
    featured.value = all.slice(0, 4)
    promos.value = all.filter((p) => p.is_promo).slice(0, 4)
  } catch {
    featured.value = []
  } finally {
    loading.value = false
  }
})
</script>
