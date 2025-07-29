#!/usr/bin/env node

/**
 * Clean Script for Rick and Morty Project
 * Removes temporary files and build artifacts
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

// Directories to clean
const dirsToClean = [
  '.next',
  'node_modules/.cache',
  'dist',
  'build'
];

// File patterns to clean
const filesToClean = [
  '*.log',
  '*.tmp',
  '.DS_Store',
  'Thumbs.db'
];

function cleanDirectory(dirPath) {
  const fullPath = path.join(projectRoot, dirPath);
  
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✅ Cleaned: ${dirPath}`);
    } catch (error) {
      console.error(`❌ Error cleaning ${dirPath}:`, error.message);
    }
  }
}

function cleanFiles(pattern) {
  // Simple implementation for common files
  const commonFiles = [
    path.join(projectRoot, '.DS_Store'),
    path.join(projectRoot, 'Thumbs.db'),
    path.join(projectRoot, 'npm-debug.log'),
    path.join(projectRoot, 'yarn-error.log')
  ];
  
  commonFiles.forEach(file => {
    if (fs.existsSync(file)) {
      try {
        fs.unlinkSync(file);
        console.log(`✅ Removed: ${path.basename(file)}`);
      } catch (error) {
        console.error(`❌ Error removing ${file}:`, error.message);
      }
    }
  });
}

function main() {
  console.log('🧹 Starting project cleanup...\n');
  
  // Clean directories
  dirsToClean.forEach(cleanDirectory);
  
  // Clean files
  cleanFiles();
  
  console.log('\n✨ Project cleanup completed!');
}

if (require.main === module) {
  main();
}

module.exports = { cleanDirectory, cleanFiles };
