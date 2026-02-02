/**
 * AI Demo - Simple Greeting App
 * Demonstrates AI agent integration with GitHub Actions
 */

function greetUser(name) {
  return `Hello, ${name}! Welcome to our app.`;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Print a message in a banner format
function printBanner(message) {
  const bannerWidth = message.length + 4;
  const topBorder = '*'.repeat(bannerWidth);
  const middleLine = `* ${message} *`;

  console.log(topBorder);
  console.log(middleLine);
  console.log(topBorder);

  return message;
}

function main() {
  const userName = process.argv[2] || 'Guest';
  const today = new Date();

  console.log(greetUser(userName));
  console.log(`Today is ${formatDate(today)}`);
}

main();

module.exports = { greetUser, formatDate, printBanner };
