module.exports = {
	name: 'dadjoke',
	description: 'Send a dad joke!',
	args: true,
	usage: '', // blank because this does not take arguments
	execute(message) {
		const jokes = [
			'What do you call a fake noodle?\n ||an Impasta!||',
			'What do you call an alligator that works on wallstreet? \n ||An Invest-i-gator! || ',
			'Want to hear a joke about paper? \n ||It\'s Tearable!||',
			'What\'s brown and sticky? \n ||A stick!||',
			'Can February march? \n ||No but April May!||',
			'Is there a hole in your shoe? \n ||Then how did you get your foot in it?||',
			'Why can\'t your nose be 12 inches long? \n ||Because then it would be a foot!||',
			'Why do chicken coops only have two doors? \n ||Because if they had four, they would be chicken sedans!||',
			'How do you make a kleenex dance? \n ||Put a little boogie in it!||',
			'Why did the invisible man turn down the job offer? \n ||He couldn\'t see himself doing it!||',
			'How do you make holy water? \n ||You boil the hell out of it!||',
			'What did the horse say after it tripped? \n ||Help! I’ve fallen and I can’t giddyup!||',
			'What do you call a masturbating cow? \n ||Beef Stroganoff!||',
			'How many tickles does it take to make an octopus laugh? \n ||Ten-tickles!||',
			'This graveyard looks overcrowded. People must be dying to get in.',
			'It takes guts to be an organ donor.',
			'I\'m so good at sleeping, I can do it with my eyes closed!',
			'I wouldn\'t buy anything with velcro. It\'s a total rip-off.',
		];
		const random = Math.floor(Math.random() * jokes.length);
		const msg = jokes[random];

		message.channel.send(msg);
	},
};