const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const TelegramBot = require("node-telegram-bot-api");
const path = require("path");

const TOKEN = "8794964058:AAFXWp5rDW5_tw44t1AWZjy79n8PTsQYxKw";

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
    io.emit("detonate");
    bot.sendMessage(msg.chat.id, "Сигнал отправлен");
  }
});

io.on("connection", () => {
  console.log("Сайт подключен");
});

server.listen(3000, () => {
  console.log("Сервер запущен: http://localhost:3000");
});