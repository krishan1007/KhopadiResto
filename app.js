import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import cookieParser from "cookie-parser";
 import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import MongoDBStore from 'connect-mongodb-session';

const MongoDBStoreSession = MongoDBStore(session);

const mongoDBOptions = {
  uri: process.env.MONGO_URI, // The URI of your MongoDB database
  collection: 'sessions' // The name of the collection to store sessions in
};



const app= express();

export default app;

dotenv.config({
    path:"./config/config.env"
})

//using middlewares

app.use(session({

    //okie
    store: new MongoDBStoreSession(mongoDBOptions),

    secret:process.env.SECRET_S,
    resave:false,
    saveUninitialized:false,
   

    cookie:{
        secure:process.env.NODE_ENV === "development" ? false : true,
        httpOnly:process.env.NODE_ENV === "development" ? false : true,
        sameSite:process.env.NODE_ENV === "development" ? false : "none"
    }  //for deploy purpssssssssssssssssssssssssssss
}));

app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"],
}))  //for deploy purpssssssssssssssssssssssssssss  
app.use(express.json());
app.use(urlencoded({
    extended:true
}));
app.use(cookieParser());
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy"); //for deploy purpssssssssssssssssssssssssssss
connectPassport();



//importing routes
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";



app.use("/api/v1" , userRoute);
app.use("/api/v1" , orderRoute);



//using error middleware
// ekdm last me use

app.use(errorMiddleware);