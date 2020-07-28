#Iniciando a aplicação :fire:
:memo: 

# Requerimentos

Para rodar a aplicação é necessário que você possua esses três programas:  Git, Node, Yarn

Também foram utilizados dois bancos de dados da aplicação:  Postgres, Redis

Porém, para facilitar, usamos o Docker para rodar os bancos de dados facilmente. Dentro dele siga estes passos:
**Instale uma imagem do Redis**

docker run --name fast-feet-redis -p 6379:6379 -d -t redis:alpine

**Instale uma imagem do Postgres**

docker run --name fast-feet-database -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres
(Neste caso, seu login e senha será: fastfeet)

**Inicie o Redis**

docker start fast-feet-redis

**Inicie o Postgres**

docker start fast-feet-database

:open_file_folder:

# Iniciando o Backend


Agora clone este repositório e instale suas dependências

**Clonando o repositório**

git clone https://github.com/gccinane/fast-feet.git

**Entrando na pasta do backend**

cd backend

instalando as dependências
yarn
Para que haja a conexão do backend com o banco de dados, você precisará colocar suas informações no arquivo .env, baseado no .env.example que está dentro do backend. Após isto, no terminal é necessário enviar as migrations para o banco de dados:


**Rodando as migrations para o banco**
yarn sequelize db:migrate

**Permitindo que haja o administrador no banco**

yarn sequelize db:seed:all

# Iniciando a aplicação

yarn dev & yarn queue
Após estes passos, você poderá iniciar o frontend ou o mobile!

Abra um terminal na pasta do frontend e digite:

yarn
yarn start
Use estes dados para realizar login na aplicação:

Email: admin@fastfeet.com
Senha: 123456
