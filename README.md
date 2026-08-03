# Atlas of Memories
## Sobre

O Atlas of Memories é uma aplicação full stack para criação e gerenciamento de notas.

O sistema permite que usuários criem uma conta, façam login, criem, editem, excluam e favoritem notas pessoais. Também conta com recuperação de senha via e-mail.

Toda a aplicação foi desenvolvida utilizando uma arquitetura baseada em containers Docker, separando frontend, backend e banco de dados.

Este projeto foi desenvolvido com o objetivo de praticar o desenvolvimento de uma aplicação full stack.


## Demonstração
<img width="1600" height="710" alt="Demonstração Atlas of Memories Acelerado" src="https://github.com/user-attachments/assets/811959e6-3b9a-4375-9fa2-831d563ad8df" />

## Funcionalidades
- Cadastro de usuários
- Login utilizando JWT
- Recuperação de senha por e-mail
- Criação de notas
- Edição de notas
- Exclusão de notas
- Favoritar notas
- Pesquisa por título
- Filtro por notas favoritas
- Interface responsiva

## Tecnologias
### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript

### Banco de dados
- MySQL

### Infraestrutura
- Docker
- Docker Compose

Cada serviço é executado em seu próprio container Docker, permitindo uma separação clara entre frontend, backend e banco de dados.

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/CarlosArthurAndrade/Atlas-of-Memories.git
```
### 2. Acesse a pasta do projeto
```bash
cd Notes-Project
```
### 3. Configure as variáveis de ambiente
Crie o arquivo `.env` no backend seguindo as instruções do env.exemplo.

### 4. Inicie os containers

```bash
docker compose up --build
```

### 5. Acesse a aplicação

Frontend:

```text
http://localhost:3000
```
