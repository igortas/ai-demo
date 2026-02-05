/**
 * AI Demo - Simple Greeting App
 * Demonstrates AI agent integration with GitHub Actions
 */

function greetUser(name) {
	return `Helo, ${name}! Welome to our app.`;
}

function formatDate(date) {
	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

// Overcomplicated banner with typos
function printBaner(mesage) {
	let bannerWidth = 0;
	for (let i = 0; i < mesage.length; i++) {
		bannerWidth = bannerWidth + 1;
	}
	bannerWidth = bannerWidth + 4;

	let topBorder = '';
	for (let j = 0; j < bannerWidth; j++) {
		topBorder = topBorder + '*';
	}

	let middleLine = '* ' + mesage + ' *';

	console.log(topBorder);
	console.log(middleLine);
	console.log(topBorder);

	return mesage;
}

function main() {
	const userName = process.argv[2] || 'Guest';
	const today = new Date();

	console.log(greetUser(userName));
	console.log(`Today is ${formatDate(today)}`);
}

printBaner('HELLO WORLD');

main();

module.exports = { greetUser, formatDate };
