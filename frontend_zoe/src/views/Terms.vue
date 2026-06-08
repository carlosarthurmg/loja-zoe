<template>
  <div class="min-h-screen bg-black pt-24 pb-16">
    <Navbar />
    <main class="max-w-2xl mx-auto px-4">
      <div class="mb-12">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-3">Zoe Acessórios</p>
        <h1 class="text-3xl font-thin text-white mb-2">Termos de Uso</h1>
        <p class="text-white/40 text-xs">Última atualização: junho de 2026</p>
      </div>

      <div class="flex flex-col gap-8 text-white/60 text-sm leading-relaxed">
        <section>
          <h2 class="text-white font-medium mb-3">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar o site da Zoe Acessórios, você concorda com os presentes Termos de
            Uso. Caso não concorde com alguma condição, pedimos que não utilize nossos serviços.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">2. Sobre a Loja</h2>
          <p>
            A Zoe Acessórios é uma loja virtual de acessórios femininos administrada por Raissa
            Moraes. Vendemos bijuterias premium selecionadas com cuidado para nossos clientes.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">3. Cadastro e Conta</h2>
          <p>
            Para realizar compras, é necessário criar uma conta com informações verídicas. Você é
            responsável pela confidencialidade da sua senha e por todas as atividades realizadas com
            sua conta. Em caso de uso não autorizado, entre em contato imediatamente.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">4. Produtos e Preços</h2>
          <p>
            As informações sobre produtos, incluindo descrições e preços, estão sujeitas a
            alterações sem aviso prévio. Nos comprometemos a manter o preço vigente no momento da
            compra. Em caso de erro de precificação, entraremos em contato antes de processar o
            pedido.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">5. Pedidos e Pagamento</h2>
          <p>
            Os pedidos são realizados exclusivamente através desta plataforma. O pagamento é
            efetuado via PIX, com envio manual do comprovante. O pedido é confirmado somente após a
            verificação e aprovação do pagamento pela administração da loja.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">6. Entrega</h2>
          <p>
            As entregas são realizadas pelos Correios para todo o Brasil. O prazo de entrega varia
            conforme a região. O endereço informado no pedido é de responsabilidade do cliente. Não
            nos responsabilizamos por endereços incorretos ou incompletos fornecidos no momento da
            compra.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">7. Trocas e Devoluções</h2>
          <p>
            Conforme o Código de Defesa do Consumidor (Lei nº 8.078/1990), o cliente tem direito a
            solicitar a troca ou devolução do produto em até 7 dias corridos após o recebimento, em
            caso de arrependimento. Para produtos com defeito, o prazo é de 30 dias. Entre em
            contato pelo WhatsApp ou Instagram para solicitar.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">8. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo deste site, incluindo textos, imagens, logotipos e design, é de
            propriedade da Zoe Acessórios. É proibida a reprodução sem autorização prévia por
            escrito.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">9. Limitação de Responsabilidade</h2>
          <p>
            A Zoe Acessórios não se responsabiliza por danos decorrentes do uso indevido do site,
            falhas de conexão ou interrupções no serviço fora de nosso controle.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">10. Alterações nos Termos</h2>
          <p>
            Reservamos o direito de modificar estes Termos a qualquer momento. As alterações entram
            em vigor imediatamente após a publicação. O uso continuado do site após as alterações
            constitui aceitação dos novos termos.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">11. Contato</h2>
          <p>Para dúvidas sobre estes Termos de Uso, entre em contato:</p>
          <div class="mt-3 flex flex-col gap-2">
            <a
              href="https://wa.me/5586999282904"
              target="_blank"
              class="text-gold-500 hover:text-gold-400 transition-colors"
            >
              WhatsApp: (86) 99928-2904
            </a>
            <a
              href="https://instagram.com/zoe.oficial__"
              target="_blank"
              class="text-gold-500 hover:text-gold-400 transition-colors"
            >
              Instagram: @zoe.oficial__
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>
