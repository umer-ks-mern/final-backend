import express from "express";
import mainRouter from "./router/index.js";
import connectDB from "./config/db.js";
import http from "http";
import WebSocket from "ws";

const app = express();
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  return res.json({ message: "Made By Umer" });
});

wss.on("connection", (ws) => {
  //handle websocket connections here
  ws.on("message", (message) => {
    //Handle incoming WebSockets messages (e.g., User Authentication)
  });
});

const connectedClients = new Map(); // Map to store web socket connection
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);

    if(parsedMessage.type === 'chat') {
      const senderId = connectedClients.get(ws)?.userId;
      if(senderId) {
        wss.clients.forEach((client) => {
          if(client !== ws) {
            client.send(JSON.stringify({ 
              type: 'chat', content: parsedMessage.content, senderId
            }));
          }
        });
      }
    }
  });


  connectedClients.set(ws, {
    userId: 'someUserId'
  });
});



app.use(mainRouter);
app.listen(process.env.PORT || 3301, () => {
  console.log(`Social App ka Server Port:${process.env.PORT} py active ha`);
});
