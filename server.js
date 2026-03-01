const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const TelegramBot = require("node-telegram-bot-api");
const path = require("path");

const TOKEN = process.env.TELEGRAM_TOKEN; // токен в Railway Variables

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Нажми кнопку", {
    reply_markup: {
      keyboard: [["Детонировать"]],
      resize_keyboard: true
    }
  });
});

bot.on("message", (msg) => {
  if (msg.text === "Детонировать") {
    console.log("DETONATE SENT");
    io.emit("detonate");
    bot.sendMessage(msg.chat.id, "Сигнал отправлен");
  }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});