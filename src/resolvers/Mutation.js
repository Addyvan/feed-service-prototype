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
        owner: {
            connect: {
                username: args.owner.username
            }
        },
        group: {
            connect: {
                name: args.group.name
            }
        },
        tags: args.tags,
        content: args.content,
        likedBy: [],
        sharedBy: []
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

async function addUserToGroup(_, args, context, info) {

    var updateUserData = {};

    const currentUser = await context.prisma.query.user(
        {
            where: {
                username: args.user.username
            }            
        });
    
    if (currentUser == null | undefined){
        throw new Error(`Could not find profile with username ${args.user.username}`)
    }

    updateUserData.groups = {
        connect: {
            name: args.group.name
        }
    }
    
    return await context.prisma.mutation.updateUser({
        where:{
            username: args.user.username
        },
        data: updateUserData
    });

}

async function removeUserFromGroup(_, args, context, info) {

    var updateUserData = {};

    const currentUser = await context.prisma.query.user(
        {
            where: {
                username: args.user.username
            }            
        });
    
    if (currentUser == null | undefined){
        throw new Error(`Could not find profile with username ${args.user.username}`)
    }

    updateUserData.groups = {
        disconnect: {
            name: args.group.name
        }
    }
    
    return await context.prisma.mutation.updateUser({
        where:{
            username: args.user.username
        },
        data: updateUserData
    });

}

async function likePost(_, args, context, info) {

    var updatePostData = {
        likedBy: {
            connect: {
                username: args.user.username
            }
        }
    };

    return await context.prisma.mutation.updatePost({
        where: {
            id: args.postid
        },
        data: updatePostData
    });

}

async function unlikePost(_, args, context, info) {

    var updatePostData = {
        likedBy: {
            disconnect: {
                username: args.user.username
            }
        }
    };

    return await context.prisma.mutation.updatePost({
        where: {
            id: args.postid
        },
        data: updatePostData
    });

}

module.exports = {
    createUser,
    createGroup,
    createPost,
    deletePost,
    addUserToGroup,
    removeUserFromGroup,
    likePost,
    unlikePost
};