<template>
  <div class="min-h-screen bg-black">
    <Navbar />

    <!-- Header -->
    <section class="pt-32 pb-20 px-4 text-center border-b border-white/10">
      <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Nossa história</p>
      <h1 class="text-5xl font-thin tracking-[0.5em] text-white mb-4">ZOE</h1>
      <p class="text-white/40 text-sm tracking-widest">ACESSÓRIOS FEMININOS</p>
    </section>

    <main class="max-w-3xl mx-auto px-4 py-20">
      <!-- O nome -->
      <div class="mb-16">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">O nome</p>
        <h2 class="text-2xl font-thin text-white mb-6 leading-relaxed">
          Zoe significa <span class="text-white/60">"vida"</span> em grego.
        </h2>
        <p class="text-white/50 text-sm leading-relaxed">
          Escolhemos esse nome porque acreditamos que os acessórios são mais do que peças — eles
          ajudam a expressar personalidade, autoestima e os momentos especiais da vida de cada
          mulher.
        </p>
      </div>

      <!-- Divisor -->
      <div class="w-full h-px bg-white/10 mb-16" />

      <!-- A história -->
      <div class="mb-16">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">Como surgiu</p>
        <p class="text-white/60 text-sm leading-relaxed mb-4">
          A Zoe nasceu de uma paixão por peças que valorizam a beleza feminina. Enxergamos nisso uma
          oportunidade de empreender com propósito — oferecer peças bonitas, de qualidade e
          acessíveis para mulheres que gostam de se sentir ainda mais confiantes.
        </p>
        <p class="text-white/60 text-sm leading-relaxed">
          Cada peça do nosso catálogo é escolhida com muito cuidado, pensando em estilo, modernidade
          e bom acabamento. Não vendemos apenas acessórios — entregamos atendimento próximo e
          cuidado com cada pedido.
        </p>
      </div>

      <!-- Divisor -->
      <div class="w-full h-px bg-white/10 mb-16" />

      <!-- Para você -->
      <div class="mb-16">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">Para quem é a Zoe</p>
        <blockquote
          class="text-xl font-thin text-white leading-relaxed mb-8 border-l border-white/20 pl-6"
        >
          "Para mulheres que gostam de se cuidar, valorizam os detalhes e entendem que um acessório
          pode transformar um visual."
        </blockquote>
        <p class="text-white/50 text-sm leading-relaxed">
          Ela busca beleza, praticidade e autenticidade. Quando coloca uma peça Zoe, queremos que
          ela se sinta bonita, confiante e especial — que olhe para si mesma e reconheça o seu
          valor.
        </p>
      </div>

      <!-- Divisor -->
      <div class="w-full h-px bg-white/10 mb-16" />

      <!-- Peças -->
      <div class="mb-16">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">Nossas peças</p>
        <p class="text-white/60 text-sm leading-relaxed">
          Trabalhamos com bijuterias premium, escolhidas com muito cuidado para oferecer beleza,
          qualidade e estilo. Buscamos sempre peças modernas, elegantes e que acompanhem as
          tendências, sem abrir mão do bom acabamento. As pulseiras e os colares delicados estão
          entre os queridinhos das clientes — peças versáteis que combinam com tudo.
        </p>
      </div>

      <!-- Divisor -->
      <div class="w-full h-px bg-white/10 mb-16" />

      <!-- Contato -->
      <div>
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-8">Fale conosco</p>
        <div class="flex flex-col gap-4">
          <a
            href="https://wa.me/5586999282904"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between border border-white/10 hover:border-white/30 p-5 transition-colors group"
          >
            <div class="flex items-center gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                class="w-6 h-6"
              />
              <div>
                <p class="text-white text-sm mb-1">WhatsApp</p>
                <p class="text-white/40 text-xs">(86) 99928-2904</p>
              </div>
            </div>
            <span class="text-white/30 group-hover:text-white transition-colors text-sm">→</span>
          </a>
          <a
            href="https://instagram.com/zoe.oficial__"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between border border-white/10 hover:border-white/30 p-5 transition-colors group"
          >
            <div class="flex items-center gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                class="w-6 h-6 rounded-lg"
              />
              <div>
                <p class="text-white text-sm mb-1">Instagram</p>
                <p class="text-white/40 text-xs">@zoe.oficial__</p>
              </div>
            </div>
            <span class="text-white/30 group-hover:text-white transition-colors text-sm">→</span>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>
