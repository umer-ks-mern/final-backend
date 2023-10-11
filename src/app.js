import express from "express";
import mainRouter from "./router/index.js";
import connectDB from "./config/db.js";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();

connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
};
// app.use(cors(corsOptions));
app.use(cors());

//exposing the public directory of our server to upload and get images
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  return res.json({ message: "Instagram project made by Team-Umer" });
});

app.use(mainRouter);
app.listen(process.env.PORT, () => {
  console.log(`Social App ka Server Port:${process.env.PORT} py active ha`);
});
