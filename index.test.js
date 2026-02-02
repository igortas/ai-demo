const assert = require('assert');
const { greetUser, formatDate, printBanner } = require('./index.js');

// Test greetUser function
console.log('Testing greetUser...');

// Test 1: greetUser with a name
const greeting = greetUser('Alice');
assert.strictEqual(greeting, 'Hello, Alice! Welcome to our app.', 'greetUser should return correct greeting');
console.log('✓ greetUser with name works correctly');

// Test 2: greetUser with different name
const greeting2 = greetUser('Bob');
assert.strictEqual(greeting2, 'Hello, Bob! Welcome to our app.', 'greetUser should work with different names');
console.log('✓ greetUser with different name works correctly');

// Test formatDate function
console.log('\nTesting formatDate...');

// Test 3: formatDate returns a string
const testDate = new Date('2024-01-15');
const formatted = formatDate(testDate);
assert.strictEqual(typeof formatted, 'string', 'formatDate should return a string');
console.log('✓ formatDate returns a string');

// Test 4: formatDate includes expected components
assert.ok(formatted.includes('2024'), 'formatDate should include the year');
assert.ok(formatted.includes('January'), 'formatDate should include the month name');
console.log('✓ formatDate includes correct date components');

// Test printBanner function
console.log('\nTesting printBanner...');

// Test 5: printBanner returns the message
const bannerMessage = 'Test Message';
const result = printBanner(bannerMessage);
assert.strictEqual(result, bannerMessage, 'printBanner should return the message');
console.log('✓ printBanner returns the message');

// Test 6: printBanner with different message
const bannerMessage2 = 'Hello World';
const result2 = printBanner(bannerMessage2);
assert.strictEqual(result2, bannerMessage2, 'printBanner should work with different messages');
console.log('✓ printBanner works with different messages');

console.log('\n✅ All tests passed!');
