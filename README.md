# url-shortener
> Uma aplicação que encurta URLs.

  O projeto é um encurtador de URLs. Dada uma URL grande, que consome muitos caractéres, o serviço lhe devolve uma URL curta que é guardada no repositório (MongoDB). Após isso, com chamadas de API é possível deletar, recuperar a URL curta e ser redirecionado quando esta é colocada diretamente no navegador.

![](../header.png)

## Instalação

> Vamos de docker!

  O projeto encontra-se no [docker-hub](https://hub.docker.com/repository/docker/joaogmm/url-shortener-image), portanto é possível fazer o pull do projeto a parte.
 
  A maneira mais fácil é baixar o [docker-compose.yml](docker-compose.yml) e do terminal, na pasta onde o arquivo foi baixado, executar:

```sh
docker-compose up
```
Após isso o projeto e todas suas dependências devem estar instalador no seu docker local, é possível verificar executando:
```sh
docker images
docker-compose images
```
<br />

> Quero fazer do jeito difícil :D

  Primeiramente é necessário fazer o clone do projeto para seu repositório local:

```sh
git clone https://github.com/joaogmm/url-shortener
```
  Dentro do repoitório, executar o npm-install
```sh
npm install
```
  Por fim, ter o mongodb instalado e a configuração correta no [.env](src/main/config/env.ts)
```sh
'mongodb://localhost:27017/url-shortener'
```

## Testes
> Seguindo as instalações do Docker ou Git, pricipalmente na parte do npm install, é possível fazer testes com o jest.

Se a instalação foi feita no docker, certifique-se de que o docker-compose está rodando em:
```sh
docker-compose images
```

Para mostrar todos testes feito com sua respectiva descrição:
```sh
docker exec url-shortener_web_1 npm run test:verbose
```
Para mostrar o teste de integração com a cobertura da aplicação:
```sh
ocker exec url-shortener_web_1 npm run test:ci
```
Teste unitário:
```sh
ocker exec url-shortener_web_1 npm run test:unit
```

## Desenho da arquitetura

A arquitetura que utilizei para o projeto foi em camadas, seguindo fielmente os conceitos do SOLID.
