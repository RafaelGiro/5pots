
# 5Pots

> Portal de notícias de League of Legends

![5PotsSite](https://imgur.com/n7KVuuj.png)

<br>

## 🚀 Getting Started


O projeto é um monorepo em Lerna com Yarn Workspaces, por isso instale o [Yarn](https://classic.yarnpkg.com/en/docs/install/) junto com o [Node](https://nodejs.org/en/). Para usar o banco de dados local, apenas instale o [MongoDB](https://docs.mongodb.com/manual/installation/) no seu PC.

Clone o projeto
```
git clone https://github.com/RafaelGiro/5pots
```

Entre na pasta
```
cd 5pots
```

Instale as dependências
```
yarn
```

Linke as dependências com o bootstrap do Lerna
```
yarn bootstrap
```

Inicie o front e servidor
```
yarn dev
```
---
Aqui ambos front e back estão de pé, porém precisamos adicionar as variáveis de ambiente:

Adicione o arquivo **.env.local** na pasta **client** com as seguintes chaves:
```
NEXT_PUBLIC_RECAPTCHA={sua chave no google recaptcha}
API_URI=http://localhost:5000/
NEXT_PUBLIC_API_URI=http://localhost:5000/
```
 
Para o servidor, adicione o arquivo **dev.js** na pasta **server/src/config**
```
expodefault {

googleClientID: {seu client ID no google},
googleClientSecret: {seu client secret no google},
mongoURI: "mongodb://localhost:27017/5pots-dev",
cookieKey: {uma string pra desenvolvimento}
facebookClientID: {seu client ID no facebook},
facebookClientSecret: {seu client secret no facebook},
sendgridUsername: {seu email cadastrado no sendgrid},
sendgridPassword: {senha do cadastro do sendgrid},
sendgridEmail: {email que vai enviar os emails de recuperação de senha},
};
```

<br>

## ⚙️ Feito com

- Front-end

  -  [React](https://pt-br.reactjs.org/)

  -  [Nextjs](https://nextjs.org/)

  -  [SCSS Modules](https://sass-lang.com/guide)

- Back-end

  -  [Node.js](https://nodejs.org/en/)

  -  [Express](https://expressjs.com/pt-br/)

  -  [MongoDB](https://www.mongodb.com/)


## ✔️ À fazer

Verifique nossos [issues](https://github.com/RafaelGiro/5pots/issues)!

<br>

## ⚡️ Contribuindo

1. Clone o projeto

2. Crie uma branch com nome da sua funcionalidade (`git checkout -b feature/fooBar`)

3. Commit suas mudanças (`git commit -am 'Add some fooBar'`)

4. Push a branch (`git push origin feature/fooBar`)

5. Crie um Pull Request