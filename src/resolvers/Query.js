function posts(_, args, context, info) {
    return context.prisma.query.posts(
      {
        where:{
          id: args.id,
          author: args.author,                
        },
        skip: args.skip,
        first: args.first,        
      },
      info
      )
}

module.exports = {
    posts
}