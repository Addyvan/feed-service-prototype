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

    var userArg = {
        connect: null
    };

    if (args.user.id) {
        userArg.connect = {
            id: args.user.id
        }
    }

    if (args.user.username) {
        userArg.connect = {
            username: args.user.username
        }
    }

    var groupArg = {
        connect: null
    };

    if (args.group.id) {
        groupArg.connect = {
            id: args.group.id
        }
    }

    if (args.group.name) {
        groupArg.connect = {
            name: args.group.name
        }
    }


    createPostData = {
        user: userArg,
        group: groupArg,
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

    sendMessageToRabbitMQ('delete', JSON.stringify({id: args.id}));
    return await context.prisma.mutation.deletePost({
        where:{
            id: args.id
        }
    });

}

async function updateGroupDescription(_, args, context, info) {

    var groupArg = {
        where: null
    };

    if (args.group.id) {
        groupArg.where = {
            id: args.group.id
        }
    }

    if (args.group.name) {
        groupArg.where = {
            name: args.group.name
        }
    }

    var updateGroupData = {
        description: args.description
    };

    return await context.prisma.mutation.updateGroup({
        where: groupArg.where,
        data: updateGroupData
    });

}

async function addUserToGroup(_, args, context, info) {

    var updateUserData = {};

    var userArg = {
        where: null
    };

    if (args.user.id) {
        userArg.where = {
            id: args.user.id
        }
    }

    if (args.user.username) {
        userArg.where = {
            username: args.user.username
        }
    }

    const currentUser = await context.prisma.query.user(userArg);
    
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

    var userArg = {
        where: null
    };

    if (args.user.id) {
        userArg.where = {
            id: args.user.id
        }
    }

    if (args.user.username) {
        userArg.where = {
            username: args.user.username
        }
    }

    const currentUser = await context.prisma.query.user(userArg);
    
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

function createComment(_, args, context, info) {
    var createCommentData = {};

    var userArg = {
        connect: null
    };

    if (args.user.id) {
        userArg.connect = {
            id: args.user.id
        }
    }

    if (args.user.username) {
        userArg.connect = {
            username: args.user.username
        }
    }

    createCommentData = {
        user: userArg,
        post: {
            connect: {
                id: args.postid
            }
        },
        content: args.content
    };

    if (args.parentCommentID) {
        createCommentData.parentComment = {
            connect: {
                id: args.parentCommentID
            }
        }
    }
    
    sendMessageToRabbitMQ('create', JSON.stringify(createCommentData));

    return context.prisma.mutation.createComment({
        data: createCommentData,
        }, info);

}

async function deleteComment(_, args, context, info) {

    sendMessageToRabbitMQ('delete', JSON.stringify({id: args.id}));
    return await context.prisma.mutation.deleteComment({
        where:{
            id: args.id
        }
    });

}

module.exports = {
    createUser,
    createGroup,
    createPost,
    createComment,
    deletePost,
    deleteComment,
    updateGroupDescription,
    addUserToGroup,
    removeUserFromGroup,
    likePost,
    unlikePost
};