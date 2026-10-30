// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//     apiKey : 
// });

// const interaction = await ai.interactions.create({
//   model: "gemini-3.8-flash",
//   input: "Explain how AI works in a few words",
// });
// console.log(interaction.output_text);

import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const PORT = 8000;
const api = process.env.API_KEY;

app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected !!!");
    }
    catch(err) {
        console.log(err);
    }
}

// "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
//https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
// app.post("/test", async (req, res) => {
//     const options = {
//         method : "POST",
//         headers : {
//             "Content-Type": "application/json",
//             // "X-goog-api-key": api
//         },
//         body : JSON.stringify({
//             contents: [{
//                     parts: [{
//                             text: req.body.message,
//                         }]
//                 }]
//         })
//     };
//     try {
//         const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${api}`, options);
//         const data = await response.json();
//         console.log(data);
//         res.send(data);
//     }
//     catch(err) {
//         console.log(err);
//     }
// })