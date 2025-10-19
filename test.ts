import {
  buildWordChain,
  circularChaining,
  registerStrategy,
  getAvailableStrategies
} from './src';

console.log('=== Word Chain Builder Test Suite ===\n');

// Test 1: Simple Circular Chain (Eulerian Circuit)
console.log('Test 1: Simple Circular Chain (Eulerian Circuit)');
console.log('------------------------------------------------');
try {
  // This should form a circuit: apple->era->apple (a-e-a)
  const simpleWords = ['apple', 'era'];
  console.log('Input words:', simpleWords);
  const chain = circularChaining(simpleWords);
  console.log('Chained words:', chain);
  
  // Verify chain validity AND circularity
  let valid = true;
  for (let i = 0; i < chain.length - 1; i++) {
    const currentLast = chain[i][chain[i].length - 1].toLowerCase();
    const nextFirst = chain[i + 1][0].toLowerCase();
    if (currentLast !== nextFirst) {
      valid = false;
      console.log(`✗ Invalid chain at position ${i}: ${chain[i]} -> ${chain[i + 1]}`);
    }
  }
  
  // Check circularity
  const firstLetter = chain[0][0].toLowerCase();
  const lastLetter = chain[chain.length - 1][chain[chain.length - 1].length - 1].toLowerCase();
  if (firstLetter !== lastLetter) {
    valid = false;
    console.log(`✗ Not circular: first='${firstLetter}', last='${lastLetter}'`);
  }
  
  if (valid) {
    console.log(`✓ Chain is valid and circular! (${firstLetter} → ... → ${lastLetter})\n`);
  }
} catch (error) {
  console.log('Error:', (error as Error).message);
  console.log();
}

// Test 2: Non-Circular Path (Should fail with --circular)
console.log('Test 2: Non-Circular Path (Should Fail with --circular)');
console.log('--------------------------------------------------------');
try {
  // This forms a path but NOT a circuit: apple->elephant->tiger->red (a-e-t-r-d)
  const pathWords = ['apple', 'elephant', 'tiger', 'red'];
  console.log('Input words:', pathWords);
  const chain = circularChaining(pathWords);
  console.log('Chained words:', chain);
  console.log('✗ Should have thrown an error (not a circuit)\n');
} catch (error) {
  console.log('Expected error:', (error as Error).message);
  console.log('✓ Test passed\n');
}

// Test 3: Impossible Chain
console.log('Test 3: Impossible Chain (Should Fail)');
console.log('---------------------------------------');
try {
  const impossibleWords = ['apple', 'banana', 'cherry'];
  console.log('Input words:', impossibleWords);
  const chain = circularChaining(impossibleWords);
  console.log('Chained words:', chain);
  console.log('✗ Should have thrown an error\n');
} catch (error) {
  console.log('Expected error:', (error as Error).message);
  console.log('✓ Test passed\n');
}

// Test 4: Single Word (circular - first and last letters match)
console.log('Test 4: Single Circular Word');
console.log('----------------------------');
try {
  const singleWord = circularChaining(['area']);  // a...a is circular
  console.log('Input: [\'area\']');
  console.log('Output:', singleWord);
  console.log('✓ Test passed\n');
} catch (error) {
  console.log('Error:', (error as Error).message);
  console.log();
}

// Test 5: Single Word (non-circular - should fail)
console.log('Test 5: Single Non-Circular Word (Should Fail)');
console.log('------------------------------------------------');
try {
  const singleWord = circularChaining(['hello']);  // h...o is not circular
  console.log('Input: [\'hello\']');
  console.log('Output:', singleWord);
  console.log('✗ Should have thrown an error\n');
} catch (error) {
  console.log('Expected error:', (error as Error).message);
  console.log('✓ Test passed\n');
}

// Test 6: Empty Input
console.log('Test 6: Empty Input');
console.log('-------------------');
const emptyChain = circularChaining([]);
console.log('Input: []');
console.log('Output:', emptyChain);
console.log('✓ Test passed\n');

// Test 7: Strategy Registry
console.log('Test 7: Strategy Registry');
console.log('-------------------------');
const strategies = getAvailableStrategies();
console.log('Available strategies:', strategies);
console.log('Should include --circular and --chain');
console.log('✓ Test passed\n');

// Test 8: Custom Strategy
console.log('Test 8: Custom Strategy Registration');
console.log('------------------------------------');
registerStrategy({
  name: 'Reverse Order',
  code: '--reverse',
  execute: (words) => [...words].reverse()
});

const updatedStrategies = getAvailableStrategies();
console.log('Available strategies after registration:', updatedStrategies);
console.log('✓ Test passed\n');

// Test 9: File-based Circular Chain Building
console.log('Test 9: File-based Circular Chain Building');
console.log('-------------------------------------------');
try {
  const result = buildWordChain('example-words.txt', '--circular');
  console.log('Words from file chained (circular):', result.chain);
  
  // Verify chain validity AND circularity
  let valid = true;
  const chain = result.chain;
  for (let i = 0; i < chain.length - 1; i++) {
    const currentLast = chain[i][chain[i].length - 1].toLowerCase();
    const nextFirst = chain[i + 1][0].toLowerCase();
    if (currentLast !== nextFirst) {
      valid = false;
      console.log(`✗ Invalid chain at position ${i}: ${chain[i]} -> ${chain[i + 1]}`);
    }
  }
  
  // Check circularity
  const firstLetter = chain[0][0].toLowerCase();
  const lastLetter = chain[chain.length - 1][chain[chain.length - 1].length - 1].toLowerCase();
  if (firstLetter !== lastLetter) {
    valid = false;
    console.log(`✗ Not circular: first='${firstLetter}', last='${lastLetter}'`);
  }
  
  if (valid) {
    console.log(`✓ Chain is valid and circular! (${firstLetter} → ... → ${lastLetter})\n`);
  }
} catch (error) {
  console.log('Error:', (error as Error).message);
  console.log();
}

// Test 9b: File-based Non-Circular Chain Building
console.log('Test 9b: File-based Non-Circular Chain (--chain)');
console.log('-------------------------------------------------');
try {
  const result = buildWordChain('chain-example.txt', '--chain');
  console.log('Words from file chained (path):', result.chain);
  
  // Verify chain validity
  let valid = true;
  const chain = result.chain;
  for (let i = 0; i < chain.length - 1; i++) {
    const currentLast = chain[i][chain[i].length - 1].toLowerCase();
    const nextFirst = chain[i + 1][0].toLowerCase();
    if (currentLast !== nextFirst) {
      valid = false;
      console.log(`✗ Invalid chain at position ${i}: ${chain[i]} -> ${chain[i + 1]}`);
    }
  }
  
  if (valid) {
    console.log('✓ Chain is valid!\n');
  }
} catch (error) {
  console.log('Error:', (error as Error).message);
  console.log();
}

console.log('=== All Tests Completed ===');
