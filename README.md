# Sejam bem vindos ao repositório API Loja de Sucos

Este projeto foi completamente desenvolvido em TypeScript, utilizando Node.js, Express, Cors, Mongoose, MongoDB e outras bibliotecas auxiliares como Joi, bcrypt e Docker. 🚀

Esta API foi desenvolvida seguindo o paradigma de programação orientada a objetos, aderindo aos princípios do SOLID e seguindo uma arquitetura composta por uma camada adicional, conhecida como Domain, que foi previamente definida antes do início do desenvolvimento do projeto, para assegurar a manutenção e respeito a esses princípios.

Na arquitetura das camadas, possui uma camada `Controller` responsável por tratar possíveis erros e validações antes de encaminhar as requisições para a camada de Service. Além disso, a camada de `Service` é onde se encontram a maior parte das regras de negócio e onde é possível acessar o repositório ou ODM (Object-Document Mapping) que possui as funções para interagir com o banco de dados MongoDB, utilizando a biblioteca Mongoose.

Neste projeto, optou-se por não utilizar o padrão de projeto <strong>Repository</strong>, sendo substituído por uma camada chamada `Model`, que difere um pouco das models tradicionais. Foram utilizados ODMs, onde cada uma delas, além de ser uma extensão de uma classe abstrata AbstractODM, também é responsável apenas por criar um schema do MongoDB. Os métodos genéricos para realizar operações de CRUD básico estão efetivamente implementados na classe abstrata AbstractODM.

Além disso, o projeto também conta com outras camadas, como `Rotas` para definir as rotas da API, `Config` para configurar a conexão com o banco de dados, `Middlewares` tratar interceptações de requisições e respostas, `Interfaces` para definir as interfaces utilizadas no projeto, `Validations` com os schemas de validação do Joi para garantir a integridade dos dados, e `Utils` com algumas funções auxiliares para facilitar o desenvolvimento do projeto.

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 3 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MongoDB já configurado no docker-compose através de um serviço definido como `mongodb`.
  - Tem o papel de fornecer dados para o serviço de _backend_.

2️⃣ **Back-end:**
 - Será o ambiente que você realizará a maior parte das implementações exigidas.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação vai ser inicializada a partir do arquivo `src/server.ts`; 

3️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend e db) e subir a API completa com o comando `docker-compose up -d`;
  - Você deve  **verificar** se a configuração do `Dockerfile` está correta nas raíz do `PROJETO-MJV`, para conseguir inicializar a aplicação;

</details><br />

# Orientações

## Antes de começar a desenvolver
👀 Leia essa parte atentamente, pois aqui você encontrará informações importantes para rodar corretamente o projeto.

<details>
<summary><strong> 🔰 Pré-requisitos </strong></summary><br />

  1. 📦 Node.js (v14 ou superior)
  2. 🐳 Docker e Docker Compose instalados na máquina

</details><br />

<details>
<summary><strong> 🔰 Configuração </strong></summary><br />

  1. Clone o repositório `Usar link SSH`
  * `git clone https://github.com/Gabrielja2/projeto-mjv.git`

  2. Entre na pasta do repositório que você acabou de clonar:
  * `cd pasta-do-repositório`
  
  3. Instale as dependências [**Caso existam**]
  * `npm install`  

  4. Configure as variáveis de ambiente se necessário:
  * Preencha as variáveis de, como a URL do banco de dados MongoDB: MONGO_URL= `mongodb://localhost:27017/mjv-projec` e a porta do servidor node: PORT = `3000`

  5. Inicie os containers do Docker:
  * `docker-compose up -d`

  6. Dentro do terminal da imagem do node, inicie o servidor em modo de desenvolvimento:
  * `npm run start-dev` 

</details><br />


# Rotas

## Autenticação
São as rotas para logar ou registrar um novo usuário

<details>
<summary><strong>Rota de Login</strong></summary>

* Método: POST
* URL: /user/login
* Descrição: Realiza o login de um usuário cadastrado.
* Parâmetros de entrada:
  * email: String (obrigatório) - E-mail do usuário.
  * password: String (obrigatório) - Senha do usuário.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo o token de autenticação do usuário.
</details><br />

<details>
<summary><strong>Rota de Registro</strong></summary>

* Método: POST
* URL: /user/register
* Descrição: Registra um novo usuário.
* Parâmetros de entrada:
  * username: String (obrigatório) - Nome do usuário.
  * email: String (obrigatório) - E-mail do usuário.
  * password: String (obrigatório) - Senha do usuário. 
* Resposta de sucesso:
  * Código: 201
  * Corpo: Objeto contendo o token de autenticação do usuário.
</details><br /><br />

# ⚠️ Rotas Protegidas por Autenticação

## User
As rotas a seguir exigem autenticação utilizando o token gerado no processo de login ou registro.

<details>
<summary><strong>Rota listar usuários</strong></summary>

* Método: GET
* URL: /user
* Descrição: Retorna as informações dos usuários.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo as informações dos usuários.
</details><br />

<details>
<summary><strong>Rota listar um usuário</strong></summary>

* Método: GET
* URL: /user/:id
* Descrição: Retorna as informações do usuário.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo as informações do usuário.
</details><br />

<details>
<summary><strong>Rota de atualização do usuário</strong></summary>

* Método: PUT
* URL: /user/:id
* Descrição: Atualiza as informações do usuário autenticado.
* Parâmetros de entrada:
  * username: String (opcional) - Novo nome do usuário.
  * email: String (opcional) - Novo e-mail do usuário.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo as informações atualizadas do usuário.
</details><br />

<details>
<summary><strong>Rota de exclusão do usuário</strong></summary>

* Método: DELETE
* URL: /user/:id
* Descrição: Exclui um usuário.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo uma mensagem de confirmação da exclusão.
</details><br />


## Rotas de Sucos

<details>
<summary><strong>Rota de Registro de Suco</strong></summary>

* Método: POST
* URL: /juice
* Descrição: Registra um novo suco na loja de sucos. Requer autenticação de um usuário.
* Parâmetros de entrada:
  * flavor: String (obrigatório) - Sabor do suco.
  * description: String (obrigatório) - Descrição do suco.
  * price: Number (obrigatório) - Preço do suco.
  * size: String (obrigatório) - Tamanho do copo de suco.
* Resposta de sucesso:
  * Código: 201
  * Corpo: Objeto contendo as informações do suco registrado.
</details><br />

<details>
<summary><strong>Rota de Listagem de Sucos</strong></summary>

* Método: GET
* URL: /juice
* Descrição: Retorna a lista de sucos cadastrados na loja de sucos.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Array contendo os objetos dos sucos cadastrados.
</details><br />

<details>
<summary><strong>Rota de Detalhes de Sucos</strong></summary>

* Método: GET
* URL: /juice/:id
* Descrição: Retorna os detalhes de um suco específico pelo seu ID.
* Parâmetros de entrada:
  * id: String (obrigatório) - ID do suco.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo as informações do suco específico.
</details><br />

<details>
<summary><strong>Rota de Atualização de Suco</strong></summary>

* Método: PUT
* URL: /juice/:id
* Descrição: Atualiza as informações de um suco específico pelo seu ID. Requer autenticação de um usuário com a função de vendedor.
* Parâmetros de entrada:
  * id: String (obrigatório) - ID do suco.
  * flavor: String (opcional) - Novo sabor do suco.
  * description: String (opcional) - Nova descrição do suco.
  * price: Number (opcional) - Novo preço do suco.
  * size:  String (opcional) - Novo tamanho do copo de suco.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo as informações atualizadas do suco específico.
</details><br />

<details>
<summary><strong>Rota de Exclusão de Suco</strong></summary>

* Método: DELETE
* URL: /juice/:id
* Descrição: Exclui um suco específico pelo seu ID. Requer autenticação de um usuário com a função de vendedor.
* Parâmetros de entrada:
  * id: String (obrigatório) - ID do suco.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo uma mensagem de confirmação da exclusão.
</details><br />


## Rotas de Pedidos

<details>
<summary><strong>Rota de Criação de Pedido</strong></summary>

* Método: POST
* URL: /order
* Descrição: Cria um novo pedido na loja de sucos. Requer autenticação de um usuário com a função de cliente.
* Parâmetros de entrada:
  * username: String (obrigatório) - Nome do usuário que está fazendo um pedido.
  * quantity: Number (obrigatório) - Quantidade do suco a ser adicionado ao pedido.
  * flavor: String (obrigatório) - Sabor do suco a ser adicionado ao pedido.
  * size: String (obrigatório) - Tamanho do copo de suco a ser adicionado ao pedido.
* Resposta de sucesso:
  * Código: 201
  * Corpo: Objeto contendo as informações do pedido criado.
</details><br />

<details>
<summary><strong>Rota de Listagem de Pedidos</strong></summary>

* Método: GET
* URL: /order
* Descrição: Retorna a lista de pedidos cadastrados na loja de sucos de um usuário específico. Requer autenticação de um usuário com a função de cliente.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Array contendo os objetos dos pedidos cadastrados pelo usuário.
</details><br />

<details>
<summary><strong>Rota de Detalhes de Pedido</strong></summary>

* Método: GET
* URL: /order/:id
* Descrição: Retorna os detalhes de um pedido específico pelo seu ID. Requer autenticação de um usuário com a função de cliente.
* Parâmetros de entrada:
  * id: String (obrigatório) - ID do pedido.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo as informações do pedido específico.
</details><br />

<details>
<summary><strong>Rota de Atualização de Pedido</strong></summary>

* Método: PUT
* URL: /order/:id
* Descrição: Atualiza as informações de um pedido específico pelo seu ID. Requer autenticação de um usuário com a função de cliente.
* Parâmetros de entrada:
  * id: String (obrigatório) - ID do pedido.
  * quantity: Number (opcional) - Nova quantidade de suco.
  * flavor: String (opcional) - Novo sabor do suco.
  * size: String (opcional) - Novo tamanho do copo de suco.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo as informações atualizadas do pedido específico.
</details><br />

<details>
<summary><strong>Rota de Exclusão de Pedido</strong></summary>

* Método: DELETE
* URL: /order/:id
* Descrição: Exclui um pedido específico pelo seu ID. Requer autenticação de um usuário com a função de cliente.
* Parâmetros de entrada:
  * id: String (obrigatório) - ID do pedido.
* Resposta de sucesso:
  * Código: 200
  * Corpo: Objeto contendo uma mensagem de confirmação da exclusão.
</details><br />

