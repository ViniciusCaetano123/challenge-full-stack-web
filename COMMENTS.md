
## Lista de bibliotecas de terceiros utilizadas

### Frontend

Roteamento e estado
```
vue-router, pinia
```

Componentes UI e integração com Vite
```
vuetify, vite-plugin-vuetify
```

Ícones
```
@mdi/js, @mdi/font
```

Requisições HTTP
```
axios
```

Avatares personalizados
```
@dicebear/core, @dicebear/collection
```


: 


### Backend
CORS e documentação Swagger
```
@fastify/cors, @fastify/swagger, @fastify/swagger-ui
```

Plugins e tipagem via Zod
```
fastify-plugin, fastify-type-provider-zod: 
```

Validação de dados requisição
```
zod
```

Autenticação e segurança
```
bcrypt, jsonwebtoken
```

Conexão com MySQL
```
mysql2
```

Logs
```
pino-pretty
```

## O que Melhoraria com Mais Tempo

### Backend
Adicionaria testes unitários para garantir que cada parte do sistema funcione corretamente.

Usaria transações no banco de dados para operações mais seguras.

Criaria um sistema de permissões (roles) mais completo e flexível.

Usaria a biblioteca compress para diminuir o tamanho das requisições e melhorar a performance.

Implementaria um sistema de cache simples para rotas com muitas consultas.

Adicionaria registro de IP e controle de limite de requisições (rate-limit) para proteger a API contra abusos.

Adicionar proteção contra CSRF

### Banco de Dados
Criaria views para facilitar a paginação e contar alunos.

Implementaria triggers para registrar quando um aluno for deletado ou fazer backups automáticos.

Adicionaria índices nas colunas mais usadas em filtros e ordenações

### Frontend
Usaria keep-alive ou armazenaria dados da requisição no JavaScript para manter informações em cache

Melhorar a estrutura dos componentes

Aplicar validação de formulário para o aluno

Melhorar a responsividade e acessibilidade

Integrar ferramenta de monitoramento (Sentry)


