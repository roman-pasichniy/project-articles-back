import { Schema, model } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 48,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 100,
      maxlength: 4000,
      trim: true,
    },

    photo: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    author: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
      trim: true,
        },
    ownerId: {
  type: Schema.Types.ObjectId,
  ref: "user",
  required: true,
},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ArticleModel = model("article", articleSchema);
