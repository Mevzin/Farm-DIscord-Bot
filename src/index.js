require("dotenv").config();
const { Client, Intents, MessageEmbed } = require("discord.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on("ready", () => {
  client.user.setStatus("online");
  client.user.setActivity(`Mevzin 💜`, { type: "playing", name: "teste" });
});

client.on("messageCreate" || "messageEdit", (message) => {
  if (message.channelId !== process.env.FARM_CHANNEL_ID) return;
  if (message.author.bot) return;
  let dataFarm = message.content.split("\n");

  if (dataFarm.length != 6 && dataFarm.length != 4) {
    message.react("❌");
    const embed = new MessageEmbed()
      .setTitle(`Não foi possível salvar estes dados`)
      .setDescription("Envie os dados em um dos seguintes formatos:")
      .addFields(
        {
          name: "Munição completa",
          value:
            "dd/mm/yyyy\n" +
            "Nome\n" +
            "Id\n" +
            "Quantidade Pólvora\n" +
            "Quantidade Projetil\n" +
            "Quantidade Capsula",
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true },
        {
          name: "Somente Pólvora",
          value: "dd/mm/yyyy\n" + "Nome\n" + "Id\n" + "Quantidade Pólvora",
          inline: true,
        }
      )
      .setColor("#F91207");
    message.reply({ embeds: [embed] });
  } else {
    if (dataFarm.length == 4) {
      message.react("✅");
      const successEmbed = new MessageEmbed()
        .setColor("#0EF907")
        .setTitle("Dados salvos com sucesso!")
        .setAuthor({
          name: message.author.username,
          iconURL: message.author.displayAvatarURL(),
        })
        .setThumbnail("https://i.imgur.com/2zqiYnJ.png")
        .addFields({
          name: "Somente Pólvoras",
          value:
            `Data: ${dataFarm[0]} \n`+
            `Nome: ${dataFarm[1]} \n`+
            `Id: ${dataFarm[2]} \n`+
            `Qtd Pólvoras: ${dataFarm[3]} \n`,
          inline: true,
        })
        .setTimestamp()
      message.reply({ embeds: [successEmbed] });
    } else if (dataFarm.length == 6) {
      message.react("✅");
      const successEmbed = new MessageEmbed()
      .setColor("#0EF907")
      .setTitle("Dados salvos com sucesso!")
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL(),
      })
      .setThumbnail("https://i.imgur.com/2zqiYnJ.png")
      .addFields({
        name: "Somente Pólvoras",
        value:
          `Data: ${dataFarm[0]} \n`+
          `Nome: ${dataFarm[1]} \n`+
          `Id: ${dataFarm[2]} \n`+
          `Qtd Pólvoras: ${dataFarm[3]} \n`+
          `Qtd Projeteis: ${dataFarm[4]} \n`+
          `Qtd Capsulas: ${dataFarm[5]} \n`,
        inline: true,
      })
      .setTimestamp()
    message.reply({ embeds: [successEmbed] });
    }
  }
});

client.login(process.env.TOKEN);
