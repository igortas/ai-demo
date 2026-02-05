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

// Simple banner function
function printBanner(message) {
	const border = '*'.repeat(message.length + 4);
	const middleLine = `* ${message} *`;

	console.log(border);
	console.log(middleLine);
	console.log(border);

	return message;
}

function main() {
	const userName = process.argv[2] || 'Guest';
	const today = new Date();

	console.log(greetUser(userName));
	console.log(`Today is ${formatDate(today)}`);
}

printBanner('HELLO WORLD');

main();

module.exports = { greetUser, formatDate, printBanner };
