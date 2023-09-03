const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require('cors');

const app = express();
app.use(express.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use("/images",express.static(path.join(__dirname,"/images")));

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true}); 

mongoose.set('strictQuery', true);

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"images");
    }, filename: (req,file,cb) => {
        cb(null,req.body.name);
    }
});

const upload = multer({storage: storage});
app.post("/server/upload",upload.single("file"),(req,res) => {
    res.status(200).json("File has been uploaded!");
});

app.use("/server/auth", authRoute);
app.use("/server/users", userRoute);
app.use("/server/posts", postRoute);
app.use("/server/categories", categoryRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 4000!!!");
})
