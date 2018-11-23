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

module.exports = {
  posts,
  users,
  groups
};