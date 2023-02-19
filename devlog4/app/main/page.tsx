import React from "react";
import List, {} from './List';

type Props = {};

const Main = async ({}: Props) => {

  const listData = await getListData();
  const userData = await getUsersData();

  const data = await Promise.all([listData, userData]);

  return (
    <>
      <List data={data}></List>
    </>
  );
}

export default Main;

const BASE_URL = "https://fakestoreapi.com";
const getListData = async () => {
  const res = await fetch(`${BASE_URL}/products`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${BASE_URL}/products`,
    },
  });
  return res.json();
}

const getUsersData = async () => {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${BASE_URL}/users`,
    },
  });
  return res.json();
}