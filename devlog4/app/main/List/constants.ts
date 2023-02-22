export const BASE_URL = (queryString?: string): string => {
  return `https://fakestoreapi.com${queryString || ''}`;
}

export const IMG_URL = (queryString?: string): string => {
  const ACCESS_KEY = "T3sLTB3G47UuyREXMlsQeVPnfUqV7hp47FbcHdUF5NU";
  return `https://api.unsplash.com/search/photos?page=1&query=${queryString || ''}&client_id=${ACCESS_KEY}&orientation=landscape&per_page=20`
}