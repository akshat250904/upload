import mongoose, { mongo, Schema } from "mongoose";
import { User } from "./userModel.js";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoPath: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending approval",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    youtubeUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);
