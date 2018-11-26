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

async function addUserToGroup(_, args, context, info) {

    var updateUserData = {};
    var updateGroupData = {};

    const currentUser = await context.prisma.query.user(
        {
            where: {
                username: args.user.username
            }            
        });
    
    if (currentUser == null | undefined){
        throw new Error(`Could not find profile with gcId ${args.user.username}`)
    }

    const currentGroup = await context.prisma.query.group(
        {
            where: {
                name: args.group.name
            }            
        });

    if (currentGroup == null | undefined){
        throw new Error(`Could not find profile with gcId ${args.group.name}`)
    }

    // add group to user's subscribed groups
    if (currentUser.groups) {
        updateUserData.groups = currentUser.groups;
        updateUserData.groups.push({
            connect: {
                name: currentGroup.name
            }
        }); 
    } else {
        updateUserData.groups = {
            connect: {
                name: currentGroup.name
            }
        }
    }

    // add user to group's members list
    if (currentGroup.members) {
        updateGroupData.groups = currentGroup.members;
        updateGroupData.members.push({
            connect: {
                username: currentUser.username
            }
        }); 
    } else {
        updateGroupData.members = {
            connect: {
                username: currentUser.username
            }
        }
    }
    
    await context.prisma.mutation.updateGroup({
        where: {
            name: args.group.name
        },
        data: updateGroupData
    });

    return await context.prisma.mutation.updateUser({
        where:{
            username: args.user.username
        },
        data: updateUserData
    });

}

async function removeUserFromGroup(_, args, context, info) {

    var updateUserData = {};
    var updateGroupData = {};

    const currentUser = await context.prisma.query.user(
        {
            where: {
                username: args.user.username
            }            
        });
    
    if (currentUser == null | undefined){
        throw new Error(`Could not find profile with gcId ${args.user.username}`)
    }

    const currentGroup = await context.prisma.query.group(
        {
            where: {
                name: args.group.name
            }            
        });

    if (currentGroup == null | undefined){
        throw new Error(`Could not find profile with gcId ${args.group.name}`)
    }

    // add group to user's subscribed groups
    if (currentUser.groups) {
        updateUserData.groups = currentUser.groups;
        console.log(updateUserData);
        updateUserData.groups.push({
            disconnect: {
                name: currentGroup.name
            }
        }); 
    }

    // add user to group's members list
    if (currentGroup.members) {
        updateGroupData.groups = currentGroup.members;
        updateGroupData.members.push({
            disconnect: {
                username: currentUser.username
            }
        }); 
    }
    
    await context.prisma.mutation.updateGroup({
        where: {
            name: args.group.name
        },
        data: updateGroupData
    });

    return await context.prisma.mutation.updateUser({
        where:{
            username: args.user.username
        },
        data: updateUserData
    });

}



module.exports = {
    createUser,
    createGroup,
    createPost,
    deletePost,
    addUserToGroup,
    removeUserFromGroup
};