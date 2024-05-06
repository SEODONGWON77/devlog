"use server";

import { db, sql } from "@vercel/postgres";
import { validateGetPostCardListResult } from "app/service/main/utils/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getUsers() {
  try {
    const client = await db.connect();
    // Create the "invoices" table if it doesn't exist
    console.log(`>>>>>>>>>>>>>>>>>>>>>> START >> SELECT "user_test" table`);
    const selectTable = await client.sql`SELECT
        name
        , email
        , password
       FROM user_test`;

    // console.log(`>>>>>>>>>>>>>>>>>>>>>> END >> SELECT "user_test" table: ${JSON.stringify(selectTable.rows)}`);

    return selectTable.rows;
  } catch (error) {
    console.error(`[Error] Execute 'getUsers' ... `, error);
    throw error;
  }
}

export async function getPostCardList() {
  const client = await db.connect();
  const selectTable = await client.sql`SELECT
    index::INTEGER
    , name
    , title
    , taglist
    , previewimageurl
    , shortcontent
    , likedcounter
    , htmlstr
    , taglist
    , updatedt
    , createdt
   FROM post`;
  const data = { response: selectTable.rows };
  return validateGetPostCardListResult(data);
}

export async function getPost2(indexId: string) {
  try {
    const client = await db.connect();
    // Create the "invoices" table if it doesn't exist
    console.log(
      `>>>>>>>>>>>>>>>>>>>>>> START >> SELECT "post" table, indexId: `,
      indexId
    );

    const selectTable =
      await client.sql`SELECT * FROM post WHERE index=${indexId}`;

    // console.log(`>>>>>>>>>>>>>>>>>>>>>> END >> SELECT "post" table: ${JSON.stringify(selectTable.rows)}`);

    return selectTable.rows;
  } catch (error) {
    console.error(`[Error] Execute 'getPost2' ... `, error);
    throw error;
  }
}

export async function deletePostWithIndex(
  index: number,
) {
  try {
    const client = await db.connect();
    console.log(`>>>>>>>>>>>>>>>>>>>>>> START >> DELETE "post" table by index`);

    await client.sql`DELETE FROM post WHERE index = ${index}`;
  } catch (error) {
    console.error(`[Error] Execute 'updatePostLikeCounter' ... `, error);
    throw error;
  }
}

export async function updatePostLikeCounter(
  index: string,
  { likedCounter }: any
) {
  try {
    const client = await db.connect();
    console.log(`>>>>>>>>>>>>>>>>>>>>>> START >> UPDATE "post" table`);

    await client.sql`UPDATE post SET likedcounter = ${likedCounter} WHERE index = ${index} `;
  } catch (error) {
    console.error(`[Error] Execute 'updatePostLikeCounter' ... `, error);
    throw error;
  }
}

// export async function updatePost(index: string, params:
//   {
//     //name?: string;
//     htmlStr?: string | null;
//     title?: string;
//     shortContent?: string;
//     tagList?: string[];
//     previewImageUrl?: string;
//     likedCounter?: number;
//   }) {
//   // Insert data into the database

//   try {
//     const client = await db.connect();
//     console.log(`>>>>>>>>>>>>>>>>>>>>>> START >> UPDATE "post" table` + params.likedCounter);

//     const paramKey = Object.keys(params);
//     const paramValues = Object.values(params);

//     if (paramKey.length > 0) {
//       const paramKeyScript = 'UPDATE post SET ' + ((keyOrder) => {
//         const keyArr = [];
//         do {
//           keyArr.push('$' + keyOrder);
//           keyOrder -= 1;
//           console.log(keyOrder);
//         } while (keyOrder > 0);

//         console.log("???????????????????????????", keyArr);

//         return keyOrder > 1 ? keyArr.reverse().join(', ') :  keyArr.join('');
//       })(paramKey.length) + ' WHERE index = ' + index;

//       console.log(paramKeyScript);

//       const res = await client.query(paramKeyScript, paramValues);

//       return res.rows[0];
//     }

//     //console.log(res.rows[0])
//     // const resultData = await getPost();

//   } catch (error) {
//     console.error(`[Error] Execute 'updatePost' ... `, error);
//     throw error;
//   }
// }

export async function newPost({
  name,
  htmlStr,
  title,
  shortContent,
  tagList,
  previewImageUrl,
}: {
  name: string; // email 변경필요..
  htmlStr: string | null;
  title: string;
  shortContent: string;
  tagList: string[];
  previewImageUrl: string;
}) {
  // Insert data into the database
  console.log('콘솔 newPost', name, htmlStr, title, shortContent, tagList, previewImageUrl);

  try {
    const client = await db.connect();
    console.log(`>>>>>>>>>>>>>>>>>>>>>> START >> INSERT "post" table`);
    // const data =
    //   await client.sql`INSERT INTO post (name, htmlStr, title, shortContent, createDt, updateDt, index, tagList, previewImageUrl, likedCounter)
    //   VALUES ('111', '<html>Content 122</html>', 'Sample Title 1', 'Short content 1', '2024-01-11', '2024-01-11', 4, 'tag1, tag2', 'image_url_1', 0)`;
    const now = ((dates) =>
      `${dates.getFullYear()}-${dates.getMonth() + 1}-${dates.getDate()}`)(
      new Date()
    );
    const postCounter = await client.sql`SELECT * FROM post`;
    const insertTable = await client.sql`INSERT INTO post (
      name
      , htmlstr
      , title
      , shortcontent
      , createdt
      , updatedt
      , index
      , taglist
      , previewimageurl
      , likedcounter)
      VALUES (
        ${name}
        , ${htmlStr}
        , ${title}
        , ${shortContent}
        , ${now}
        , ${now}
        , ${postCounter.rowCount}
        , ${JSON.stringify(tagList)}
        , ${previewImageUrl}
        , ${0}
      );`;
    console.log(
      `>>>>>>>>>>>>>>>>>>>>>> END >> INSERT "post" table: ${JSON.stringify(
        insertTable.rows
      )}`
    );
  } catch (error) {
    console.error(`[Error] Execute 'newPost' ... `, error);
    throw error;
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/main");
  redirect("/main");
}
