---
title: Sliced Backend
description: Structuring the backend into modular components for scalability and maintainability
image: "/static/images/my-image.png"
tags: ["Node.js", "Backend Architecture", "Project Organization", "Modular Components", "Scalability", "Maintainability"]
href: sliced-backend
metadata:
    index: 7
    category: Structuring
    catIndex: 2
    subcategory: Sliced Backend
    subCatIndex: 4
    difficulty: Advanced
    audience: [Developer, Student]
---

# Sliced Backend : The Art of Maintaining a Scalable Architecture

## Modular Architecture Foundations {#Modular Architecture Foundations}

Creating applications of any size requires disciplined coding practices to ensure long-term viability and ease of maintenance. Modularizing the codebase is crucial for achieving scalability and maintaining a structured architecture that can grow with the application's demands. By breaking down the application into modular components, each responsible for specific functionalities or features, developers can achieve several benefits:

1. **Scalable Architecture:** Modularization allows the application to scale effectively as requirements evolve. New features can be added or existing ones modified without disrupting the entire codebase. Each module can be independently developed, tested, and deployed, facilitating agile development practices.

2. **Ease of Maintenance:** With a modular architecture, maintenance becomes more manageable. Developers can isolate issues to specific modules, making debugging and troubleshooting more efficient. Updates and optimizations can be applied to individual modules without affecting other parts of the application.

3. **Code Reusability:** Modular components are inherently reusable. Common functionalities or patterns can be encapsulated into modules that can be easily reused across different parts of the application or even in future projects. This reduces redundancy and promotes consistency in coding practices.

4. **Team Collaboration:** Modularization encourages collaboration among team members. Each module can have clear boundaries and interfaces, making it easier for multiple developers to work concurrently on different parts of the application without stepping on each other's toes.

5. **Flexibility and Adaptability:** A well-modularized application is more adaptable to changes in technology, business requirements, or user needs. Modules can be replaced or upgraded independently, allowing the application to stay current and competitive in the long term.

In essence, modularizing an application encourages good coding practices, enhancing development efficiency and ensuring that the application remains maintainable, scalable, and adaptable over its lifecycle. This approach is foundational for building robust, sustainable software solutions that can grow and evolve over time.

## Functions Directory {#Functions Directory}

To keep your project organized and maintainable, avoid cluttering `index.js` with all the code. Instead, create a functions directory to house specific task-related functions. Instead, a more structured approach involves creating a `functions` directory at the root of our application. This directory will house dedicated files containing specific functions tailored to different tasks within the application. This modular setup ensures that functions are logically grouped and can be easily called wherever needed, promoting code reusability and clarity throughout the project.

### markedParseAndHighlight.js {#markedParseAndHighlight-function}

Create a file named `markedParseAndHighlight.js` in the `functions` directory and add the following code:

```js
import { Marked } from "marked"
import hljs from "highlight.js/lib/core"
import { markedHighlight } from "marked-highlight"

/**
 * It is more efficient to import only the library and register the languages we need
 * 1. List of languages to import and register
 * 2. Function to register Highlight.js languages asynchronously
 */
const languages = ["bash", "javascript", "plaintext"] // 1

const registerLanguages = async () => {
	for (const lang of languages) {
		try {
			const module = await import(`highlight.js/lib/languages/${lang}`)
			hljs.registerLanguage(lang, module.default)
		} catch (error) {
			console.error(`Failed to import ${lang} language module`, error)
		}
	}
} // 2

// Call the async function to register languages
registerLanguages()

// Configuring marked with markedHighlight and exporting it for reuse where needed
export const markedParseAndHighlight = new Marked(
	markedHighlight({
		langPrefix: "hljs language-",
		highlight(code, lang, info) {
			// Check if the language is registered, otherwise default to plaintext
			const language = hljs.getLanguage(lang) ? lang : "plaintext"

			// Transform code to highlighted HTML
			return hljs.highlight(code, { language }).value
		},
	})
)
```

The `export const markedParseAndHighlight` statement facilitates the export of a configured `Marked` instance enhanced with `markedHighlight`, which optimizes Markdown parsing and enables syntax highlighting. This export enables seamless integration into other modules within the application through imports like:

```js
import { markedParseAndHighlight } from "./functions/markedParseAndHighlight.js"
```

This approach enhances code modularity by consolidating related functionalities, thereby promoting code reuse across different components of the application.

In essence, leveraging the `export` statement in Node.js supports the modular organization of code. By defining functions in separate modules, it enhances clarity and maintenance while facilitating the isolation of specific functionalities. This modular approach contributes to cleaner codebases, improved scalability, and better management of application complexity.

### Update index.js {#Update index js for functions}

In `index.js`, we previously replaced `import { marked } from "marked"` with a code block. Now, delete the code block entirely and replace it with just:

```js
// Importing 'markedParseAndHighlight' from "./functions/markedParseAndHighlight.js"
import { markedParseAndHighlight } from "./functions/markedParseAndHighlight.js"

// Assigning 'markedParseAndHighlight' to the 'marked' constant
const marked = markedParseAndHighlight
```

[Restart your server](/tutorial/one-for-all#restart-server) and [inspect each file route](/tutorial/one-for-all#inspect-files-route). You'll notice that `markedParseAndHighlight`, which we imported, performs correctly.

## Routes Directory {# Routes Directory}

Although `index.js` has been streamlined by moving parsing and highlighting logic to a separate module, further improvement can be achieved by organizing each route into its own file, exporting them, and then re-importing them into `index.js`.

Let's create a `routes` directory at the root of our application and add two files:

1. `entryRoute.js`: This module will handle the logic for the entry route.
2. `pageRoute.js`: This module will handle the dynamic logic for each individual page.

### entryRoute.js {#entryRoute-js}

Add the following code to `entryRoute.js`:

```js
// Export entryRoute
export const entryRoute = (app, marked) => {
	app.get("/", (req, res) => {
		// Parse the Markdown file with LiteNode's parseMarkdownFile method
		const parsedIndex = app.parseMarkdownFile("index.md")

		// Getting the content out of the parsed file
		const html_content = marked.parse(parsedIndex.content)

		// Extract title and description from the file frontmatter
		const { title, description } = parsedIndex.frontmatter

		// Render index.html with assigned data object
		res.render("layouts/index.html", { title, description, html_content })
	})
}
```

### pageRoute.js {#pageRoute-js}

Add the following code to `pageRoute.js`:

```js
// Export dynamic route for each Markdown file
export const pageRoute = (app, marked) => {
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
}
```

### Update index.js {#Update index js for routes}

Delete everything in `index.js` and populate it with the following code:

```js
// Import LiteNode and Marked using ES6 import syntax
import { LiteNode } from "litenode"

// Importing 'markedParseAndHighlight' from "./functions/markedParseAndHighlight.js"
import { markedParseAndHighlight } from "./functions/markedParseAndHighlight.js"

// Import entryRoute
import { entryRoute } from "./routes/entryRoute.js"

// Import pageRoute
import { pageRoute } from "./routes/pageRoute.js"

// Create a new instance of LiteNode
const app = new LiteNode()

// Assigning 'markedParseAndHighlight' to the 'marked' constant
const marked = markedParseAndHighlight

// Create the entry route
entryRoute(app, marked)

// Create dynamic route for each Markdown file
pageRoute(app, marked)

// Start the server
app.startServer()
```

[Restart your server](/tutorial/one-for-all#restart-server) and [inspect each file route](/tutorial/one-for-all#inspect-files-route) to verify that everything works as expected.

### Explanation {# explanation}

Both functions, `entryRoute` and `pageRoute`, are defined with two parameters: `app` and `marked`. Parameters act as placeholders that receive values when the functions are called, enabling them to receive essential data or information required for their operations. These parameters behave like variables within the functions' scope, being initialized with specific values each time the functions are invoked.

In our `index.js` file, when calling `entryRoute` and `pageRoute`, we pass actual values (arguments) that correspond to each parameter positionally. Specifically:

-   `app` represents the LiteNode instance created using `new LiteNode()`.
-   `marked` refers to the constant `marked`, which is assigned the value of `markedParseAndHighlight` from our imported module.

## Conclusion {#conclusion}

Now, index.js includes only the essential code, thanks to our modular approach. This improvement is achieved by organizing and modularizing the previous code into separate, reusable modules as needed.

## Next {#next}

Now that we've reviewed the backend structure of our application, the next part of this chapter focuses on controlling template rendering based on conditions. You might have observed that we are currently loading the highlighting stylesheet `a11y-dark.min.css` on both the entry route and each page route. However, it's actually only necessary on routes serving Markdown files from the `pages` directory, where code blocks may be present. We'll tackle this issue in the next section: [Conditionals](/tutorial/conditionals). Stay tuned!
