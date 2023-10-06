import express from "express";
import mainRouter from "./router/index.js";
import connectDB from "./config/db.js";
import cors from 'cors';
import { createReadStream } from "fs";
import multer from "multer";

let corsOptions = {
  origin: ["http://localhost:5173"],
  method: 'GET, POST, PUT, DELETE',
};


const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(cors(corsOptions));
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  return res.json({ message: "Made By Umer" });
});


app.use(mainRouter);
app.listen(3300 || 3301, () => {
  console.log(`Social App ka Server Port:3300 py active ha`);
});

