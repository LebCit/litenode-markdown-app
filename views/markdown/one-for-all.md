---
title: One For All
description: "Establishing a consistent data structure for all Markdown files."
image: "/static/images/my-image.png"
tags: ["Node.js", "Markdown", "Tutorial", "LiteNode", "Data Structure", "Unified System", "Project Organization"]
href: one-for-all
metadata:
    index: 5
    category: Structuring
    catIndex: 2
    subcategory: One For All
    subCatIndex: 2
    difficulty: Intermediate
    audience: [Developer, Student]
---

# One For All: Uniform Data Structuring for Markdown Files

As mentioned earlier, the frontmatter of a Markdown file contains crucial metadata about the document. This metadata is parsed into a data object which is then injected into a template for rendering in the browser.

To maximize the benefits of using reusable component templates and dynamically injected data with the `{{}}` syntax, it is essential that each Markdown file's frontmatter contains all necessary data fields.

It's also important to note that in a template, we cannot render a data property like `{{title}}` if it hasn't been provided in the Markdown frontmatter during the rendering process.

## Markdown Files {{#Markdown Files}}

First, let's create a `pages` folder within the `views` directory. Populate it with the following Markdown files, which are crucial for our workflow.

### installation.md {#installation-markdown-file}

````md
---
title: Installation
description: How to install LiteNode
tags: [installation, setup, npm]
href: installation
metadata:
    category: Getting Started
    difficulty: Easy
---

To install LiteNode, use npm:

```bash
npm install litenode
```
````

### basic-usage.md {#basic-usage-markdown-file}

````markdown
---
title: Basic Usage
description: Creating a basic server with LiteNode
tags: [basic, usage, server]
href: "basic-usage"
metadata:
    category: Getting Started
    difficulty: Easy
---

A simple example to create a server with LiteNode:

```js
import { LiteNode } from "litenode"

const app = new LiteNode()

app.get("/", (req, res) => {
	res.end("Hello, LiteNode!")
})

app.startServer()
```
````

### middleware.md {#middleware-markdown-file}

````markdown
---
title: Middleware
description: Using middleware in LiteNode
tags: [middleware, usage, examples]
href: middleware
metadata:
    category: Core Concepts
    difficulty: Intermediate
---

Add middleware to process requests before reaching routes:

```js
app.use((req, res) => {
	// Log the method and URL of the incoming request
	console.log(`${req.method} ${req.url}`)
})
```
````

### error-handling.md {#error-handling-markdown-file}

````markdown
---
title: Error Handling
description: Handling errors in LiteNode
tags: [error, handling, usage]
href: error-handling
metadata:
    category: Advanced
    difficulty: Advanced
---

Handle errors globally with LiteNode:

```js
// Define custom error handling for internal server errors
app.onError(async (err, req, res) => {
	// Set the response status code to 500 (Internal Server Error)
	res.writeHead(500)
	// Send a response indicating internal server error
	res.end("Internal Server Error")

	// You can simplify both lines above by:
	res.status(500).txt("Internal Server Error")
})
```
````

### add-ids-to-headings.md {#add-ids-to-headings-markdown-file}

```markdown
---
title: Add IDs to Headings
description: "Adding custom IDs to HTML headings using the {{# id}} syntax in Markdown."
tags: [Markdown, Headings, HTML, IDs]
href: add-ids-to-headings
metadata:
    category: Markdown
    difficulty: Intermediate
---

The `{{# id}}` syntax allows you to add custom IDs to HTML headings in Markdown.<br>
This is useful for creating anchor links and improving navigation within your documents.

Example Usage:

# Introduction {#intro}

## Getting Started {#getting-started}

### Advanced Topics {#advanced-topics}
```

### Structure {#structure}

As you can see, these Markdown files share the same frontmatter structure. While this consistency is not mandatory, the key point to note is that all files include `title` and `description` properties, which are defined in the reusable `head.html` template.

This diagram illustrates the hierarchical structure of the `pages` directory located within `views`.

```txt
📂views (views directory)
└── 📂pages (pages directory)
  ├── 📄add-ids-to-headings.md (Markdown file)
  ├── 📄basic-usage.md (Markdown file)
  ├── 📄error-handling.md (Markdown file)
  ├── 📄installation.md (Markdown file)
  └── 📄middleware.md (Markdown file)
```

## Markdown Files Route {#markdown-files-route}

While rendering a single Markdown file on a specific route is straightforward, repeating this process for multiple files would violate the DRY (Don't Repeat Yourself) principle. Creating individual routes for each file would be cumbersome and inefficient.

That's why LiteNode introduces a special method called [parseMarkdownFiles](https://litenode.pages.dev/docs/markdown/#parse-markdown-files), designed for such cases. This method allows us to maintain a unified codebase for all Markdown files within a same directory, like our `pages`.

### Unified Code {#Unified Code}

Open `index.js` and populate it with the following code snippet (after entry's route code and before starting the server):

```javascript
// Create an individual dynamic route for each Markdown file
app.get("/page/:href", async (req, res) => {
	// Parse the Markdown files in the "pages" directory with LiteNode's parseMarkdownFileS method
	const parsedMarkdownFiles = await app.parseMarkdownFileS("pages")

	// Find the currentMarkdownFile form parsedMarkdownFiles by its `href` property in its frontmatter
	const currentMarkdownFile = parsedMarkdownFiles.find((file) => file.frontmatter.href === req.params.href)

	// Test if such a file exists
	if (currentMarkdownFile) {
		// If the file exists, extract the needed data from its frontmatter to be transferred
		const { title, description } = currentMarkdownFile.frontmatter

		// Parse the file `content` with Marked
		const html_content = marked.parse(currentMarkdownFile.content)

		// Render currentMarkdownFile with assigned data object
		res.render("layouts/index.html", { title, description, html_content })
	} else {
		// If the requested route doesn't match a Markdown file's href property,
		// send a plain text message to inform the user that it doesn't exist.
		res.status(404).txt("Route Not Found!")
	}
})
```

### Explanation {#unified-code-explanation}

1. **Route Definition:**

    - `app.get("/page/:href", async (req, res) => { ... })`: Defines a GET route where `:href` is a route parameter. This means the endpoint will match any GET requests to `/page/something`, where `something` can be dynamically accessed as `req.params.href`.

2. **Parsing Markdown Files:**

    - `const parsedMarkdownFiles = await app.parseMarkdownFileS("pages")`: Uses the `parseMarkdownFileS` method to asynchronously parse Markdown files located in the "pages" directory.

3. **Finding the Markdown File:**

    - `const currentMarkdownFile = parsedMarkdownFiles.find((file) => file.frontmatter.href === req.params.href)`: Searches through the parsed Markdown files (`parsedMarkdownFiles`) to find a file whose `href` property in its frontmatter matches the value of `req.params.href` (extracted from the route parameter).

4. **File Existence Check:**

    - `if (currentMarkdownFile) { ... }`: Checks if `currentMarkdownFile` exists and is truthy. If a Markdown file matching the `href` is found, the code inside the `if` block executes.

5. **Extracting Metadata and Parsing Content:**

    - `const { title, description } = currentMarkdownFile.frontmatter`: Destructure `title` and `description` from the frontmatter object of `currentMarkdownFile`.
    - `const html_content = marked.parse(currentMarkdownFile.content)`: Uses the `marked` library to parse the Markdown content (`currentMarkdownFile.content`) into HTML format (`html_content`).

6. **Rendering the HTML:**

    - `res.render("layouts/index.html", { title, description, html_content })`: Renders the HTML content (`html_content`) along with `title` and `description` into the specified view template (`layouts/index.html`).

7. **Handling Route Not Found:**
    - `else { res.status(404).txt("Route Not Found!") }`: If no Markdown file matching the requested `href` is found (`currentMarkdownFile` is falsy), the endpoint responds with a 404 Not Found status and sends the plain text "Route Not Found!" as the response. This ensures appropriate feedback to the client when the requested route does not correspond to any available Markdown files parsed by LiteNode.

### Restart Server {#restart server}

Since we've updated `index.js`, let's restart the server to apply these changes. If the server is running, it won't automatically detect the updates, so a quick restart is necessary. In the terminal, you can achieve this by following these steps:

1. **Stop the Server:**
    - Hold `Ctrl + C` in the terminal to stop the currently running server.
2. **Restart the Server:**
    - Type `node index` and press `Enter` to start the server again.

Alternatively, you can use the up/down arrows to navigate to the previous `node index` command in your terminal history and press `Enter` to restart the server with the modified `index.js` file.

#### Note on restart {#note-on-restarting-the-server}

Restarting the server might seem like a hassle at first, but as you get familiar with the project's structure, it becomes a minor step. It's mainly needed to apply changes in your server-side code. For instance, if you modify a Markdown file and reload your browser, the updates will appear instantly without needing to restart the server. This efficiency is because the functions responsible for parsing and rendering are integrated directly within their respective routes, ensuring immediate reflection of changes.

Alternatively, to streamline this process, you can utilize development dependencies like [Nodemon](https://www.npmjs.com/package/nodemon). Nodemon automates the task of monitoring file changes in your project directory. It detects modifications in your index.js file or any other specified files, automatically restarting the server for you. This way, you can focus on development tasks without the interruption of manually stopping and restarting the server.

### Inspect Files Route {# Inspect Files Route}

Now that the server has restarted, you can verify that the unified route for our Markdown files functions correctly and that the content of each file renders as expected by accessing the following URLs:

1. [http://localhost:5000/page/installation](http://localhost:5000/page/installation)
2. [http://localhost:5000/page/basic-usage](http://localhost:5000/page/basic-usage)
3. [http://localhost:5000/page/middleware](http://localhost:5000/page/middleware)
4. [http://localhost:5000/page/error-handling](http://localhost:5000/page/error-handling)
5. [http://localhost:5000/page/add-ids-to-headings](http://localhost:5000/page/add-ids-to-headings)

These links should now display the respective Markdown file contents, confirming that the server setup and Markdown parsing are functioning correctly.

As you can see, each Markdown file's `title` is correctly displayed in the browser tab, and its content is rendered properly on the page. Additionally, you'll notice that the `header.html` and `footer.html` reusable components are also correctly rendered. This demonstrates one of the significant benefits of dividing our HTML into reusable components: writing them once and utilizing them multiple times throughout our application.

To inspect the `description` property of each file, you can view the page source by pressing `Ctrl + U` in your browser. Look for the content within the `<meta>` tags labeled as 'description'. This provides a concise summary of each page's content, enhancing [search engine optimization](https://en.wikipedia.org/wiki/Search_engine_optimization) (SEO) and user understanding.

## Next {#Next}

Our application now correctly displays the content of both the entry route `/` and each individual Markdown file within the `pages` directory using the dynamic route `/page/:href`.

Upon inspecting the content of these files, you may notice that code blocks appear as plain text, differentiated only by a thinner and different font compared to other content types. To enhance the presentation of code blocks, we will implement code highlighting in the next section. Find out how in [Highlight Code](/tutorial/highlight-code).
