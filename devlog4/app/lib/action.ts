"use server";

import { db, sql } from "@vercel/postgres";
import { validateGetPostCardListResult } from "app/service/main/utils/validate";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";

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
  const selectTable = await client.sql`
  SELECT
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
    , tempsave  

  FROM post
    ORDER BY createdt DESC`;
  const data = { response: selectTable.rows };
  return validateGetPostCardListResult(data);
}

export async function getTempPostCardList(userEmail: string) {
  const client = await db.connect();
  const selectTable = await client.sql`
    SELECT
      index::INTEGER,
      name,
      email,
      title,
      taglist,
      previewimageurl,
      shortcontent,
      likedcounter,
      htmlstr,
      taglist,
      updatedt,
      createdt,
      tempsave
    FROM post
    WHERE tempsave = TRUE AND email = ${userEmail}
  `;
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

    await client.sql`DELETE FROM post WHERE index = ${index}::INTEGER`;
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

export async function handlePost({
  name,
  email,
  htmlStr,
  title,
  shortContent,
  tagList,
  previewImageUrl,
  index,
  createDt,
  likedCounter,
  tempSave,
  isUpdate,
}: {
  name: string;
  email: string;
  htmlStr: string | null;
  title: string;
  shortContent: string;
  tagList: string[];
  previewImageUrl: string;
  index?: number;
  createDt?: Date;
  likedCounter?: number;
  tempSave?:boolean
  isUpdate?: boolean
}
) {
  // Insert data into the database
  try {
    const client = await db.connect();
    console.log(`>>>>>>>>>>>>>>>>>>>>>> ACTION >> newPost `, name, email, htmlStr, title, shortContent, tagList, previewImageUrl, index, createDt, likedCounter);
    // const data =
    //   await client.sql`INSERT INTO post (name, htmlStr, title, shortContent, createDt, updateDt, index, tagList, previewImageUrl, likedCounter)
    //   VALUES ('111', '<html>Czontent 122</html>', 'Sample Title 1', 'Short content 1', '2024-01-11', '2024-01-11', 4, 'tag1, tag2', 'image_url_1', 0)`;
    const now = ((dates) =>
      `${dates.getFullYear()}-${dates.getMonth() + 1}-${dates.getDate()}`)(
      new Date()
    );
    const postCounter = await client.sql`SELECT * FROM post`;

    const updatePost = () => client.sql`
    UPDATE post
      SET
        name = ${name}
        , email = ${email}
        , htmlStr = ${htmlStr}
        , title = ${title}
        , shortcontent = ${shortContent}
        , updatedt = ${now}
        , taglist = ${JSON.stringify(tagList)}
        , previewimageurl = ${previewImageUrl}
        , likedcounter = ${likedCounter}::INTEGER
        , tempsave = ${tempSave}
      WHERE
        index = ${index}::INTEGER`;
    
    const insertPost = () => client.sql`
    INSERT INTO post (
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
      , likedcounter
      , tempsave)
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
        , ${tempSave}
      );`;

    const resultQuery = await (isUpdate ? updatePost() : insertPost());

    console.log(
      `>>>>>>>>>>>>>>>>>>>>>> ACTION >> INSERT "post" table: ${JSON.stringify(
        resultQuery.rows
      )}`
    );
  } catch (error) {
    console.error(`[Error] Execute 'newPost' ... `, error);
    throw error;
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/main");
  // redirect("/main");
  permanentRedirect("/main");
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
