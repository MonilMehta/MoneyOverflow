import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://moneyoverflow.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())

// import routes
import userRouter from './routes/user.routes.js';
import quizRouter from './routes/quiz.routes.js';
import blogRouter from './routes/blog.routes.js';
import communityRouter from './routes/community.routes.js'
import learningPathRouter from './routes/learningPath.routes.js'
import healthCheckRouter from './routes/healthCheck.routes.js';
// declare routes
app.use("/api/users", userRouter)
app.use("/api/quiz",quizRouter);
app.use("/api/blog",blogRouter);
app.use("/api/community",communityRouter)
app.use("/api/learning",learningPathRouter)
app.use("/", healthCheckRouter);
export { app }
