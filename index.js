const express=require("express");
const {connectToMongoDB}=require("./connect");
const path=require("path");
const cookieParser=require("cookie-parser");
const {restrictToLoggedinUserOnly,checkAuth}=require("./middlewares/auth");
const URL=require("./models/url");

const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");

const app=express();
const PORT=8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(
    ()=>console.log(`MongoDB connected`)
)

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/",checkAuth,staticRoute);
app.use("/user",userRoute);

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));