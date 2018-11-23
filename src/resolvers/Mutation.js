//var sendMessageToRabbitMQ = require('../../rabbitmq/send-message');


function createPost(_, args, context, info) {
    var createPostData = {};

    //sendMessageToRabbitMQ('createPost', 'test');

    createPostData = {
        author: args.author,
        time_created: args.time_created,
        content: args.content
    };

    return context.prisma.mutation.createPost({
        data: createPostData,
        }, info)
}

async function deletePost(_, args, context, info) {
    return await context.prisma.mutation.deletePost({
        where:{
            id: args.id
        }
    })
}

module.exports = {
    createPost,
    deletePost
}