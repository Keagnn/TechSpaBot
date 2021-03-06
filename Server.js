require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const {
	prefix,
} = require('./config.json');

const cooldowns = new Discord.Collection();


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', message => {

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);

	const command = args.shift().toLowerCase();

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			return;
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	if (!message.content.startsWith(prefix) || message.author.bot) return;


	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;


		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
	}
});

client.login(process.env.token);

process.on('unhandledRejection', console.error);