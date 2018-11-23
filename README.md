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

To create a new post simply perform the following query:

```
createPost(author: "Ethan", time_created: "yesterday", content: "I love apps.") {
    id
    author
    time_created
    content
}
```

To access data from one or multiple posts:

```
{
    posts {
        author
        content
    }
}
```

If you'd like to limit the amount of posts returned:

```
{
    posts(first: 5) {
        author
        content
    }
}
```

This will give you the author and content for the first 5 posts, you can also use the last keyword to get the most recently created posts.