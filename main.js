const fs = require('fs');
const path = require('path');

// Directory to traverse (defaults to the current directory)
const targetDir = process.argv[2] || __dirname;

// Skip these directories to avoid issues
const skipDirs = ['node_modules', '.git', 'dist', 'build'];

// Function to recursively traverse directories
function traverseDirectory(dirPath) {
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stats = fs.statSync(itemPath);
            
            if (stats.isDirectory()) {
                // Skip directories in the skipDirs list
                if (!skipDirs.includes(item)) {
                    traverseDirectory(itemPath);
                }
            } else if (stats.isFile() && item.endsWith('.js')) {
                // Skip the current file to avoid circular require
                if (path.resolve(itemPath) !== __filename) {
                    try {
                        moduleExports = require(itemPath);
                        
                        // Check if the module exports an outfunc function and call it
                        if (moduleExports && typeof moduleExports.outfunc === 'function') {
                            moduleExports.outfunc();
                        }
                    } catch (requireError) {
                        console.error(`Error requiring ${itemPath}: ${requireError.message}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Error accessing directory ${dirPath}: ${error.message}`);
    }
}

console.log(`Starting to traverse directory: ${targetDir}`);
traverseDirectory(targetDir);
console.log('\nFinished traversing directory');