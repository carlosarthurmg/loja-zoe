# ✦ Zoe Acessórios — Sistema de Loja Virtual

> "Mais do que acessórios, peças que acompanham a sua história."

Sistema web completo de e-commerce desenvolvido para a **Loja Zoe**, negócio real de acessórios femininos de Raissa Moraes (Teresina - PI). Projeto desenvolvido como Trabalho de 3ª Nota da disciplina de Programação Web.

---

## 📋 Índice

- [Sobre o Sistema](#sobre-o-sistema)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar](#como-executar)
- [Telas do Sistema](#telas-do-sistema)
- [Banco de Dados](#banco-de-dados)
- [Integrantes](#integrantes)

---

## 💡 Sobre o Sistema

A **Zoe Acessórios** é uma loja virtual desenvolvida para um cliente real, permitindo que clientes visualizem, favoritem e comprem joias online. O pagamento é realizado via **PIX manual**, com envio de comprovante pelo próprio site, WhatsApp ou Instagram.

A proprietária gerencia produtos, pedidos e aprova pagamentos por um **painel administrativo** completo.

---

## 🛠 Tecnologias Utilizadas

### Front-end

| Tecnologia  | Função                                |
| ----------- | ------------------------------------- |
| Vue 3       | Framework principal                   |
| Vite        | Bundler e servidor de desenvolvimento |
| Pinia       | Gerenciamento de estado               |
| Vue Router  | Navegação entre páginas               |
| TailwindCSS | Estilização                           |
| Axios       | Requisições HTTP                      |

### Back-end

| Tecnologia   | Função               |
| ------------ | -------------------- |
| Node.js      | Ambiente de execução |
| Express      | Framework web        |
| bcryptjs     | Hash de senhas       |
| jsonwebtoken | Autenticação JWT     |
| multer       | Upload de imagens    |

### Banco de Dados e Infraestrutura

| Tecnologia | Função                                |
| ---------- | ------------------------------------- |
| Supabase   | Banco PostgreSQL + Storage de imagens |
| GitHub     | Versionamento de código               |

---

## ✅ Funcionalidades

### Área do Cliente

- ✦ Criar conta e fazer login
- ✦ Navegar pelo catálogo com filtros por categoria
- ✦ Buscar produtos por nome
- ✦ Ver detalhes completos de cada peça
- ✦ Favoritar peças
- ✦ Adicionar produtos ao carrinho
- ✦ Finalizar pedido com endereço de entrega
- ✦ Visualizar chave PIX e copiar com um clique
- ✦ Enviar comprovante pelo site, WhatsApp ou Instagram
- ✦ Acompanhar status do pedido em tempo real
- ✦ Aceite de Termos de Uso e Política de Privacidade (LGPD)

### Área Administrativa (Raissa)

- ✦ Dashboard com estatísticas em tempo real
- ✦ CRUD completo de produtos
- ✦ Upload de fotos diretamente pelo painel
- ✦ Salvar produto como rascunho ou publicar
- ✦ Controle de estoque
- ✦ Marcar produtos em promoção com preço promocional
- ✦ Visualizar todos os pedidos com dados do cliente e endereço
- ✦ Aprovar ou rejeitar pagamentos
- ✦ Atualizar status: Pago → Enviado → Entregue

---

## 🗂 Estrutura do Projeto

loja-zoe/
├── frontend_zoe/
│ └── src/
│ ├── components/
│ │ ├── Navbar.vue
│ │ └── ProductCard.vue
│ ├── views/
│ │ ├── Home.vue
│ │ ├── Catalog.vue
│ │ ├── ProductDetail.vue
│ │ ├── Login.vue
│ │ ├── Register.vue
│ │ ├── Cart.vue
│ │ ├── Checkout.vue
│ │ ├── MyOrders.vue
│ │ ├── Favorites.vue
│ │ ├── About.vue
│ │ ├── Terms.vue
│ │ ├── Privacy.vue
│ │ └── admin/
│ │ ├── Dashboard.vue
│ │ ├── Products.vue
│ │ └── Orders.vue
│ ├── stores/
│ │ ├── auth.js
│ │ ├── cart.js
│ │ └── favorites.js
│ ├── router/
│ │ └── index.js
│ └── services/
│ └── api.js
│
└── backend_zoe/
└── src/
├── controllers/
│ ├── authController.js
│ ├── productController.js
│ ├── orderController.js
│ └── favoriteController.js
├── routes/
│ ├── auth.js
│ ├── products.js
│ ├── orders.js
│ └── favorites.js
├── middleware/
│ └── auth.js
├── services/
│ └── supabase.js
└── app.js

---

## ▶️ Como Executar

### Pré-requisitos

- Node.js instalado
- Conta no Supabase
- Git

### 1. Clonar o repositório

```bash
git clone https://github.com/carlosarthurmg/loja-zoe.git
cd loja-zoe
```

### 2. Configurar o Back-end

```bash
cd backend_zoe
npm install
```

Crie o arquivo `.env` na raiz do `backend_zoe`:
PORT=3000
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_publica_do_supabase
JWT_SECRET=sua_chave_secreta

Inicie o servidor:

```bash
npm run dev
```

### 3. Configurar o Front-end

```bash
cd ../frontend_zoe
npm install
npm run dev
```

### 4. Acessar

- **Site:** http://localhost:5173
- **API:** http://localhost:3000

### 5. Criar usuário administrador

Após criar uma conta pelo site, execute no **SQL Editor do Supabase**:

```sql
UPDATE users SET role = 'admin' WHERE email = 'seu@email.com';
```

---

## 🗄 Banco de Dados

5 tabelas no Supabase (PostgreSQL):

| Tabela        | Descrição                       |
| ------------- | ------------------------------- |
| `users`       | Clientes e administradores      |
| `products`    | Catálogo de joias com estoque   |
| `favorites`   | Peças favoritadas por usuário   |
| `orders`      | Pedidos com endereço de entrega |
| `order_items` | Itens e preços de cada pedido   |

---

## 👤 Integrantes

| Nome                           | Função                                |
| ------------------------------ | ------------------------------------- |
| Carlos Arthur Moraes Gonçalves | Desenvolvimento completo (Full Stack) |

**Cliente:** Raissa Moraes — Loja Zoe Acessórios
**Instagram:** [@zoe.oficial\_\_](https://instagram.com/zoe.oficial__)

---

## 📄 Documentação

- [Documento de Requisitos](docs/Documento_de_Requisitos_Zoe.docx)
- [Contrato de Prestação de Serviços](docs/Contrato_Loja_Zoe.docx)
- [Planejamento do Projeto](docs/Planejamento_Projeto_Zoe.docx)

---

_Desenvolvido com dedicação por [@carlosarthurmg](https://instagram.com/carlosarthurmg)_
