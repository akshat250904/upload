import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import creatorRouter from "./routes/creator.routes.js"
import editorRouter from "./routes/editor.routes.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/creator", creatorRouter)
app.use("/api/editor", editorRouter)

export {app}