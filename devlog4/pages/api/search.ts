import Post from "models/post";
import dbConnect from "config/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Counter from "models/counter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, htmlStr, title, shortContent } = req.body;
    let { seq } = await Counter.findByIdAndUpdate("userid", {
      $inc: { seq: 1 },
    });
    const post = await Post.create({
      name: name,
      email: email,
      htmlStr: htmlStr,
      title: title,
      shortContent: shortContent,
      createDt: new Date(),
      updateDt: new Date(),
      index: seq === null ? 0 : seq,
    });
    res.status(201).json({ post });
  }

  if (req.method === "GET") {
    console.log("123");
  }
}
