function posts(_, args, context, info) {
  return context.prisma.query.posts(
    {
      where:{
        id: args.id            
      },
      skip: args.skip,
      first: args.first,        
    },
    info
    );
}

function users(_, args, context, info) {
  return context.prisma.query.users(
    {
      where:{
        id: args.id,
        username: args.username,                
      },
      skip: args.skip,
      first: args.first,        
    },
    info
    );
}

function groups(_, args, context, info) {
  return context.prisma.query.groups(
    {
      where:{
        id: args.id,
        name: args.name,                
      },
      skip: args.skip,
      first: args.first,        
    },
    info
    );
}

function post(_, args, context, info) {
  return context.prisma.query.post(
    {
      where:{
        id: args.id            
      },
      skip: args.skip,
      first: args.first,        
    },
    info
    );
}

function user(_, args, context, info) {
  return context.prisma.query.user(
    {
      where:{
        id: args.id,
        username: args.username,                
      },
      skip: args.skip,
      first: args.first,        
    },
    info
    );
}

function group(_, args, context, info) {
  return context.prisma.query.group(
    {
      where:{
        id: args.id,
        name: args.name,                
      },
      skip: args.skip,
      first: args.first,        
    },
    info
    );
}

module.exports = {
  posts,
  users,
  groups,
  post,
  user,
  group
};