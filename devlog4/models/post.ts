import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: String,
  email: String,
  htmlStr: String,
  title: String,
  shortContent: String,
  createDt: Date,
  updateDt: Date,
  index: Number,
  tagList: Array,
  previewImageUrl: String,
  likedCounter: Number,
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
