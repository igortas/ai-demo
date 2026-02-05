const assert = require('assert');
const { formatDate } = require('./index.js');

// Test greetUser function
console.log('Testing greetUser...');

// Test formatDate function
console.log('\nTesting formatDate...');

// Test 3: formatDate returns a string
const testDate = new Date('2024-01-15');
const formatted = formatDate(testDate);
assert.strictEqual(
	typeof formatted,
	'string',
	'formatDate should return a string'
);
console.log('✓ formatDate returns a string');

// Test 4: formatDate includes expected components
assert.ok(formatted.includes('2024'), 'formatDate should include the year');
assert.ok(
	formatted.includes('January'),
	'formatDate should include the month name'
);
console.log('✓ formatDate includes correct date components');

console.log('\n✅ All tests passed!');
