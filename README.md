# feed-service-prototype
A prototype for a content feed backend 

## Install

Run:
- `sudo docker-compose up`
- `npm install`
- `cd prisma`
- `yarn prisma deploy`
- `cd ..`
- `node ./src/index`

You can now access the playground at `http://localhost:4000/playground` and your graphql endpoint is `http://localhost:4000/graphql`.

## Example queries

See the `populate.graphql` field in the example-queries folder for examples on how to quickly get started.

## RabbitMQ

You can access the message queue interface at `http://localhost:15672` with the username `user` and password `bitnami`.
