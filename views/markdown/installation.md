---
title: Installation
description: "Installing needed dependencies to create a Markdown application with LiteNode."
tags: ["Node.js", "Markdown", "Tutorial", "LiteNode", "Dependencies", "Installation", "Development Tools"]
href: installation
metadata:
    index: 1
    category: Starting
    catIndex: 1
    subcategory: Installation
    subCatIndex: 1
    difficulty: Beginner
    audience: [Developer, Student]
---

# Installing needed dependencies

Dependencies in Node.js are pre-made functionalities that an application depends on to work. A dependency can be as simple as a function that returns a message or a library shipping multiple helper functions.

When an application depends on multiple dependencies, it becomes heavier and more exposed to conflicts among them. Be very cautious when selecting dependencies for an application, ensuring they are well-maintained and compatible. Another aspect to check is how many dependencies a package relies on to avoid heavy, unmaintained, or incompatible scripts.

You can check various aspects of a dependency by visiting [PackagePhobia](https://packagephobia.com/), which also provides a link to the [NPM Graph](https://npmgraph.js.org/) for the inspected package.

## Dependency Types {#dependency-type}

In Node.js, dependencies are managed using package managers like [npm](https://www.npmjs.com/) (Node Package Manager), [Yarn](https://yarnpkg.com/), or [PNPM](https://pnpm.io/). There are mainly two types of dependencies you encounter in Node.js projects:

1. **Regular Dependencies (Dependencies):**

    - These are packages that your project needs to run in production. They are essential for the basic functionality of your application.
    - When you install a regular dependency using npm (`npm install <package-name>` or `npm i <package-name>`), it gets added to your `package.json` file under the `"dependencies"` section.
    - **Example**: LiteNode for building web applications, Marked for parsing Markdown files content, etc.

2. **Development Dependencies (DevDependencies):**

    - These are packages that are only needed for development and testing purposes, not for running your application in production.
    - Development dependencies include tools like testing frameworks (e.g., Jest, Mocha), code linters (e.g., ESLint), build tools (e.g., Webpack), etc.
    - When you install a development dependency (`npm install --save-dev <package-name>` or `npm i -D <package-name>`), it gets added to your `package.json` file under the `"devDependencies"` section.

### Managing Dependencies {#managing-dependencies}

-   **Installing Dependencies:** You install dependencies using npm, Yarn, or PNPM. npm is the default package manager for Node.js, while Yarn and PNPM offer additional features for dependency management.
-   **Package.json:** This file in your project directory contains metadata about your project and a list of dependencies. It also includes scripts, versioning information, and other metadata.
-   **Versioning:** Managing versions of dependencies is crucial to ensure the compatibility and stability of your application. You can specify versions in `package.json` using semantic versioning (`^`, `~`, `>=`, etc.) to control how updates are handled.

### Example {#example}

Here’s a simplified `package.json` file demonstrating dependencies and devDependencies:

```json
{
	"name": "my-nodejs-app",
	"version": "1.0.0",
	"dependencies": {
		"litenode": "^2.0.0",
		"marked": "^13.0.0"
	},
	"devDependencies": {
		"jest": "^29.7.0",
		"eslint": "^9.5.0"
	}
}
```

-   In this example, `litenode` and `marked` are regular dependencies required for the application to run.
-   `jest` and `eslint` are development dependencies used for testing and code linting during development.

Managing dependencies effectively ensures your Node.js application remains functional, secure, and maintainable across different environments and updates.

## Our Dependencies {#our-dependencies}

For our application, we will need:

1. [LiteNode](https://www.npmjs.com/package/litenode): The Node.js Web framework that loves Markdown.
2. [Marked](https://www.npmjs.com/package/marked): The markdown parser and compiler. Built for speed.
3. [highlight.js](https://www.npmjs.com/package/highlight.js): The Internet's favorite JavaScript syntax highlighter.
4. [marked-highlight](https://www.npmjs.com/package/marked-highlight): Highlights code blocks parsed with Marked using highlight.js.

Given that our application will include code blocks, it's preferable to highlight them. Otherwise, we would only require `LiteNode` and `Marked`. While you can utilize other Markdown parsers and syntax highlighters, I recommend using `Marked` and `highlight.js`.

## Root Directory {#root-directory}

Assuming you have Node.js installed on your machine with a package manager (I use npm), we are now ready to start coding:

1. Create a folder called `litenode-markdown-app` in the location of your choice.
2. Open this folder with a code editor.

For easier Markdown handling, choose a code editor that natively supports Markdown, such as [VS Code](https://code.visualstudio.com/) or [VS Codium](https://vscodium.com/), or supports it via plugins like [Sublime Text](https://www.sublimetext.com/).

## The Terminal {#the-terminal}

In modern code editors like VS Code, you can use integrated terminals that support various command-line interfaces such as [Git Bash](https://git-scm.com/) or [PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.4). Here’s how you can use each:

1. **Git Bash:**

    - Git Bash is a command-line interface for Git on Windows, providing a Unix-like shell experience.
    - Many developers prefer Git Bash because it offers familiar Unix commands and utilities.
    - To use Git Bash in your code editor's integrated terminal:
        - Ensure Git Bash is installed on your system.
        - Open your code editor (e.g., VS Code).
        - Open the integrated terminal (View > Terminal).
        - Choose Git Bash as the default terminal shell (you can set this in the terminal dropdown or configure it in settings).

2. **PowerShell:**

    - PowerShell is a powerful command-line shell and scripting language developed by Microsoft.
    - It is the default shell in Windows and provides extensive scripting capabilities.
    - To use PowerShell in your code editor's integrated terminal:
        - Open your code editor (e.g., VS Code).
        - Open the integrated terminal (View > Terminal).
        - Choose PowerShell as the default terminal shell (you can set this in the terminal dropdown or configure it in settings).

**Benefits of Using Integrated Terminals:**

-   **Efficiency:** You can execute Git commands, run scripts, and perform various tasks without leaving your code editor.
-   **Integration:** Access project-specific commands and tools directly within your development environment.
-   **Consistency:** Ensure consistent behavior and environment configuration across team members using the same setup.

Using Git Bash or PowerShell in your code editor’s integrated terminal streamlines development workflows by providing powerful command-line capabilities directly within your [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment), enhancing productivity and consistency.

## Initialization {#initialization}

In the [integrated terminal](#the-terminal) of your code editor, type (then press Enter):

```bash
npm init -y
```

This will initialize a new Node.js project with default settings in a `package.json` file, skipping the interactive questionnaire that normally prompts for project details. The `init` command initializes a new npm package in the current directory. It sets up a `package.json` file, which is a metadata file for our project that includes information like project name, version, dependencies, and other settings. The `-y` flag stands for "yes". When used with `npm init`, it automatically accepts all default values for the prompts that would normally be presented during the initialization process.

The created `package.json` looks like this:

```json
{
	"name": "litenode-markdown-app",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"keywords": [],
	"author": "",
	"license": "ISC"
}
```

## Installation {#installation}

Let the fun begin!

In the [integrated terminal](#the-terminal) of your code editor, type (then press Enter):

```bash
npm i litenode marked highlight.js marked-highlight
```

This will install the packages as dependencies. We could have installed them as development dependencies since we are developing locally and the final goal is to generate a static site where none of them will be present or needed, but let's proceed as if we were on a live server where they'll be required for our application to work.

<alert data-sm="2column pad gap">
    <alert-icon data-sm="middle textC">
        <img src="https://cdn.jsdelivr.net/npm/@tabler/icons@2.44.0/icons/info-hexagon.svg" alt="Information SVG" />
    </alert-icon>
    <alert-text data-sm="middle textL">
    <strong>BREAKING CHANGE:</strong> As of version 3.0.0, LiteNode no longer supports being loaded using <code>require</code>. This change aims to maintain and enhance LiteNode in a modular way, which would be difficult to achieve if backward compatibility with CommonJS were maintained.
    </alert-text>
</alert>

## Next {#next}

In the next section, we will delve into the [process](/tutorial/process) of how our application functions.
