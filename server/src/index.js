const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root,args) => {
      return links.find(x => x.id == args.id)
    }
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },
    deleteLink: (root,args)=>{
      let index = links.findIndex(x=> x.id == args.id)
      let deletedLink  = links.splice(index,1)
      return deletedLink[0]
    },
    updateLink: (root,args)=>{
      let index = links.findIndex(x=> x.id == args.id)
      links[index].description = args.description
      links[index].url = args.url
      return links[index]
    },
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))