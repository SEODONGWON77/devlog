import React from "react";
import List from './List';

type Props = {};

const Main = async ({}: Props) => {

  const listData = await getListData();
  const imgData = await getImgData();

  const data = await Promise.all([listData, imgData]);

  return (
    <>
      <List data={data}></List>
    </>
  );
}

export default Main;

const BASE_URL = (queryString?: string): string => `https://fakestoreapi.com${queryString || ''}`;
const IMG_URL = (queryString?: string): string => {
  const ACCESS_KEY = "T3sLTB3G47UuyREXMlsQeVPnfUqV7hp47FbcHdUF5NU";
  return `https://api.unsplash.com/search/photos?page=1&query=${queryString || ''}&client_id=${ACCESS_KEY}&orientation=landscape&per_page=20`
}

const getListData = async () => {
  const url = `${BASE_URL('/products')}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${url}`,
    },
  });
  return res.json();
}

const getImgData = async () => {
  const url = IMG_URL();
  const res = await fetch(`${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${url}`,
    },
  });
  return res.json();
}