import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log(chalk.blue('Creating React app...'));

  try {
    const appName = process.argv[2];
    if (!appName) {
      throw new Error('App name is required. Usage: node cli.js <app-name>');
    }
    await createReactApp(appName);
    console.log(chalk.green('React app created successfully!'));
  } catch (error) {
    console.error(chalk.red('Error creating React app:', error.message));
  }
}

async function createReactApp(appName) {
  // Define project structure
  const projectRoot = path.join(process.cwd(), appName);
  const srcDir = path.join(projectRoot, 'src');
  const distDir = path.join(projectRoot, 'dist');
  const templateDir = path.join(projectRoot, 'templates', 'dist'); // Adjusted template directory path
  
  // Create project directories
  fs.mkdirSync(projectRoot, { recursive: true });
  fs.mkdirSync(srcDir);
  fs.mkdirSync(distDir);
  fs.mkdirSync(path.join(projectRoot, 'templates', 'dist'), { recursive: true }); // Ensure template/dist directory is created

  // Copy template files to project directory
  fs.copyFileSync(path.resolve(__dirname, 'templates/dist/index.html'), path.join(templateDir, 'index.html')); // Adjusted file path
  fs.copyFileSync(path.resolve(__dirname, 'templates/src/App.js'), path.join(srcDir, 'App.js')); // Adjusted file path
  fs.copyFileSync(path.resolve(__dirname, 'templates/src/index.js'), path.join(srcDir, 'index.js')); // Adjusted file path
  fs.copyFileSync(path.resolve(__dirname, 'templates/src/other.js'), path.join(srcDir, 'other.js')); // Adjusted file path
  
  // Create package.json
  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-scripts': '5.0.1',
      'web-vitals': '^2.1.4'
    },
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test',
      eject: 'react-scripts eject'
    },
    eslintConfig: {
      extends: ['react-app', 'react-app/jest']
    },
    browserslist: {
      production: ['>0.2%', 'not dead', 'not op_mini all'],
      development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version']
    }
  };

  fs.writeFileSync(path.join(projectRoot, 'package.json'), JSON.stringify(packageJson, null, 2));
}

main();
