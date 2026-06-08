<template>
  <main class="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-light tracking-[0.3em] text-gold-500">ZOE</h1>
        <p class="text-zinc-500 text-sm mt-1 tracking-widest">JOIAS</p>
      </div>

      <!-- Card -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h2 class="text-white text-xl font-medium mb-6">Criar conta</h2>

        <!-- Erro -->
        <div
          v-if="error"
          role="alert"
          class="bg-red-950 border border-red-800 text-red-300 text-sm rounded-lg px-4 py-3 mb-4"
        >
          {{ error }}
        </div>

        <!-- Sucesso -->
        <div
          v-if="success"
          role="status"
          class="bg-green-950 border border-green-800 text-green-300 text-sm rounded-lg px-4 py-3 mb-4"
        >
          Conta criada com sucesso! Redirecionando...
        </div>

        <form @submit.prevent="handleRegister" novalidate>
          <!-- Nome -->
          <div class="mb-4">
            <label for="name" class="block text-zinc-400 text-sm mb-2">Nome completo</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              autocomplete="name"
              placeholder="Seu nome"
              required
              class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-zinc-400 text-sm mb-2">E-mail</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="seu@email.com"
              required
              class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <!-- Senha -->
          <div class="mb-4">
            <label for="password" class="block text-zinc-400 text-sm mb-2">Senha</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="new-password"
              placeholder="Mínimo 6 caracteres"
              required
              class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <!-- Confirmar Senha -->
          <div class="mb-6">
            <label for="confirmPassword" class="block text-zinc-400 text-sm mb-2"
              >Confirmar senha</label
            >
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              autocomplete="new-password"
              placeholder="••••••••"
              required
              class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <!-- Termos -->
          <div class="mb-6">
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
              </span>
            </label>
          </div>

          <!-- Botão -->
          <button
            type="submit"
            :disabled="loading || !acceptedTerms"
            class="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg px-4 py-3 text-sm transition-colors"
          >
            {{ loading ? 'Criando conta...' : 'Criar conta' }}
          </button>
        </form>

        <p class="text-center text-zinc-500 text-sm mt-6">
          Já tem conta?
          <RouterLink to="/login" class="text-gold-500 hover:text-gold-400 transition-colors">
            Entrar
          </RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const error = ref('')
const success = ref(false)
const loading = ref(false)
const acceptedTerms = ref(false)

async function handleRegister() {
  error.value = ''

  if (!acceptedTerms.value) {
    error.value = 'Você precisa aceitar os termos para continuar'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = 'As senhas não coincidem'
    return
  }

  loading.value = true
  try {
    await auth.register(form.name, form.email, form.password)
    success.value = true
    setTimeout(() => router.push('/'), 1500)
  } catch (err) {
    error.value = err.response?.data?.error || 'Erro ao criar conta'
  } finally {
    loading.value = false
  }
}
</script>
