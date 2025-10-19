import * as fs from 'fs';
import * as path from 'path';

/**
 * Utility class for file operations (reading and writing)
 */
export class FileUtility {
  /**
   * Reads content from a file at the specified path
   * @param filePath - Path to the file to read
   * @returns File content as a string
   */
  static readContent(filePath: string): string {
    try {
      const absolutePath = path.resolve(filePath);
      const content = fs.readFileSync(absolutePath, 'utf-8');
      return content;
    } catch (error) {
      throw new Error(`Failed to read file at ${filePath}: ${(error as Error).message}`);
    }
  }

  /**
   * Writes words to a file, one per line
   * @param filePath - Path to the output file
   * @param words - Array of words to write
   */
  static writeWords(filePath: string, words: string[]): void {
    try {
      const content = words.join('\n');
      const absolutePath = path.resolve(filePath);
      fs.writeFileSync(absolutePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write file at ${filePath}: ${(error as Error).message}`);
    }
  }

  /**
   * Generates output file path based on input file and strategy
   * @param inputFilePath - Original input file path
   * @param strategyCode - Strategy code used (e.g., '--circular')
   * @returns Output file path with strategy name
   */
  static generateOutputPath(inputFilePath: string, strategyCode: string): string {
    const parsedPath = path.parse(inputFilePath);
    
    // Remove -- prefix from strategy code for cleaner filename
    const strategyName = strategyCode.startsWith('--') 
      ? strategyCode.substring(2) 
      : strategyCode;
    
    // Generate new filename: original-name-strategy.txt
    const newFileName = `${parsedPath.name}-${strategyName}${parsedPath.ext}`;
    
    // Return full path in the same directory
    return path.join(parsedPath.dir, newFileName);
  }

  /**
   * Checks if a file exists
   * @param filePath - Path to check
   * @returns true if file exists, false otherwise
   */
  static exists(filePath: string): boolean {
    try {
      const absolutePath = path.resolve(filePath);
      return fs.existsSync(absolutePath);
    } catch {
      return false;
    }
  }

  /**
   * Gets the absolute path of a file
   * @param filePath - Relative or absolute path
   * @returns Absolute path
   */
  static getAbsolutePath(filePath: string): string {
    return path.resolve(filePath);
  }
}

