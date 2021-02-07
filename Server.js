//Initiate dotenv npm
require('dotenv').config()

//Require certain NPM Packages.. and folders
const fs = require('fs');
const Discord = require('discord.js');


//Initiate 
const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;

//Login to server
client.login(token);

//Set up commands directory variable
const commandsDir = './Commands/';
var botResponses = {};

//Access Commands Directory
fs.readdir(commandsDir, function (err, files) {
    files.forEach(function (file) {
        try {
            responses[file] = require(commandsDir + file);
        } catch (e) {}
    });
});

//Tell bot to listen for messages
client.on("message", function (msg) {
    try {
        var now = new Date().toLocaleString();
        var messageLog = [];
        if (msg.channel.name) {
            messageLog = [
                msg.channel.guild.name,
                ' #' + msg.channel.name,
                '[' + msg.channel.id + ']:',
                now,
                msg.author.username + ': ',
                msg.content
            ];
        } else {
            messageLog = [
                'PM#: ',
                now,
                msg.author.username + ': ',
                msg.content
            ];
        }

    } catch (error) {
        console.log(error);
    }
    for (let response in botResponses) {
        botResponses[response].command(client, msg, botResponses);
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

process.on('unhandledRejection', console.error);