# 📌 Todo List - Express & React

Este é um projeto de lista de tarefas (Todo List) desenvolvido com um backend em Express e um frontend em React. Ele permite criar, listar, atualizar e excluir tarefas, utilizando uma API RESTful.

## 🚀 Tecnologias Utilizadas

### 📌 Backend:
- Node.js
- Express
- PostgreSQL
- pg (node-postgres)
- Supertest (para testes)
- Jest (para testes unitários e de integração)
- Docker & Docker Compose

### 📌 Frontend:
- React
- Vite
- Context API (para gerenciamento de estado)
- Axios (para chamadas HTTP)
- Vitest (para testes)
- Formik (validação de formulários)
- React Testing Library
- Docker & Docker Compose

##  📂 Estrutura do Projeto

```
/todo-list-express-react
│── backend
│   ├── src
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── repository/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── tests
│   │   ├── app.ts
│   │   ├── index.ts
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── init.sql
│
│── frontend
│   ├── src
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── models/
│   │   ├── pages/
│   │   ├── providers/
│   │   ├── services/
│   │   ├── tests/
│   │   ├── validations/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── routes.tsx
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
```
## 🎯 Funcionalidades

✅ Criar, visualizar, atualizar e excluir tarefas

✅ Interface moderna com React + Vite

✅ API RESTful desenvolvida com Express

✅ Testes automatizados no frontend e backend

✅ Configuração com Docker para fácil execução

##  🔧 Como Rodar o Projeto

### Usando Docker

1. Copie o arquivo `.env.example` no backend e frontend para `.env` e configure as variáveis corretamente.
2. No diretório raiz do projeto, execute:
   ```sh
   docker compose up --build
   ```
3. O backend rodará em `http://localhost:3000` e o frontend em `http://localhost:8000`.

### 💻 Rodando Localmente

#### 📌 Backend:
1. Configure o `.env` com os dados do banco de dados.
   ```sh
   PORT=3000
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=todo
   DB_PASS=root
   DB_PORT=5432
   ```
3. **Crie as tabelas** executando o script `init.sql`:
   ```sh
   psql -U user -d todo -f init.sql
   ```
3. Instale as dependências:
   ```sh
   cd backend
   npm install
   ```
4. Rode o servidor:
   ```sh
   npm run dev
   ```

#### 📌 Frontend:
1. Defina a URL do backend no `.env` do frontend:
   ```sh
   VITE_API_URL=http://localhost:3000
   ```
2. Instale as dependências:
   ```sh
   cd frontend
   npm install
   ```
3. Rode o servidor:
   ```sh
   npm run dev
   ```
4. Acesse `http://localhost:5173` no navegador.

## 🧪 Testes

### 📌 Backend:
```sh
cd backend
npm run test
```

### 📌 Frontend:
```sh
cd frontend
npm run test
```
