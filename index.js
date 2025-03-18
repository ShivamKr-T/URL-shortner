const express=require("express");
const {connectToMongoDB}=require("./connect")
const urlRoute=require("./routes/url");
const path=require("path");
const staticRoute=require("./routes/staticRouter");
const URL=require("./models/url");

const app=express();
const PORT=8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(
    ()=>console.log(`MongoDB connected`)
)

app.use(express.json());

app.use("/url",urlRoute);
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url",urlRoute);
app.use("/",staticRoute);

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));