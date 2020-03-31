import { BitlyLink } from 'bitly/dist/types';
import fetch from 'isomorphic-unfetch';

export const getShortUrl = async (): Promise<BitlyLink> => {
  const { href, origin } = window.location;

  return await fetch(`${origin}/bitly?longUrl=${href.replace('localhost', '127.0.0.1')}`)
    .then(response => response.json())
    .then(({ shortUrl }) => shortUrl);
};
