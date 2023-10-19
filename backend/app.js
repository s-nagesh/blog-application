import express from "express";
import mongoose from 'mongoose';
import UserRoute from "./routes/user-route";
import BlogRoute from "./routes/blog-route";
const app = express();

app.use(express.json());
app.use("/api/user", UserRoute)
app.use("/api/blog", BlogRoute)

mongoose.connect("mongodb+srv://admin:nagesh2727@cluster0.c3bidtm.mongodb.net/?retryWrites=true&w=majority")
    .then(() => app.listen(5000))
    .then(res => console.log("Connected mongodb successfully!!"))
    .catch(err => console.log(err))
