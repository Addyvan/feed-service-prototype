var sendMessageToRabbitMQ = require('../../rabbitmq-graphql/send-message');

function createUser(_, args, context, info) {
    var createUserData = {};

    createUserData = {
        username: args.username
    };

    sendMessageToRabbitMQ('create', JSON.stringify(createUserData));

    return context.prisma.mutation.createUser({
        data: createUserData,
        }, info);
}

function createGroup(_, args, context, info) {
    var createGroupData = {};

    createGroupData = {
        name: args.name
    };

    if (args.description) {
        createGroupData["description"] = args.description;
    }

    sendMessageToRabbitMQ('create', JSON.stringify(createGroupData));

    return context.prisma.mutation.createGroup({
        data: createGroupData,
        }, info);
}

function createPost(_, args, context, info) {
    var createPostData = {};

    createPostData = {
        owner: args.owner,
        group: args.group,
        tags: args.tags,
        content: args.content
    };

    sendMessageToRabbitMQ('create', JSON.stringify(createPostData));

    return context.prisma.mutation.createPost({
        data: createPostData,
        }, info);
}

async function deletePost(_, args, context, info) {

    sendMessageToRabbitMQ('deletePost', JSON.stringify({id: args.id}));
    return await context.prisma.mutation.deletePost({
        where:{
            id: args.id
        }
    });

}

module.exports = {
    createUser,
    createGroup,
    createPost,
    deletePost
};