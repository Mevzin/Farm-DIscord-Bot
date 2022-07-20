require("dotenv").config();
const { Client, Intents, MessageEmbed } = require("discord.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on('ready', () => {
	console.log('Bot: Hosting ' + `${client.users.size}` + ' users, in ' + `${client.channels.size}` + ' channels of ' + `${client.guilds.size}` + ' guilds.');
			client.user.setStatus('online')
			client.user.setActivity(`Mevzin 💜`, {type: "playing", name: "teste"});
	});

client.on("messageCreate" || "messageEdit", (message) => {
	if (message.channelId !== process.env.FARM_CHANNEL_ID) return;
  if (message.author.bot) return;
  let dataFarm = message.content.split("\n");
  console.log(dataFarm);

  if (dataFarm.length != 6 && dataFarm.length != 4){
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
					inline: true
        },
				{ name: '\u200B', value: '\u200B', inline: true },
        {
          name: "Somente Pólvora",
          value:
            "dd/mm/yyyy\n" +
            "Nome\n" +
            "Id\n" +
            "Quantidade Pólvora",
						inline: true
					
        }
      )
      .setColor("#F91207");
    message.reply({ embeds: [embed] });
    message.react("❌");
  } else {
    message.react("✅");
  }
});

client.login(process.env.TOKEN);
