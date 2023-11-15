const execa = require('execa');
const ora = require('ora');
const fs = require('fs-extra');

const cwd = process.cwd();
const path = require('path');

const questions = require('./questions');

module.exports = async () => {
  const vars = await questions();
  const projectName = vars.name;
  const authorName = vars.authorName;
  const spinner = ora({ text: '' });

  function convertToPascalCase(name) {
    return name
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  const authorNamePascalCase = convertToPascalCase(authorName);

  try {
    // Create project
    spinner.start('Creating your project');
    await execa('npx', [
      'create-next-app@latest',
      projectName,
      '--typescript',
      '--tailwind',
      '--eslint',
      '--src-dir',
      '--app',
      '--import-alias',
      'default'
    ]);
    spinner.succeed('Project created successfully.');

    process.chdir(projectName);

    // Install dependencies
    spinner.start('Installing \'gray-matter\', \'react-icons\', \'remark\', \'remark-html\' dependencies');
      const pkgs = [
        'gray-matter@^4.0.3',
        'react-icons@^4.7.1',
        'remark@^14.0.2',
        'remark-html@^15.0.2'
      ];
      await execa('npm', ['install', ...pkgs]);
      await execa('npm', ['dedupe']);
    spinner.succeed('Dependencies installed successfully.');

    // Copy files
    spinner.start('Configuring template path');
      const templateFolderPath = path.resolve(__dirname, '..', 'template');

      const packagejsonSource = path.join(templateFolderPath, 'package.json');
      const packagejsonDestination = path.join(cwd, projectName, 'package.json');
      const readmeSource = path.join(templateFolderPath, 'Readme.md');
      const readmeDestination = path.join(cwd, projectName, 'README.md');
      const blogpostsSource = path.join(templateFolderPath, 'blogposts');
      const blogpostsDestination = path.join(cwd, projectName, 'blogposts');
      const libSource = path.join(templateFolderPath, 'lib');
      const libDestination = path.join(cwd, projectName, 'lib');
      
      const pageSource = path.join(templateFolderPath, 'page.tsx');
      const pageDestination = path.join(cwd, projectName, 'src/app', 'page.tsx');
      const layoutSource = path.join(templateFolderPath, 'layout.tsx');
      const layoutDestination = path.join(cwd, projectName, 'src/app', 'layout.tsx');
      const globalsSource = path.join(templateFolderPath, 'globals.css');
      const globalsDestination = path.join(cwd, projectName, 'src/app', 'globals.css');
      const componentsSource = path.join(templateFolderPath, 'components');
      const componentsDestination = path.join(cwd, projectName, 'src/app', 'components');
      const postsSource = path.join(templateFolderPath, 'posts');
      const postsDestination = path.join(cwd, projectName, 'src/app', 'posts');
      
      const githubSvgSource = path.join(templateFolderPath, 'github.svg');
      const githubSvgDestination = path.join(cwd, projectName, 'public', 'github.svg');

      await fs.copy(packagejsonSource, packagejsonDestination, { overwrite: true });
      await fs.copy(readmeSource, readmeDestination, { overwrite: true });
      await fs.copy(blogpostsSource, blogpostsDestination, { overwrite: true });
      await fs.copy(libSource, libDestination, { overwrite: true });

      await fs.copy(pageSource, pageDestination, { overwrite: true });
      await fs.copy(layoutSource, layoutDestination, { overwrite: true });
      await fs.copy(globalsSource, globalsDestination, { overwrite: true });
      await fs.copy(componentsSource, componentsDestination, { overwrite: true });
      await fs.copy(postsSource, postsDestination, { overwrite: true });

      await fs.copy(githubSvgSource, githubSvgDestination, { overwrite: true });

      // Replace {{authorName}} in Project with the project name
      const navbarPath = path.join(cwd, projectName, 'src', 'app', 'components', 'Navbar.tsx');
      const navbarContent = await fs.readFile(navbarPath, 'utf-8');
      const updatedNavbarContent = navbarContent.replace(/{{personName}}/g, authorNamePascalCase);
      await fs.writeFile(navbarPath, updatedNavbarContent);

      // Replace {{authorName}} in Project with the project name
      const pagePath = path.join(cwd, projectName, 'src', 'app', 'page.tsx');
      const pageContent = await fs.readFile(pagePath, 'utf-8');
      const updatedPageContent = pageContent.replace(/{{personName}}/g, authorNamePascalCase);
      await fs.writeFile(pagePath, updatedPageContent);

      // Replace {{name}} in README.md with the project name
      const readmePath = path.join(cwd, projectName, 'README.md');
      const readmeContent = await fs.readFile(readmePath, 'utf-8');
      const updatedReadmeContent = readmeContent.replace(/{{name}}/g, projectName);
      await fs.writeFile(readmePath, updatedReadmeContent);
		spinner.succeed('Template path configured successfully.');


    console.log(`\nDone. Now run:\n`);
    console.log('\t' + `cd ${projectName}`);
    console.log('\t' + `npm run dev`);
  } catch (error) {
    spinner.fail();
    console.error(`Error creating project: ${error.message}`);
  }
};
