var sendMessageToRabbitMQ = require('../../rabbitmq/send-message');


function createPost(_, args, context, info) {
    var createPostData = {};

    sendMessageToRabbitMQ('createPost', 'test');

    createPostData = {
        author: args.author,
        time_created: args.time_created,
        content: args.content
    };

    return context.prisma.mutation.createPost({
        data: createPostData,
        }, info)
}

module.exports = {
    createPost
}