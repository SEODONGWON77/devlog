import React from "react";
import List from './List';
import { BASE_URL, IMG_URL } from "./List/constants";

type Props = {};

const Main = async ({}: Props) => {

  const productsData = await getProductsData();
  // const imgData = await getImgData();

  const listData = await Promise.all([productsData]);

  return (
    <>
      <List data={listData}></List>
    </>
  );
}

export default Main;

const getProductsData = async () => {
  const url = `${BASE_URL('/products')}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${url}`,
    },
  });
  return res.json();
}

// const getImgData = async () => {
//   const url = IMG_URL();
//   const res = await fetch(`${url}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': `${url}`,
//     },
//   });
//   return res.json();
// }