import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/database.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import messageRoutes from "./routes/message.route.js";
import path from 'path';
dotenv.config({});
const PORT = process.env.PORT || 3000;
const app = express();

const _dirname = path.resolve();


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true

}
app.use(cors(corsOptions));


app.use("/api/v1/user", userRoutes)
app.use("/api/v1/post", postRoutes)
app.use("/api/v1/message", messageRoutes)



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is litening on localhost http://localhost:${PORT}`);
});