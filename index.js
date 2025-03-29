require('dotenv').config();

console.log("TOKEN DO BOT:", process.env.DISCORD_TOKEN);
console.log("ID do BOT:", process.env.BOT_ID)

const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const BOT_ID = process.env.BOT_ID;

client.once("ready", () => {
  console.log(`✅ Bot ${client.user.tag} está online!`);
});

client.on("messageCreate", async (message) => {
  const userMessage = message.content.slice(4).trim()

  try {
    const response = await axios.post(
      "https://kratos.api.toolzz.com.br/api/v1/chat/send-message/",
      {
        botId: "46c3f4b3-6d4c-4112-a6f3-1cd5775757dc",
        message: userMessage,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Resposta da API:", response.data)

    const botReply = response.data.message;
    message.reply(botReply);
  } catch (error) {
    console.error("Erro na API:", error);
    message.reply("Ocorreu um erro ao falar com a IA. Tente novamente!");
  }
});

client.login(process.env.DISCORD_TOKEN);

