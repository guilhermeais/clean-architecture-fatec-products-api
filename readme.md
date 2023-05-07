# Products API com Clean Architecture, DDD, TDD

## Api realizada em uma atividade da FATEC
A proposta era implementar uma API simples de produtos, resolvi me desafiar e implementar conceitos de DDD e Clean Architecture e TDD.

# Como rodar:

## Migrations
Módulo de migrations para a implementação postgres
- `npm run pg:migrate:up`: Sobe as migrations
- `npm run pg:migrate:down`: Apaga as migrations

## Aplicação
- `npm run start:dev`: "Sobe a aplicação em dev"

## Testes
- `npm run test:unit`: "Roda os testes unitários";
- `npm run test:integration`: "Roda os testes integration (necessário docker para subir o postgres)"