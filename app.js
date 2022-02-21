require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const multer = require("multer");
const path = require("path");


// image variables


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, "images"));

    },
    filename(req, file, cb) {
        cb(null, new Date().toLocaleDateString().replace(/\//g, "-") + "-" + file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimeType == "image/jpeg" || file.mimeType == "image/png" || file.mimeType == "image/jpg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const authenticationRouter = require("./Routers/authenticationRouter");
const speakerRouter = require("./Routers/SpeakerRouter");
const eventRouter = require("./Routers/eventRouter");
const sudentRouter = require("./Routers/StudentRouter");

// create Server
const app = express();
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database Conected .........");
        app.listen(process.env.PORT || process.env.Port_Number, () => {
            console.log(process.env.NODE_MODE)
            console.log("I am Listenining.......");
        })

    })
    .catch(error => {
        console.log("DB problem");
    })





// Middlewares

app.use(morgan("method :url"));

app.use((request, response, next) => {
    console.log(request.method, request.url);
    next();
})


app.use((request, response, next) => {
    if (true) {
        console.log("Authorized");
        next();
    } else {
        console.log("Not Authorized");
        next(new Error("Not Authorized"))
    }
})


app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage, fileFilter }).single("image"))
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));


// Routes

app.use(authenticationRouter);
app.use(speakerRouter);
app.use(sudentRouter);
app.use(eventRouter);


// response
app.use((request, response, next) => {
    response.status(404).json({ data: "Not Found" });
})

// Error MW
app.use((error, request, response, next) => {
    response.status(500).json({ Error: error + "" });
})