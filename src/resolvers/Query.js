function group(_, args, context, info) {
  return context.prisma.query.posts(
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
  group
};