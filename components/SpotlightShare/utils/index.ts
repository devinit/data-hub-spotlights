import { BitlyLink } from 'bitly/dist/types';
import fetch from 'isomorphic-unfetch';

export const getShortUrl = async (rootOnly = false): Promise<BitlyLink> => {
  const { href, origin, pathname } = window.location;
  const longUrl = rootOnly ? origin + pathname : href;

  return await fetch(`${origin}/bitly?longUrl=${longUrl.replace('localhost', '127.0.0.1')}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(({ shortUrl, error }) => {
      if (error) {
        throw new Error(error);
      }

      return shortUrl;
    });
};
