import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: String,
  htmlStr: String,
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
