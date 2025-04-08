# EcoCidadãoGO 

Bem-vindo ao repositório da EcoCidadãoGO! Este projeto contém as implementações das funções relacionadas às missões e rankings.

---

## ⚠️ Instruções Importantes para Commits

### 1. Evitar problemas de comparação entre versões e commits:
- **Sempre realize os commits a partir do diretório `workspace`!**
- Não faça commits diretamente do lado cliente ou servidor. Isso pode causar erros de comparação nas versões e comprometer a consistência dos commits.

### 2. Como realizar um commit corretamente:
1. Certifique-se de que suas alterações estão na área de staging:
   ```bash
   git add .
### Estrutura de Pastas

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
