import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  fetch: fetch as any // window.fetch and node-fetch have conflicting typings
});

export const graphClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});
