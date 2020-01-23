import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://127.0.0.1:8000/graphql' // FIXME: replace with server URL
});

export const graphClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});
