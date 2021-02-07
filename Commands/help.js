module.exports = {
    command: function (client, msg, botResponses) {
        const phrase = '!help';
        let wordsArr = msg.content.split(' ');
        wordsArr.map(function (word, index) {
            if (word.toLowerCase() === phrase) {
                const message = [
                    'This is the help info:'
                ];
                for (let thing in responses) {
                    message.push(botResponses[thing].help);
                }
                msg.channel.send(message.join('\n'));
            }
        });
    },
    help: '`!help` lists all commands'
};