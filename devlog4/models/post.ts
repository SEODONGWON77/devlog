import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: String,
  htmlStr: String,
  index: Number,
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
