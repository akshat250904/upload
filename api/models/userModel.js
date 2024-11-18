import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
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
        enum : ["editor","creator"]
    },
    videofile: {
        type: String,
    }

}, {timestamps: true})

export const User = mongoose.model("User", userSchema);