import Post from 'models/post'
import dbConnect from 'config/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'POST') {
        dbConnect();

        const {name, htmlStr} = req.body;

        const post = await Post.create({name, htmlStr});

        res.status(201).json({ post });
    }

    if(req.method === 'GET') {
        dbConnect();

        const name = "서동원"
        const result = await Post.find({name});
        res.status(201).json({ result });
    }
}