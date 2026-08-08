import { Schema, model } from "mongoose";

const articleSchema = new Schema({});

export const ArticleModel = model("article", articleSchema);
