<template>
  <div class="min-h-screen bg-zinc-950 pt-24 pb-12">
    <Navbar />
    <div class="max-w-6xl mx-auto px-4">
      <!-- Cabeçalho -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-light text-white tracking-wide">Produtos</h1>
          <p class="text-zinc-500 text-sm mt-1">{{ products.length }} peças cadastradas</p>
        </div>
        <button
          @click="openModal()"
          class="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          + Novo produto
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col gap-3">
        <div v-for="n in 5" :key="n" class="bg-zinc-900 rounded-2xl h-16 animate-pulse" />
      </div>

      <!-- Tabela -->
      <div v-else class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-zinc-800">
                <th class="text-left text-zinc-500 text-xs px-6 py-4 font-medium">Produto</th>
                <th class="text-left text-zinc-500 text-xs px-6 py-4 font-medium">Categoria</th>
                <th class="text-left text-zinc-500 text-xs px-6 py-4 font-medium">Preço</th>
                <th class="text-left text-zinc-500 text-xs px-6 py-4 font-medium">Estoque</th>
                <th class="text-left text-zinc-500 text-xs px-6 py-4 font-medium">Promo</th>
                <th class="text-left text-zinc-500 text-xs px-6 py-4 font-medium">Status</th>
                <th class="text-right text-zinc-500 text-xs px-6 py-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in products"
                :key="product.id"
                class="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-zinc-800 rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        v-if="product.image"
                        :src="product.image"
                        :alt="product.name"
                        class="w-full h-full object-cover"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center text-sm">
                        💍
                      </div>
                    </div>
                    <span class="text-white text-sm font-medium">{{ product.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-zinc-400 text-sm">
                  {{ categoryLabel[product.category] || '—' }}
                </td>
                <td class="px-6 py-4">
                  <span
                    v-if="product.is_promo && product.promo_price"
                    class="text-gold-500 text-sm font-medium"
                  >
                    R$ {{ Number(product.promo_price).toFixed(2).replace('.', ',') }}
                  </span>
                  <span v-else class="text-white text-sm">
                    R$ {{ Number(product.price).toFixed(2).replace('.', ',') }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="product.stock === 0 ? 'text-red-400' : 'text-zinc-400'"
                    class="text-sm"
                  >
                    {{ product.stock }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span
                    v-if="product.is_promo"
                    class="bg-gold-500/20 text-gold-500 text-xs px-2 py-1 rounded-full"
                    >Sim</span
                  >
                  <span v-else class="text-zinc-600 text-xs">—</span>
                </td>
                <td class="px-6 py-4">
                  <span
                    v-if="product.is_draft"
                    class="bg-zinc-700 text-zinc-300 text-xs px-2 py-1 rounded-full"
                  >
                    Rascunho
                  </span>
                  <span
                    v-else
                    class="bg-green-900/40 text-green-400 text-xs px-2 py-1 rounded-full"
                  >
                    Publicado
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openModal(product)"
                      class="text-zinc-400 hover:text-white text-xs border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      @click="confirmDelete(product)"
                      class="text-red-400 hover:text-red-300 text-xs border border-red-900/50 hover:border-red-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Criar/Editar -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
      role="dialog"
      aria-modal="true"
      :aria-label="editingProduct ? 'Editar produto' : 'Novo produto'"
    >
      <div
        class="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
      >
        <h2 class="text-white font-medium text-lg mb-6">
          {{ editingProduct ? 'Editar Produto' : 'Novo Produto' }}
        </h2>

        <div
          v-if="formError"
          role="alert"
          class="bg-red-950 border border-red-800 text-red-300 text-sm rounded-xl px-4 py-3 mb-4"
        >
          {{ formError }}
        </div>

        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-zinc-400 text-sm mb-2">Nome *</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Nome da peça"
              class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <div>
            <label class="block text-zinc-400 text-sm mb-2">Descrição</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Descrição da peça"
              class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-zinc-400 text-sm mb-2">Preço *</label>
              <input
                v-model="form.price"
                type="number"
                step="0.01"
                placeholder="0,00"
                class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div>
              <label class="block text-zinc-400 text-sm mb-2">Estoque</label>
              <input
                v-model="form.stock"
                type="number"
                placeholder="0"
                class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label class="block text-zinc-400 text-sm mb-2">Categoria</label>
            <select
              v-model="form.category"
              class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
            >
              <option value="">Selecione...</option>
              <option value="aneis">Anéis</option>
              <option value="colares">Colares</option>
              <option value="brincos">Brincos</option>
              <option value="pulseiras">Pulseiras</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-zinc-400 text-sm mb-2">Material</label>
              <input
                v-model="form.material"
                type="text"
                placeholder="Ex: Prata 925"
                class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div>
              <label class="block text-zinc-400 text-sm mb-2">Tamanho</label>
              <input
                v-model="form.size"
                type="text"
                placeholder="Ex: P, M, G"
                class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <!-- Upload de Imagem -->
          <div>
            <label class="block text-zinc-400 text-sm mb-2">Foto do produto</label>

            <!-- Preview -->
            <div
              v-if="form.image"
              class="mb-3 relative w-full aspect-square max-w-[200px] rounded-xl overflow-hidden bg-zinc-800"
            >
              <img :src="form.image" alt="Preview" class="w-full h-full object-cover" />
              <button
                @click="form.image = ''"
                class="absolute top-2 right-2 bg-black/60 hover:bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <!-- Input de arquivo -->
            <label
              class="flex items-center gap-3 cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 border-dashed rounded-xl px-4 py-4 transition-colors"
            >
              <span class="text-2xl">📷</span>
              <div>
                <p class="text-white text-sm">
                  {{ uploadingImage ? 'Enviando...' : 'Clique para escolher uma foto' }}
                </p>
                <p class="text-zinc-500 text-xs mt-0.5">JPG, PNG ou WEBP até 5MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
                :disabled="uploadingImage"
              />
            </label>

            <div v-if="uploadError" class="text-red-400 text-xs mt-2">{{ uploadError }}</div>
          </div>

          <!-- Promoção -->
          <div class="bg-zinc-800/50 rounded-xl p-4">
            <label class="flex items-center gap-3 cursor-pointer mb-3">
              <input
                v-model="form.is_promo"
                type="checkbox"
                class="w-4 h-4 accent-yellow-500 cursor-pointer"
              />
              <span class="text-white text-sm">Produto em promoção</span>
            </label>
            <div v-if="form.is_promo">
              <label class="block text-zinc-400 text-sm mb-2">Preço promocional</label>
              <input
                v-model="form.promo_price"
                type="number"
                step="0.01"
                placeholder="0,00"
                class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            @click="showModal = false"
            class="border border-zinc-700 text-zinc-400 hover:text-white py-3 px-4 rounded-xl text-sm transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="saveAsDraft"
            :disabled="saving"
            class="border border-zinc-600 text-zinc-300 hover:text-white hover:border-zinc-400 disabled:opacity-50 py-3 px-4 rounded-xl text-sm transition-colors"
          >
            {{ saving ? '...' : 'Rascunho' }}
          </button>
          <button
            v-if="editingProduct?.is_draft"
            @click="publishProduct"
            :disabled="saving"
            class="bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors flex-1"
          >
            {{ saving ? '...' : '✓ Publicar' }}
          </button>
          <button
            @click="saveProduct"
            :disabled="saving"
            class="bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-black font-semibold py-3 px-4 rounded-xl text-sm transition-colors flex-1"
          >
            {{ saving ? 'Salvando...' : editingProduct ? 'Salvar' : 'Criar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Confirmar Exclusão -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Confirmar exclusão"
    >
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm p-6 text-center">
        <p class="text-3xl mb-4">⚠️</p>
        <h2 class="text-white font-medium mb-2">Excluir produto?</h2>
        <p class="text-zinc-400 text-sm mb-6">
          "<strong class="text-white">{{ deletingProduct?.name }}</strong
          >" será removido permanentemente.
        </p>
        <div class="flex gap-3">
          <button
            @click="showDeleteModal = false"
            class="flex-1 border border-zinc-700 text-zinc-400 hover:text-white py-3 rounded-xl text-sm transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="deleteProduct"
            :disabled="deleting"
            class="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            {{ deleting ? 'Excluindo...' : 'Excluir' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../../components/Navbar.vue'
import api from '../../services/api.js'

const products = ref([])
const loading = ref(true)
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingProduct = ref(null)
const deletingProduct = ref(null)
const saving = ref(false)
const deleting = ref(false)
const formError = ref('')

const emptyForm = () => ({
  name: '',
  description: '',
  price: '',
  promo_price: '',
  is_promo: false,
  is_draft: false,
  category: '',
  material: '',
  size: '',
  image: '',
  stock: 0,
})

const form = ref(emptyForm())

const uploadingImage = ref(false)
const uploadError = ref('')

async function handleImageUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  uploadingImage.value = true
  uploadError.value = ''

  try {
    const formData = new FormData()
    formData.append('image', file)

    const { data } = await api.post('/products/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    form.value.image = data.url
  } catch (err) {
    uploadError.value = 'Erro ao enviar imagem. Tente novamente.'
  } finally {
    uploadingImage.value = false
  }
}

const categoryLabel = {
  aneis: 'Anéis',
  colares: 'Colares',
  brincos: 'Brincos',
  pulseiras: 'Pulseiras',
}

async function fetchProducts() {
  loading.value = true
  try {
    const { data } = await api.get('/products', { params: { include_drafts: true } })
    products.value = data.products
  } finally {
    loading.value = false
  }
}

function openModal(product = null) {
  formError.value = ''
  editingProduct.value = product
  form.value = product ? { ...product } : emptyForm()
  showModal.value = true
}

function confirmDelete(product) {
  deletingProduct.value = product
  showDeleteModal.value = true
}

async function saveProduct() {
  if (!form.value.name || !form.value.price) {
    formError.value = 'Nome e preço são obrigatórios'
    return
  }
  saving.value = true
  formError.value = ''
  try {
    if (editingProduct.value) {
      await api.put(`/products/${editingProduct.value.id}`, form.value)
    } else {
      await api.post('/products', form.value)
    }
    showModal.value = false
    await fetchProducts()
  } catch (err) {
    formError.value = err.response?.data?.error || 'Erro ao salvar produto'
  } finally {
    saving.value = false
  }
}

async function saveAsDraft() {
  if (!form.value.name) {
    formError.value = 'Coloque pelo menos um nome para salvar o rascunho'
    return
  }
  form.value.is_draft = true
  await saveProduct()
}

async function publishProduct() {
  form.value.is_draft = false
  await saveProduct()
}

async function deleteProduct() {
  deleting.value = true
  try {
    await api.delete(`/products/${deletingProduct.value.id}`)
    showDeleteModal.value = false
    await fetchProducts()
  } catch {
  } finally {
    deleting.value = false
  }
}

onMounted(fetchProducts)
</script>
