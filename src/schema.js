const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    posts(id: ID, first: Int, last: Int): [Post]!
    users(id: ID, username: String): [User]!
    groups(id: ID, name: String): [Group]!
    post(id: ID!): Post!
    user(id: ID, username: String): User
    group(id: ID, name: String): Group
}

type Mutation {
    createUser(username: String!): User!
    createGroup(name: String!, description: String): Group!
    createPost(user: UserInput!, group: GroupInput!, tags: String, content: String!): Post!
    createComment(user: UserInput!, postid: ID!, content: String!, parentCommentID: ID): Comment!
    deletePost(id: ID!): Boolean!
    deleteComment(id: ID!): Boolean!
    addUserToGroup(user: UserInput!, group: GroupInput!): User!
    removeUserFromGroup(user: UserInput!, group: GroupInput!): User!
    likePost(user: UserInput!, postid: ID!): Post!
    unlikePost(user: UserInput!, postid: ID!): Post!
}

type User {
    id: ID!
    createdAt: String!
    updatedAt: String!
    username: String!
    posts: [Post]!
    groups: [Group]!
}

type Group {
    id: ID!
    createdAt: String!
    updatedAt: String!
    name: String!
    description: String
    members: [User]!
    posts(first: Int, last: Int): [Post]!
}

type Post {
    id: ID!
    createdAt: String!
    updatedAt: String!
    tags: [String!]!
    user: User!
    group: Group!
    content: String!
    likedBy: [User]!
    sharedBy: [User]!
    comments: [Comment]!
}

type Comment {
    id: ID! 
    createdAt: String!
    updatedAt: String!
    user: User!
    post: Post!
    parentComment: Comment
    content: String!
    likedBy: [User]!
}

input UserInput {
    id: ID
    username: String
}

input GroupInput {
    id: ID
    name: String
}
`

module.exports = typeDefs;