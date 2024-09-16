# Gerenciamento de Tarefas API

Uma API desenvolvida para praticar autenticação e autorização, através de registro de usuários, login e acesso, fazendo o uso desses recursos para permitir que um usuário crie, leia, atualize e delete as tarefas que lhe pertencem.

Rode o comando abaixo para executar a migração do banco de dados:

```bash
npm run migrate:dev
```

**Será essencial ter um banco de dados criado e referenciado nas variáves de ambiente**

Rode o comando abaixo para iniciar a aplicação em modo de desenvolvimento:

```bash
nmp run dev
```

## Rotas de Usuário

### Registro de usuário POST /users

Padrão de corpo

```json
{
  "name": "Exemplo",
  "email": "exemplo@email.com",
  "password": "12345678"
}
```

```json
{
  "id": 1,
  "name": "Exemplo",
  "email": "exemplo@email.com"
}
```

Possíveis erros

409 CONFLICT - E-mail já registrado

```json
{
  "message": "This email is already registered"
}
```

### Login POST /users/login

Padrão de corpo

```json
{
  "email": "exemplo@email.com",
  "password": "12345678"
}
```

Padrão de resposta (STATUS 200)

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI0Nzg0NDYxfQ.8K5sOjUYLFUYTqcFi_r8vyKfmgvClrEZWv1LcpkBAmY",
  "user": {
    "id": 1,
    "name": "Exemplo",
    "email": "exemplo@email.com"
  }
}
```

Possíveis erros

401 UNAUTHORIZED - E-mail e senha não correspondem

```json
{
  "message": "Email and password do not match"
}
```

404 NOT FOUND - Usuário não registrado

```json
{
  "message": "User does not exist"
}
```

### Retornar usuário GET /users/profile

É necessário autorização para acessar essa rota, forneça o token no cabeçalho da requisição

Autorização

```json
{
  "headers": {
    "Authorization": "token"
  }
}
```

Padrão de resposta (STATUS 200)

```json
{
  "id": 1,
  "name": "Exemplo",
  "email": "exemplo@email.com"
}
```

Possíveis erros

401 UNAUTHORIZED

## Rotas de Tarefas

É necessário autorização para acessar estas rotas, forneça o token no cabeçalho da requisição

Autorização

```json
{
  "headers": {
    "Authorization": "token"
  }
}
```

Possíveis erros

401 UNAUTHORIZED

### Criação de tarefa POST /tasks

Padrão de corpo

```json
{
  "title": "Lorem ipsum",
  "content": "Lorem ipsum",
  "categoryId?": 1
}
```

Padrão de resposta (STATUS: 201)

```json
{
  "id": 1,
  "title": "Lorem ipsum",
  "content": "Lorem ipsum",
  "finished": false,
  "categoryId": 1
}
```

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
  "message": "Category not found"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Leitura de tarefas GET /tasks

Padrão de resposta (STATUS: 200)

```json
[
  {
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "category": {
      "id": 1,
      "name": "Estudo"
    }
  }
]
```

URL Search Params

| Parâmetro | Exemplo de uso         | Descrição                                                                        |
| --------- | ---------------------- | -------------------------------------------------------------------------------- |
| category  | /tasks?category=estudo | Forneça o "id" da categoria para trazer somente tarefas da categoria determinada |

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
  "message": "Category not found"
}
```

### Leitura de individual GET /tasks/:1

Padrão de resposta (STATUS: 200)

```json
{
  "id": 1,
  "title": "Lorem ipsum",
  "content": "Lorem ipsum",
  "finished": false,
  "category": {
    "id": 1,
    "name": "Estudo"
  }
}
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
  "message": "Task not found"
}
```

### Atualizar tarefa PATCH /tasks/:id

Padrão de corpo

```json
{
  "title?": "Lorem ipsum",
  "content?": "Lorem ipsum",
  "finished?": true,
  "categoryId?": 1
}
```

Padrão de resposta (STATUS: 200)

```json
{
  "id": 1,
  "title": "Lorem ipsum",
  "content": "Lorem ipsum",
  "finished": true,
  "categoryId": 1
}
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
  "message": "Task not found"
}
```

STATUS (404) - Categoria inválida

```json
{
  "message": "Category not found"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Excluir tarefa PATCH /tasks/:id

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
  "message": "Task not found"
}
```

### Criação de categoria POST /categories

Padrão de corpo

```json
{
  "name": "Example"
}
```

Padrão de resposta (STATUS 201)

```json
{
  "id": 1,
  "name": "Example"
}
```

#### Possíveis erros:

STATUS (409) quando o corpo não é compatível com o padrão

### Exclusão de categoria POST

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
  "message": "Category not found"
}
```
