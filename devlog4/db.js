import { db, sql } from "@vercel/postgres";

export async function getUsers() {
  try {
    const client = await db.connect();
    // Create the "invoices" table if it doesn't exist
    console.log(`>>>>>>>>>>>>>>>>>>>>>> START >> SELECT "user_test" table`);
    const selectTable = await client.sql`SELECT * FROM user_test`;

    console.log(`>>>>>>>>>>>>>>>>>>>>>> END >> SELECT "user_test" table: ${selectTable.rows}`);

    return selectTable.rows;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
export async function getCounter() {
  try {
    const client = await db.connect();
    // Create the "invoices" table if it doesn't exist
    console.log(`>>>>>>>>>>>>>>>>>>>>>> START >> SELECT "counter" table`);
    const selectTable = await client.sql`SELECT * FROM counter`;

    console.log(`>>>>>>>>>>>>>>>>>>>>>> END >> SELECT "counter" table: ${selectTable.rows}`);

    return selectTable.rows;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
export async function getPost() {
  try {
    const client = await db.connect();
    // Create the "invoices" table if it doesn't exist
    console.log(`>>>>>>>>>>>>>>>>>>>>>> START >> SELECT "post" table`);
    const selectTable = await client.sql`SELECT * FROM post`;

    console.log(`>>>>>>>>>>>>>>>>>>>>>> END >> SELECT "post" table: ${selectTable.rows}`);

    return selectTable.rows;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
export async function setPost({
  name,
  htmlStr,
  title,
  shortContent,
  tagList,
  previewImageUrl,
}) {
  try {
    const client = await db.connect();
    // Create the "invoices" table if it doesn't exist
    console.log(`>>>>>>>>>>>>>>>>>>>>>> START >> INSERT "post" table`);
    const selectTable = await client.sql
    `INSERT INTO post (name, htmlStr, htmlStr, title, shortContent, tagList, previewImageUrl)
      VALUES (${userName}, ${htmlStr}, ${title}, ${shortContent}, ${JSON.stringify(tagList.current)}, ${previewImageUrl});`;

    console.log(`>>>>>>>>>>>>>>>>>>>>>> END >> INSERT "post" table: ${selectTable.rows}`);

    return selectTable.rows;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
/*
  console.log(`>>>>>>>>>>>>>>>>>>>>>> START> > Created "counter" table`);
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // Create the "invoices" table if it doesn't exist
  await client.sql`
    CREATE TABLE IF NOT EXISTS counter (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      seq numeric NOT NULL
    );
  `;
  console.log(`>>>>>>>>>>>>>>>>>>>>>> END >> Created "counter" table`);

  console.log(`>>>>>>>>>>>>>>>>>>>>>> START> > Created "post" table`);
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // Create the "invoices" table if it doesn't exist
  await client.sql`
    CREATE TABLE IF NOT EXISTS post (
      name VARCHAR(255) NOT NULL,
      htmlStr text,
      title text,
      shortContent text,
      createDt VARCHAR(50) NOT NULL,
      updateDt VARCHAR(50) NOT NULL,
      index numeric NOT NULL,
      tagList text,
      previewImageUrl VARCHAR(255),
      likedCounter numeric
    );
  `;
  console.log(`>>>>>>>>>>>>>>>>>>>>>> END >> Created "post" table`);
*/
//  console.log(`>>>>>>>>>>>>>>>>>>>>>> START> > INSERT INTO "counter" table`);
  //await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // Create the "invoices" table if it doesn't exist
  // await client.sql`
  //   INSERT INTO counter ('')
  //   VALUES ()
  //   ON CONFLICT (id) DO NOTHING;
  // `;
  //console.log(`>>>>>>>>>>>>>>>>>>>>>> END >> INSERT INTO  "counter" table`);
  
