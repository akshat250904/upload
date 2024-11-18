import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["creator", "editor"], 
    },
    videofile: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export const Creator = User.discriminator(
  "Creator",
  new Schema({
    role: { type: String, default: "creator" },
  })
);

export const Editor = User.discriminator(
  "Editor",
  new Schema({
    role: { type: String, default: "editor" },
  })
);
