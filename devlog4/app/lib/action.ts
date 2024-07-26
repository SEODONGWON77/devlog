"use server";

import { db, sql } from "@vercel/postgres";
import { validateGetPostCardListResult } from "app/service/main/utils/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getUsers() {
  try {
    const client = await db.connect();
    // Create the "invoices" table if it doesn't exist
    console.log(`>>>>>>>>>>>>>>>>>>>>>> ACTION >> getUsers `);
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
    , email
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
      `>>>>>>>>>>>>>>>>>>>>>> ACTION >> getPostCardList, indexId: `,
      indexId
    );

    const selectTable =
      await client.sql`SELECT * FROM post WHERE index=${indexId}`;

    // console.log(`>>>>>>>>>>>>>>>>>>>>>> END >> SELECT "post" table: ${JSON.stringify(selectTable.rows)}`);

    return selectTable.rows;
  } catch (error) {
    console.error(`[Error] Execute ACTION 'getPost2' ... `, error);
    throw error;
  }
}

export async function deletePostWithIndex(
  index: number,
) {
  try {
    const client = await db.connect();
    console.log(`>>>>>>>>>>>>>>>>>>>>>> ACTION >> deletePostWithIndex `);

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
    console.log(`>>>>>>>>>>>>>>>>>>>>>> ACTION >> updatePostLikeCounter `);

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
  email,
  htmlStr,
  title,
  shortContent,
  tagList,
  previewImageUrl,
}: {
  name: string;
  email: string;
  htmlStr: string | null;
  title: string;
  shortContent: string;
  tagList: string[];
  previewImageUrl: string;
}) {
  // Insert data into the database
  console.log('콘솔 newPost', name, email, htmlStr, title, shortContent, tagList, previewImageUrl);

  try {
    const client = await db.connect();
    console.log(`>>>>>>>>>>>>>>>>>>>>>> ACTION >> newPost `);
    console.log(`>>>>>>>>>>>>>>>>>>>>>> ACTION >> newPost.. name: `, name);
    console.log(`>>>>>>>>>>>>>>>>>>>>>> ACTION >> newPost.. email: `, email);
    // const data =
    //   await client.sql`INSERT INTO post (name, htmlStr, title, shortContent, createDt, updateDt, index, tagList, previewImageUrl, likedCounter)
    //   VALUES ('111', '<html>Czontent 122</html>', 'Sample Title 1', 'Short content 1', '2024-01-11', '2024-01-11', 4, 'tag1, tag2', 'image_url_1', 0)`;
    const now = ((dates) =>
      `${dates.getFullYear()}-${dates.getMonth() + 1}-${dates.getDate()}`)(
      new Date()
    );
    const postCounter = await client.sql`SELECT * FROM post`;
    const insertTable = await client.sql`INSERT INTO post (
      name
      , email
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
        , ${email}
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
      `>>>>>>>>>>>>>>>>>>>>>> ACTION >> INSERT "post" table: ${JSON.stringify(
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

export async function searchPosts(searchTerm: string) {
  try {
    const client = await db.connect();
    console.log(`>>>>>>>>>>>>>>>>>>>>>> ACTION >> searchPosts `);

    const searchResults = await client.sql`
      SELECT 
        index::INTEGER,
        name,
        email,
        title,
        shortcontent,
        taglist,
        previewimageurl,
        likedcounter,
        updatedt,
        createdt
      FROM post
      WHERE 
        name ILIKE ${`%${searchTerm}%`} OR
        title ILIKE ${`%${searchTerm}%`} OR
        shortcontent ILIKE ${`%${searchTerm}%`} OR
        htmlstr ILIKE ${`%${searchTerm}%`}
    `;

    return searchResults.rows;
  } catch (error) {
    console.error(`[Error] Execute 'searchPosts' ... `, error);
    throw error;
  }
}
