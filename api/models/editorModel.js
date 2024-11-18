import mongoose, {Schema} from "mongoose"

const editorSchema = new Schema({
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
        default: "editor",
    },
    videofile: {
        type: String,
    }

}, {timestamps: true})

export const Editor = mongoose.model("Editor", editorSchema);