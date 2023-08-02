import Post from "models/post";
import dbConnect from "config/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Counter from "models/counter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect();
  if (req.method === "POST") {
    const { name, htmlStr, title, shortContent, tagList, previewImageUrl } =
      req.body;
    let { seq } = await Counter.findByIdAndUpdate("userid", {
      $inc: { seq: 1 },
    });
    const post = await Post.create({
      name: name,
      htmlStr: htmlStr,
      title: title,
      shortContent: shortContent,
      createDt: new Date(),
      updateDt: new Date(),
      index: seq === null ? 0 : seq,
      tagList: tagList,
      previewImageUrl: previewImageUrl,
      likedCounter: 0,
    });
    res.status(201).json({ post });
  }

  if (req.method === "GET") {
    const result = await Post.find(req.query);
    res.status(201).json({ result });
  }
}
