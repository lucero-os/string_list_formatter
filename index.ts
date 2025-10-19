#!/usr/bin/env node

/**
 * Word Chain Builder - CLI Entry Point
 * 
 * Usage: ts-node index.ts <file-path> <strategy-code>
 * Example: ts-node index.ts words.txt --circular
 * 
 * Output: Creates a new file with the chained words
 */

import { buildWordChain, getAvailableStrategies, getStrategy, FileUtility } from './src';

/**
 * CLI entry point
 */
function main(): void {
  const args = process.argv.slice(2);

  // Handle --list or --help command
  if (args.length === 1 && (args[0] === '--list' || args[0] === '--help' || args[0] === '-h')) {
    console.log('📋 Available Strategies:');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log();
    
    const strategies = getAvailableStrategies();
    strategies.forEach(code => {
      const strategy = getStrategy(code);
      if (strategy) {
        console.log(`  ${code}`);
        console.log(`    ${strategy.name}`);
        console.log();
      }
    });
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('Usage: ts-node index.ts <file-path> <strategy-code>');
    console.log('Example: ts-node index.ts words.txt --circular');
    console.log();
    console.log('Options:');
    console.log('  --list, --help, -h    Show this help message');
    process.exit(0);
  }

  if (args.length < 2) {
    console.error('Usage: ts-node index.ts <file-path> <strategy-code>');
    console.error('Example: ts-node index.ts words.txt --circular');
    console.error(`\nAvailable strategies: ${getAvailableStrategies().join(', ')}`);
    console.error('\nFor more details, run: ts-node index.ts --list');
    process.exit(1);
  }

  const [filePath, strategyCode] = args;
  const outputFilePath = FileUtility.generateOutputPath(filePath, strategyCode);

  try {
    const result = buildWordChain(filePath, strategyCode);
    
    // Display processing info
    console.log('Processing:', filePath);
    console.log('Strategy:', strategyCode);
    console.log('─────────────────────────────────────');
    console.log(`Words processed: ${result.chain.length}`);
    
    // Write to output file
    FileUtility.writeWords(outputFilePath, result.chain);
    
    console.log('─────────────────────────────────────');
    console.log('Success!');
    console.log(`📄 Output written to: ${outputFilePath}`);
    
  } catch (error) {
    const errorMessage = (error as Error).message;
    
    console.error('─────────────────────────────────────');
    console.error('Error:', errorMessage);
    
    // For circular strategy that can't form a circuit, create empty file
    if (errorMessage.includes('No Eulerian circuit exists') || 
        errorMessage.includes('No Eulerian path exists')) {
      console.log('─────────────────────────────────────');
      console.log('Cannot form valid chain with given words');
      console.log('Creating empty output file...');
      FileUtility.writeWords(outputFilePath, []);
      console.log(`📄 Empty file created: ${outputFilePath}`);
      process.exit(0);
    }
    
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

// Export main for programmatic use
export { main };
