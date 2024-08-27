# CRUD Api For Students With ReactJS

## Como funciona a aplicação:
A aplicação foi desenvolvida utilizando o framework ReactJS para o frontend e CodeIgniter 4 para o backend. A aplicação consiste em um CRUD de alunos, onde é possível cadastrar, listar, editar e deletar alunos.
No frontend, é possível visualizar a lista de alunos, adicionar um novo aluno, editar um aluno existente e deletar um aluno por meio de rotas autenticadas.

O sistema utiliza o AuthContext do React para autenticar e manter o usuário logado por meio de um token no localStorage, e o Axios para fazer as requisições para a API.
Além disso, foi utilizado DaisyUI e tailwindcss para estilizar a aplicação.

## Instalação do projeto
Para baixar usa-se `git clone https://github.com/Antoniosrt/CrudStudentsWithReact` entre no diretorio e rode o comando `npm install`.

## Configuração do Ambiente
Para configurar o ambiente, é necessário alterar a baseURL da API no arquivo api.js dentro de src/data/services para o endereço da sua API. Por padrão, está configurado para `http://localhost:8080`.

## Rodando a aplicação
Para rodar a aplicação, basta rodar o comando `npm run dev` na raiz do projeto. Isso irá iniciar um servidor de desenvolvimento em `http://localhost:5173` ou em outra porta caso a 5173 esteja ocupada.

## Aplicação 
A aplicação possui as seguintes rotas configuradas no React Router:
- / - Rota inicial com o login
- /home - Rota para listar os alunos
- /student/ - Rota para adicionar um novo aluno
- /student/:id - Rota para editar ou deletar um aluno


## Relatório

O desenvolvimento da aplicação foi feito em 3 etapas:
1. Criação das rotas e autenticacão
2. Criação das principais funcionalidades
3. Componentização e estilização 

O sistema de CRUD dos estudantes foi implementado utilizando uma mesma estrutura de formulário
para adicionar e editar um aluno. De maneira que, ao acessar a rota /student/ é possível adicionar um novo aluno, e ao acessar a rota /student/:id é possível editar ou deletar um aluno.
Porém, como melhoria, com tempo, modularizaria mais ainda o código, separando a lógica de adicionar e editar em componentes diferentes.
Decidi por deixar os console.log para validação de testes e funcionalidades.