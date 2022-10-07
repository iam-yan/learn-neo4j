import { config } from "dotenv";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer, gql } from "apollo-server";

// Load config from .env
config();

const typeDefs = gql`
  type Author {
    name: String
  }

  type Book {
    title: String
    author: Author
  }
`;

const { DB_URI, DB_USER, DB_PASSWORD } = process.env;
if (!DB_URI || !DB_USER || !DB_PASSWORD) {
  throw new Error("Cant find required data in your env file.");
}

const driver = neo4j.driver(DB_URI, neo4j.auth.basic(DB_USER, DB_PASSWORD));

function context({ event, context }: { event: any; context: any }): any {
  return {
    event,
    context,
    driver,
  };
}

new Neo4jGraphQL({
  typeDefs,
})
  .getSchema()
  .then((schema) => {
    const server: ApolloServer = new ApolloServer({
      schema,
      context,
    });
    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  });
