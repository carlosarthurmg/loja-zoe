<template>
  <div class="min-h-screen bg-black pt-24 pb-16">
    <Navbar />
    <main class="max-w-2xl mx-auto px-4">
      <div class="mb-12">
        <p class="text-white/30 text-xs tracking-[0.4em] uppercase mb-3">Zoe Acessórios</p>
        <h1 class="text-3xl font-thin text-white mb-2">Política de Privacidade</h1>
        <p class="text-white/40 text-xs">Última atualização: junho de 2026</p>
      </div>

      <div class="flex flex-col gap-8 text-white/60 text-sm leading-relaxed">
        <section>
          <h2 class="text-white font-medium mb-3">1. Introdução</h2>
          <p>
            A Zoe Acessórios, está comprometida com a proteção dos seus dados pessoais. Esta
            Política de Privacidade descreve como coletamos, usamos e protegemos suas informações,
            em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">2. Dados que Coletamos</h2>
          <p class="mb-3">Coletamos os seguintes dados pessoais:</p>
          <ul class="flex flex-col gap-2 pl-4">
            <li class="flex gap-2"><span class="text-white/30">—</span> Nome completo</li>
            <li class="flex gap-2"><span class="text-white/30">—</span> Endereço de e-mail</li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Número de telefone/WhatsApp
            </li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Endereço de entrega completo (CEP, rua, número,
              bairro, cidade, estado)
            </li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Histórico de pedidos realizados
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">3. Como Usamos seus Dados</h2>
          <p class="mb-3">Utilizamos seus dados para:</p>
          <ul class="flex flex-col gap-2 pl-4">
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Processar e entregar seus pedidos
            </li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Entrar em contato sobre o status do seu pedido
            </li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Gerenciar sua conta na plataforma
            </li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Cumprir obrigações legais
            </li>
          </ul>
          <p class="mt-3">
            Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins
            comerciais.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">4. Base Legal (LGPD)</h2>
          <p>
            O tratamento dos seus dados é realizado com base nas seguintes hipóteses previstas na
            LGPD: execução de contrato (para processar seus pedidos), cumprimento de obrigação legal
            e legítimo interesse da empresa.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">5. Armazenamento e Segurança</h2>
          <p>
            Seus dados são armazenados de forma segura em servidores da Supabase (PostgreSQL), com
            proteção por criptografia. Senhas são armazenadas com hash bcrypt e nunca em texto puro.
            Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não
            autorizado.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">6. Seus Direitos (LGPD)</h2>
          <p class="mb-3">Conforme a LGPD, você tem direito a:</p>
          <ul class="flex flex-col gap-2 pl-4">
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Confirmar a existência de tratamento dos seus
              dados
            </li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Acessar seus dados pessoais
            </li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Corrigir dados incompletos, inexatos ou
              desatualizados
            </li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Solicitar a exclusão dos seus dados
            </li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Revogar o consentimento a qualquer momento
            </li>
            <li class="flex gap-2">
              <span class="text-white/30">—</span> Solicitar a portabilidade dos seus dados
            </li>
          </ul>
          <p class="mt-3">
            Para exercer qualquer um desses direitos, entre em contato através dos canais abaixo.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">7. Cookies</h2>
          <p>
            Utilizamos apenas armazenamento local (localStorage) no navegador para manter sua sessão
            de login e os itens do carrinho. Não utilizamos cookies de rastreamento ou publicidade.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">8. Retenção de Dados</h2>
          <p>
            Mantemos seus dados enquanto sua conta estiver ativa ou pelo período necessário para
            cumprir obrigações legais. Você pode solicitar a exclusão da sua conta e dados a
            qualquer momento.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">9. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre
            alterações significativas através do site. O uso continuado após as alterações indica
            sua aceitação.
          </p>
        </section>

        <section>
          <h2 class="text-white font-medium mb-3">10. Encarregado de Dados (DPO)</h2>
          <p>
            O responsável pelo tratamento de dados pessoais da Zoe Acessórios é Raissa Moraes. Para
            exercer seus direitos ou esclarecer dúvidas:
          </p>
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
