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

## Current queries


```
mutation CreateGroupExample {
    createGroup(name: "mygroupname", description: "myoptionalgroupname") {
        name
        description
    }
}
```

```
mutation CreateUserExample {
    createUser(username: "myusername") {
        username
    }
}
```

```
mutation CreatePostExample {
    #NOT SURE YET!
}
```


## RabbitMQ

You can access the message queue interface at `http://localhost:15672` with the username `user` and password `bitnami`.