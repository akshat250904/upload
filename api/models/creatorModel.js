import mongoose, {Schema} from "mongoose"

const creatorSchema = new Schema({
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
        default: "creator",
    },
    videofile: {
        type: String,
    }

}, {timestamps: true})

export const creator = mongoose.model("creator", creatorSchema);