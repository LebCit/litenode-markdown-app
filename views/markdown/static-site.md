---
title: Static Site
description: "Embracing simplicity and efficiency with Static Site Generation (SSG)"
image: "/static/images/my-image.png"
tags: ["HTML", "CSS", "JavaScript", "Static Site Generation", "SSG", "Web Development", "Project Organization"]
href: static-site
metadata:
    index: 12
    category: "Go Static!"
    catIndex: 4
    subcategory: Static Site
    subCatIndex: 1
    difficulty: Advanced
    audience: [Developer, Student]
---

# Static Sites: Embrace the Essence of the Web!

Static sites are popular for their simplicity, efficiency, and several advantages over traditional dynamic websites. Unlike dynamic sites that generate content on the fly, static sites are pre-rendered HTML, CSS, and JavaScript files that are served directly to users' browsers. This approach offers several benefits:

1. **Speed and Performance**: Static sites load faster due to the absence of server-side processing or database queries, resulting in quicker page loads and a smoother user experience.

2. **Security**: With no server-side processing or database interactions, static sites are inherently more secure against vulnerabilities like SQL injection or server attacks.

3. **Scalability**: They handle high traffic volumes more efficiently because each page is a simple file served by a web server, reducing server load and enabling seamless scaling.

4. **Simplicity and Lower Costs**: Building and maintaining static sites is often simpler and less resource-intensive compared to dynamic sites. They require minimal server resources and can be hosted inexpensively on content delivery networks (CDNs).

5. **Reliability**: Since static sites are composed of static files, they are less prone to downtime or performance issues caused by server-side problems.

6. **SEO Friendliness**: Pre-rendered content makes it easier for search engines to crawl and index pages, potentially improving search engine rankings.

Overall, static sites offer a robust solution for many use cases, providing speed, security, and scalability while simplifying development and maintenance efforts.

## Generating {#generating}

Let's convert our content into a static site using LiteNode's [renderToFile](https://litenode.pages.dev/docs/rendering-templates/#rendertofile) method, which makes this process simple and straightforward. While there are many approaches to generating a static site and numerous considerations for error handling, this tutorial focuses on the basics due to the simplicity of our small application. I'll walk you through the fundamental steps without additional complexities or enhancements.

## Build Script {#Build Script}

Create a file named `build.js` in the `functions` directory and add the following code:

```js
import { LiteNode } from "litenode"
import { markedParseAndHighlight } from "./markedParseAndHighlight.js"
import { cp, mkdir, rm } from "node:fs/promises"

const app = new LiteNode()

const pages = await app.parseMarkdownFileS("pages")
const titles = await app.extractMarkdownProperties(pages, ["title", "href"])
titles.sort((a, b) => (a.title < b.title ? -1 : 1))

async function build() {
	try {
		// Remove existing "_site" directory if it exists
		await rm("_site", { recursive: true, force: true })

		// Create output directories
		await mkdir("_site", { recursive: true })
		await mkdir("_site/static", { recursive: true })

		// Copy static folder to _site/static
		await cp("static", "_site/static", { recursive: true })

		// Define function to create the main route
		async function createMainRoute() {
			const parsedIndex = app.parseMarkdownFile("index.md")
			const html_content = markedParseAndHighlight.parse(parsedIndex.content)
			const { title, description } = parsedIndex.frontmatter

			// Create "index.html" in "_site" directory
			await app.renderToFile(
				"layouts/index.html",
				{
					title,
					description,
					html_content,
					entryRoute: true,
					titles,
				},
				"_site/index.html"
			)
		}

		// Define function to create each page route
		async function createPageRoute() {
			for (const page of pages) {
				try {
					const fileFrontmatter = page.frontmatter

					// Added to output each page in a directory matching its href
					const fileHREF = fileFrontmatter.href
					// Create a folder for each page
					await mkdir(`_site/page/${fileHREF}`, { recursive: true })

					const htmlContent = markedParseAndHighlight.parse(page.content)
					const toc = app.generateTOC(htmlContent)

					// Create HTML file out of each page
					await app.renderToFile(
						"layouts/index.html",
						{
							description: fileFrontmatter.description,
							title: fileFrontmatter.title,
							html_content: htmlContent,
							titles,
							pageRoute: true,
							html_toc: toc,
						},
						`_site/page/${fileHREF}/index.html`
					)
				} catch (error) {
					console.error(`Error processing page: ${page.fileName}`, error)
				}
			}
		}

		// Execute the route creation functions
		createMainRoute()
		createPageRoute()
	} catch (error) {
		console.error("Build error:", error)
	}
}

build()
```

## Build Explanation {#Build Explanation}

Let's break down the `build.js` script into smaller sections and explain each part:

### Import and Initialize {#Import and Initialize}

```javascript
import { LiteNode } from "litenode"
import { markedParseAndHighlight } from "./markedParseAndHighlight.js"
import { cp, mkdir, rm } from "node:fs/promises"

const app = new LiteNode()
```

In this section:

-   We import the `LiteNode` framework, `markedParseAndHighlight` module, and some file system methods from Node.js.
-   An instance of `LiteNode` is created.

### Parse and Sort {#Parse and Sort}

```javascript
const pages = await app.parseMarkdownFileS("pages")
const titles = await app.extractMarkdownProperties(pages, ["title", "href"])
titles.sort((a, b) => (a.title < b.title ? -1 : 1))
```

In this section:

-   We use `parseMarkdownFileS` to parse all markdown files in the 'pages' directory.
-   The `extractMarkdownProperties` method extracts the `title` and `href` properties from the parsed pages.
-   The `titles` array is sorted alphabetically by the title.

### Build Function {#Build Function}

```javascript
async function build() {
	try {
		// Remove existing "_site" directory if it exists
		await rm("_site", { recursive: true, force: true })

		// Create output directories
		await mkdir("_site", { recursive: true })
		await mkdir("_site/static", { recursive: true })

		// Copy static folder to _site/static
		await cp("static", "_site/static", { recursive: true })
```

In this section:

-   The `build` function is defined.
-   If the `_site` directory exists, it's removed.
-   New `_site` and `_site/static` directories are created.
-   The `static` folder is copied to `_site/static`.

### Create Main Route {#Create Main Route}

```javascript
// Define function to create the main route
async function createMainRoute() {
	const parsedIndex = app.parseMarkdownFile("index.md")
	const html_content = markedParseAndHighlight.parse(parsedIndex.content)
	const { title, description } = parsedIndex.frontmatter

	// Create "index.html" in "_site" directory
	await app.renderToFile(
		"layouts/index.html",
		{
			title,
			description,
			html_content,
			entryRoute: true,
			titles,
		},
		"_site/index.html"
	)
}
```

In this section:

-   The `createMainRoute` function is defined to handle the main route.
-   The `index.md` file is parsed.
-   The content is converted to HTML using `markedParseAndHighlight`.
-   The title and description are extracted from the frontmatter.
-   An `index.html` file is created in the `_site` directory using the specified layout and data.

### Create Page Routes {#Create Page Routes}

```javascript
// Define function to create each page route
async function createPageRoute() {
	for (const page of pages) {
		try {
			const fileFrontmatter = page.frontmatter

			// Added to output each page in a directory matching its href
			const fileHREF = fileFrontmatter.href
			// Create a folder for each page
			await mkdir(`_site/page/${fileHREF}`, { recursive: true })

			const htmlContent = markedParseAndHighlight.parse(page.content)
			const toc = app.generateTOC(htmlContent)

			// Create HTML file out of each page
			await app.renderToFile(
				"layouts/index.html",
				{
					description: fileFrontmatter.description,
					title: fileFrontmatter.title,
					html_content: htmlContent,
					titles,
					pageRoute: true,
					html_toc: toc,
				},
				`_site/page/${fileHREF}/index.html`
			)
		} catch (error) {
			console.error(`Error processing page: ${page.fileName}`, error)
		}
	}
}
```

In this section:

-   The `createPageRoute` function is defined to handle each individual page route.
-   For each page:
    -   We extract the frontmatter.
    -   A directory is created for each page based on its `href`.
    -   The content is converted to HTML using `markedParseAndHighlight`.
    -   A Table of Contents (TOC) is generated.
    -   An HTML file is created for each page using the specified layout and data.

### Execute Build {#Execute Build }

```javascript
		// Execute the route creation functions
		createMainRoute()
		createPageRoute()
	} catch (error) {
		console.error("Build error:", error)
	}
}

build()
```

In this section:

-   The `createMainRoute` and `createPageRoute` functions are called to create the necessary routes.
-   Any errors during the build process are caught and logged.

### Usage {#usage}

To automate the build process, you can add a script to your `package.json` file. This will allow you to run the build command easily from the terminal.

1. Open your `package.json` file.
2. Add the following script under the "scripts" section:

```json
"scripts": {
  "build": "node functions/build.js"
}
```

3. Save the `package.json` file.

Now, you can build your static site by running the following command in your terminal:

```sh
npm run build
```

Running this command executes the `build.js` script, generating your static site in the `_site` directory.

### Summary {#summary}

-   This script automates building a static site, making it simple and efficient.
-   It parses markdown files, sorts them, and generates HTML files using templates.
-   It handles the main index route and individual page routes, creating necessary directories and copying static assets.

## Preview {#preview}

To preview the content of the `_site` directory in a browser from an IDE like VS Code, you can follow these steps:

1. **Install the Live Server Extension in VS Code:**

    - Open VS Code and go to the Extensions view by clicking on the Extensions icon in the Sidebar or pressing `Ctrl+Shift+X`.
    - Search for "Live Server" and install it.

2. **Open the `_site` Directory in VS Code:**

    - Open the `_site` directory in VS Code by navigating to `File > Open Folder...` and selecting the `_site` directory.

3. **Start Live Server:**
    - Right-click on the `index.html` file inside the `_site` directory and select `Open with Live Server`.
    - This will start a local development server and open your default browser to display the contents of the `_site` directory.

Alternatively, you can use other tools or IDEs with similar live server functionality.

## Publish {#publish}

You can easily publish the `_site` directory content on various platforms that host static sites. Some popular options include:

1. **Azure Static Web Apps:**

    - [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/) provides a streamlined hosting option for static sites with built-in CI/CD workflows.

2. **Cloudflare Pages:**

    - [Cloudflare Pages](https://pages.cloudflare.com/) offers a fast, secure, and free way to deploy static sites directly from your Git repository.

3. **Deta Space:**

    - [Deta Space](https://deta.space/) is a platform for hosting personal and collaborative apps, including static sites.

4. **GitHub Pages:**

    - [GitHub Pages](https://pages.github.com/) allows you to host static sites directly from a GitHub repository. Simply push your `_site` directory to the `gh-pages` branch of your repository.

5. **GitLab Pages:**

    - [GitLab Pages](https://about.gitlab.com/product/pages/) allows you to host static sites from a GitLab repository. Configure the `.gitlab-ci.yml` file to build and deploy your `_site` directory.

6. **Netlify:**

    - [Netlify](https://www.netlify.com/) offers a simple way to deploy static sites. You can connect your repository, specify the build command (`npm run build`), and set the publish directory to `_site`.

7. **Render:**

    - [Render](https://render.com/) provides a unified cloud platform to deploy static sites quickly and efficiently.

8. **Surge:**

    - [Surge](https://surge.sh/) is a simple and straightforward platform for publishing static sites. Install the Surge CLI and deploy your `_site` directory with a single command.

9. **Vercel:**
    - [Vercel](https://vercel.com/) provides seamless deployment for static sites. Connect your repository, and Vercel will automatically handle the build and deployment process. Set the output directory to `_site`.

By using these platforms, you can easily publish and share your static site with others.

## Bonus {#bonus}

Don't stress about mastering Markdown syntax! To make things easier for you, I've included a handy [Markdown Cheat Sheet](/tutorial/markdown-cheat-sheet) as a bonus with this tutorial. Happy writing!
