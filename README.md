
Bem-vindo ao repositório da EcoCidadãoGO! Este projeto contém as implementações das funções relacionadas às missões e rankings.

---
---


# 🌱 EcoCidadãoGO

**EcoCidadãoGO** é uma plataforma que conecta cidadãos e órgãos públicos para promover a conscientização ambiental, facilitar denúncias de irregularidades e divulgar ações sustentáveis no estado de Goiás.

## 📌 Objetivo

Criar uma aplicação web completa com **frontend** e **backend** integrados, capaz de:

- Permitir denúncias ambientais geolocalizadas
- Divulgar ações sustentáveis realizadas por instituições e cidadãos
- Conectar ONGs, instituições públicas e voluntários
- Fornecer dados estatísticos para apoio à tomada de decisão pública

---

## 🗂️ Estrutura do Projeto

workspace/
├── back/
│   └── ecocidadaogo-api/     # Backend em Node.js
├── front/
│   └── ecocidadaogo-web/     # Frontend em React
└── README.md


---

## ⚙️ Backend - Node.js

### Tecnologias

- Node.js
- Express
- PostgreSQL
- JWT (Autenticação)
- Multer (Upload de imagens)
- Sequelize (ORM)
- Dotenv (variáveis de ambiente)

### Funcionalidades

- 🔐 Autenticação e autorização com JWT
- 🧾 Cadastro e login de usuários (admin, cidadão, instituição)
- 📍 Registro de denúncias com localização
- 📸 Upload de imagens nas denúncias
- 🗂️ Categorias de problemas (lixo, desmatamento, queimadas, etc)
- 📊 Dashboard para admins com estatísticas
- 📌 API REST com versionamento e testes

### Dicas de boas práticas

- Utilizar arquitetura MVC ou Clean Architecture
- Separar lógica de serviços e middlewares
- Validar entradas com `joi` ou `zod`
- Aplicar CORS corretamente
- Incluir testes com Jest ou Supertest

---

## 💻 Frontend - React.js

### Tecnologias

- React + Vite
- React Router
- Axios (consumo da API)
- TailwindCSS / Bootstrap
- Leaflet (mapa interativo)
- Zustand ou Redux (gerenciamento de estado)

### Funcionalidades

- 🧑 Cadastro/Login com autenticação JWT
- 🗺️ Mapa com denúncias geolocalizadas
- 📤 Formulário de nova denúncia com imagem e localização
- 📊 Área administrativa com dashboard e gráficos
- 🌿 Página com dicas sustentáveis e notícias ambientais
- 🔍 Filtro e busca por tipo de denúncia

### Dicas de boas práticas

- Organizar componentes em pastas (`components`, `pages`, `services`, etc)
- Reutilizar componentes como botões, cards, inputs
- Usar loading states, tratamento de erros e feedback ao usuário
- Validar formulários com `react-hook-form` + `zod`
- Aplicar animações leves (ex: Framer Motion) para melhor UX

---

## 🧠 Possíveis Evoluções Futuras

- 🧭 Sistema de gamificação para usuários engajados
- 🤝 Chat para interação entre usuários e instituições
- 📱 PWA para uso em dispositivos móveis
- 🔔 Notificações push com atualizações de denúncias

---

## 🛠️ Como Rodar Localmente

### Backend

```bash
cd back/ecocidadaogo-api
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd front/ecocidadaogo-web
npm install
npm run dev
```

---

## 🧑‍💻 Equipe de Desenvolvimento

- Tiago Carvalho - Full Stack / Coordenação
- Nicolas, Bruno, Manoel, Julyo e Robert - Devs e apoio técnico

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

> Desenvolvido com ❤️ por estudantes apaixonados por tecnologia e meio ambiente.
```

## ⚠️ Instruções Importantes para Commits

## 1. Evitar problemas de comparação entre versões e commits:
- Sempre realize os commits a partir do diretório `workspace`!
- Não faça commits diretamente do lado cliente ou servidor. Isso pode causar erros de comparação nas versões e comprometer a consistência dos commits.

## 2. Como realizar um commit corretamente:
1. Certifique-se de que suas alterações estão na área de staging:
   ```bash
   git add .
## Estrutura de Pastas

ecocidadaogo-api/
│
├── prisma/                  → Esquema do banco (schema.prisma)
├── src/
│   ├── controllers/         → Controladores (rotas)
│   ├── services/            → Regras de negócio
│   ├── repositories/        → Prisma ORM e persistência
│   ├── middlewares/         → Middlewares (ex: autenticação)
│   ├── routes/              → Arquivos de rotas
│   ├── utils/               → Utilitários gerais
│   └── app.js               → Configuração do Express
│
├── .env                     → Variáveis de ambiente
├── .gitignore
├── package.json
└── server.js                → Arquivo principal para subir a aplicação
---
