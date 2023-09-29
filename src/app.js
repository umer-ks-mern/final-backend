import express from "express";
import mainRouter from "./router/index.js";
import connectDB from "./config/db.js";
import { Server } from 'socket.io';
import http from 'http';



const app = express();
const server = http.createServer(app);
const io = new Server(server);
import dotenv from "dotenv";
dotenv.config();

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  return res.json({ message: "Made By Umer" });
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (message) => {
    console.log('Received message:', message);

    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(mainRouter);
app.listen(process.env.PORT || 3300, () => {
  console.log(`Social App ka Server Port:${process.env.PORT} py active ha`);
});