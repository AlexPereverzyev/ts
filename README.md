# TypeScript Template

TypeScript Web app template based on Koa Web framework, enhanced with all required development tools.

## Dev Stack

- Node.js 14+
- Visual Studio Code
- ESLint
- Prettier
- Mocha Test Explorer
- Docker

## Basic Usage

```
npm install
npm run build
npm start
```

## OpenAPI UI

Swagger UI is hosted on root path:

```
http://localhost:8080/
```

## Docker Builds

```
docker build . -t template-ts:test --target=test
docker run --name template-ts-test -d template-ts:test
docker build . -t template-ts:runtime --target=runtime
docker run --name template-ts-runtime -p 8080:8080 -d template-ts:runtime
```
