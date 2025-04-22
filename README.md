# Projeto de Gerenciamento de Alunos - Grupo A

## Observação

> Não é necessário configurar variáveis de ambiente — elas já estão definidas no projeto.

---

## Banco de Dados

Foi utilizado **MySQL** como banco de dados, **sem uso de ORM**, visando uma abordagem mais simples e direta.

### Estrutura do Banco


```sql
CREATE DATABASE grupo_a_db;
USE grupo_a_db;

### Tabelas
CREATE TABLE usuarios (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    perfil ENUM('admin') DEFAULT 'admin',   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE alunos (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    ra VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

### Procedure
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_alunos`(
    IN p_filtro_nome VARCHAR(255),
    IN p_filtro_email VARCHAR(255),
    IN p_filtro_cpf VARCHAR(20),
    IN p_filtro_ra VARCHAR(50),
    IN p_pagina INT,
    IN p_limite INT
)
BEGIN
    DECLARE p_offset INT;
    SET p_offset = (p_pagina - 1) * p_limite;

    SET @base_sql = CONCAT(
        ' FROM alunos WHERE 1=1 ',
        IF(p_filtro_nome IS NOT NULL AND p_filtro_nome != '', CONCAT('AND nome LIKE "%', p_filtro_nome, '%" '), ''),
        IF(p_filtro_email IS NOT NULL AND p_filtro_email != '', CONCAT('AND email LIKE "%', p_filtro_email, '%" '), ''),
        IF(p_filtro_cpf IS NOT NULL AND p_filtro_cpf != '', CONCAT('AND cpf LIKE "%', p_filtro_cpf, '%" '), ''),
        IF(p_filtro_ra IS NOT NULL AND p_filtro_ra != '', CONCAT('AND ra LIKE "%', p_filtro_ra, '%" '), '')
    );

    SET @sql_dados = CONCAT(
        'SELECT *', @base_sql,
        ' ORDER BY created_at ASC ',
        ' LIMIT ', p_limite, ' OFFSET ', p_offset
    );

    SET @sql_total = CONCAT(
        'SELECT COUNT(*) as total', @base_sql
    );

    PREPARE stmt1 FROM @sql_dados;
    EXECUTE stmt1;
    DEALLOCATE PREPARE stmt1;

    PREPARE stmt2 FROM @sql_total;
    EXECUTE stmt2;
    DEALLOCATE PREPARE stmt2;
END$$

DELIMITER ;
```

##  Frontend

### Instalação
```bash
cd front
npm install
```
### Estrutura de Pastas
```bash
front/
├── views/           # Páginas
├── components/      # Componentes reutilizáveis
├── composables/     # Lógica reutilizável (hooks)
├── stores/          # Estado global (Pinia)
├── router/          # Configuração das rotas
├── models/          # Modelos de dados
└── utils/           # Utilitários
```

### Executar Projeto 
```bash
npm run dev    
npm run build  
```


##  Backend

### Instalação
```bash
cd back
npm install
```
### Estrutura de Pastas
```bash
back/
├── controllers/    # Controladores de rotas
├── repositories/   # Acesso a dados (DAO)
├── schemas/        # Validação com Zod
├── interfaces/     # Interfaces TypeScript
├── types/          # Tipos personalizados
├── middlewares/    # Middleware (auth, roles)
├── utils/          # Utilidades
└── routes/         # Definição de rotas
```

### Executar Projeto 
```bash
npm run dev    
npm run build  
```
