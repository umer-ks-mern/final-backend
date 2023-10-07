import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    caption: {
      type: "string",
    },
    likes: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
      },
    ],
    comments: [
      {
        comment_text: {
          type: "string",
          required: true,
        },
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        replys: [
          {
            reply_text: {
              type: "string",
              required: true,
            },
            user_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
              required: true,
            },
            dateTime: { type: Date, default: Date.now },
          },
        ],
        dateTime: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

export default postModel;
