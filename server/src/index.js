const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
    link: (root,args) => {
      return context.db.query.links({id: args.id}, info)
    }
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info)
    },
    updateLink: (root, args, context, info)=>{
      return context.db.mutation.updateLink({
        data: {
          url: args.url,
          description: args.description,
        },
        where: {
          id: args.id
        }
      }, info)
    },
    deleteLink: (root, args, context, info)=>{
      return context.db.mutation.deleteLink({
        where: {
          id: args.id
        },
      }, info)
    },
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/aman-singla/database/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})