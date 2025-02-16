---
title: First File
description: "Detailed process for parsing and rendering a Markdown file."
tags: ["Node.js", "Markdown", "Tutorial", "LiteNode", "First File", "Rendering", "HTML", "Frontmatter"]
href: first-file
metadata:
    index: 3
    category: Starting
    catIndex: 1
    subcategory: First File
    subCatIndex: 3
    difficulty: Beginner
    audience: [Developer, Student]
---

# Rendering our first Markdown file

Keep in mind that if our application didn't require highlighting code blocks, we would only need to install `LiteNode` and `Marked` as mentioned earlier in [Our Dependencies](/tutorial/installation#our-dependencies).

## Why Markdown? {#why-markdown}

Why do we use Markdown in the first place, if it eventually renders an HTML file? Simply put, Markdown is plain text! Instead of crafting intricate HTML structures, we opt for a plaintext markup language that automates this process for us.

Markdown offers several advantages over HTML for creating and formatting text content:

1. **Simplicity**: Markdown syntax is straightforward and easy to learn compared to HTML. It uses simple characters like `#` for headers, `*` or `_` for emphasis, and `-` or `*` for lists, which makes writing and formatting text quicker.
2. **Readability**: Markdown files are inherently more readable than HTML. The syntax is closer to plain text, so even without rendering, the structure of the document is clear.
3. **Ease of Use**: Writing Markdown is faster because you don't need to write verbose HTML tags. For example, `# Header 1` in Markdown vs. `<h1>Header 1</h1>` in HTML.
4. **Portability**: Markdown files are plain text files, which means they can be opened and edited in any text editor. They are also platform-independent and can be easily version-controlled with tools like [Git](https://git-scm.com/).
5. **Focus on Content**: Markdown allows writers to focus more on the content itself rather than worrying about formatting details. This can be particularly useful for note-taking, documentation, and writing articles.
6. **Widely Supported**: Markdown is supported by many platforms, tools, and content management systems (CMS). This makes it a versatile choice for writing content that needs to be shared or published online.
7. **HTML Integration**: While Markdown is simpler for basic formatting, it also allows for HTML integration. If needed, you can embed HTML directly within Markdown, giving you flexibility without losing the simplicity of Markdown syntax.

In summary, Markdown excels in simplicity, readability, and ease of use, making it a preferred choice for creating and formatting text content compared to HTML, especially for tasks that prioritize content creation and readability over complex layout and design.

## Markdown File {#markdown-file}

In a Markdown file, the structure typically consists of two main sections: the frontmatter and the content.

1. **Frontmatter**: The frontmatter is a section enclosed between delimiters (`---` or `+++`). It serves as a metadata container for the document, containing information such as title, date, author, tags, and any other relevant data.

    Example:

    ```yaml
    ---
    title: My Markdown Document
    date: 2024-06-24
    author: John Doe
    tags:
        - markdown
        - YAML
    ---
    ```

    The frontmatter provides context and supplementary information about the content that follows.

2. **Content**: The actual content of the Markdown file begins immediately after the frontmatter. This section contains plaintext that includes Markdown markup for formatting purposes. Markdown allows you to structure text with headers, lists, emphasis (bold or italic), links, images, and more using simple and intuitive syntax.

    Example:

    ```markdown
    # Introduction

    This is a paragraph of text with **emphasis** and a [link](https://example.com).

    ## Subsection

    -   List item 1
    -   List item 2

    ![Image](image.jpg)
    ```

    Additionally, Markdown files can include HTML for more complex layout requirements or styling that Markdown syntax doesn't directly support.

3. **Parsing to HTML**: When a Markdown file is rendered for deployment on a website or application, it undergoes a process where Markdown syntax and embedded HTML are parsed and converted into HTML code. This transformation is typically handled by Markdown parsers or converters, which interpret the Markdown and HTML tags to generate the corresponding HTML output.

    For example, the Markdown content above might be parsed into HTML like this:

    ```html
    <h1>Introduction</h1>

    <p>
    	This is a paragraph of text with
    	<strong>emphasis</strong>
    	and a
    	<a href="https://example.com">link</a>
    	.
    </p>

    <h2>Subsection</h2>

    <ul>
    	<li>List item 1</li>
    	<li>List item 2</li>
    </ul>

    <img src="image.jpg" alt="Image" />
    ```

4. **Deployment/Usage**: The resulting HTML output is what is deployed or used on websites or web applications. HTML is the standard markup language understood by web browsers, ensuring that the content appears correctly formatted and styled for users accessing the site.

In summary, Markdown files combine structured metadata in the frontmatter with plaintext content using Markdown syntax (and optionally HTML) to create documents that are both human-readable and machine-processable. This content is ultimately parsed into HTML for display on websites, ensuring compatibility and proper rendering across different platforms and devices.

## LiteNode's Frontmatter {#litenode-frontmatter}

In LiteNode, the frontmatter is delimited by a pair of 3 hyphens `---`. Think of the frontmatter as a concise database that encapsulates essential metadata about the document. The frontmatter is written in [YAML](https://yaml.org/) (YAML Ain't Markup Language). YAML is a human-readable data serialization standard that is concise and easy to understand. Here are some advantages of using YAML for Markdown file frontmatter:

1. **Structured Data**: YAML provides a structured way to define metadata such as title, author, date, tags, and other attributes relevant to the document. This structured format makes it easier for both humans and machines to parse and understand the information.
2. **Readability**: YAML's syntax is designed to be clear and visually appealing. It uses indentation to denote hierarchical structure, which enhances readability compared to other formats like [JSON](https://www.json.org/json-en.html) or [XML](https://en.wikipedia.org/wiki/XML).
3. **Ease of Use**: Writing YAML is straightforward and requires minimal syntax. This simplicity reduces the cognitive load when adding or modifying metadata in the frontmatter, especially for users who may not be familiar with more complex markup or programming languages.
4. **Integration**: YAML is widely supported across various platforms, tools, and programming languages. It's interoperable with many systems and frameworks used for content management, version control, and static site generators.
5. **Flexibility**: YAML allows for a wide range of data types and structures, including lists (arrays), dictionaries (objects), and scalar values (strings, numbers, or booleans). This flexibility accommodates diverse metadata needs without imposing rigid formatting requirements.
6. **Maintainability**: By separating metadata from the main content of the Markdown file, YAML frontmatter promotes clean, maintainable document organization. This separation helps in easily updating or modifying metadata without affecting the core text content.

In summary, YAML provides a structured, readable, and versatile format for defining frontmatter in Markdown files. It enhances the clarity, ease of use, and interoperability of metadata management, making it a preferred choice for many content creators and developers.

## Our First File {#our-first-file}

### views {#views}

In LiteNode, it is mandatory that Markdown files (`example.md`), along with HTML template files (`example.html`), are located specifically within the `views` directory or any of its sub-folders. This organizational requirement ensures that all view-related content, including Markdown files for content creation and HTML templates for structured layouts, is centralized and easily accessible within the project structure. This practice promotes clarity, consistency, and efficient management of view-related resources throughout LiteNode applications.

Begin by creating a directory named `views` at the root level of our application. This directory will house all the Markdown and HTML template files.

### index.md {#markdown-index}

Inside the `views` directory, create a Markdown file named `index.md`. Copy and paste the following into the file:

```markdown
---
title: Home
description: "A comprehensive tutorial on creating a Markdown-based application using LiteNode in Node.js."
tags: ["Node.js", Markdown, Tutorial]
metadata:
    category: Tutorial
    difficulty: Beginner
---

# Introduction {#Introduction}

Welcome to the homepage of this tutorial!
Whether you are a developer or a total coding beginner,
you'll find that LiteNode's simplicity allows anyone
to create applications using Markdown (or not) with ease.

## Requirements {#Requirements}

All you need for this tutorial is to download and install Node.js on your machine.
The easiest way to do this is by downloading
the [Prebuilt Installer](https://nodejs.org/en/download/prebuilt-installer)
that matches your machine's specifications.
```

<alert data-sm="2column pad gap">
    <alert-icon data-sm="middle">
        <img src="https://cdn.jsdelivr.net/npm/@tabler/icons@2.44.0/icons/info-hexagon.svg" alt="Information SVG" />
</alert-icon>
<alert-text data-sm="middle">

<p>To create a collection of items (array) in LiteNode's frontmatter, use the square brackets <code>[...]</code>.</p>
<p>To create a dictionary of key-value pairs items (object) in LiteNode's frontmatter, use a nested structure like <code>metadata</code> in the given file.</p>
<p>A string containing <a href="https://www.webopedia.com/definitions/special-character/#How_to_Type_Special_Characters" >special characters</a> <strong>must</strong> be double quoted <code>"Node.js"</code>.</p>
</alert-text>
</alert>

## Entry File {#entry-file}

### main entry {#main-entry}

As previously discussed in [Initialization](/tutorial/installation#initialization), the `package.json` file serves as a crucial configuration hub for our project. It outlines various settings, including specifying the main file:

```json
"main": "index.js"
```

This `main` entry designates `index.js` as the primary file in our project structure. Often referred to as the entry file, `index.js` acts as the starting point for a Node.js application. It typically initializes the application, sets up server configurations, defines routes, and orchestrates the overall application logic.

### module type {#module-type}

In addition to defining the main entry point, if we intend to utilize [ES6 modules](https://javascript.info/modules-intro) in our Node.js application, we must add a `"type"` setting to our `package.json`:

```json
"type": "module"
```

This `"type": "module"` declaration informs Node.js that our application will be using ES6 module syntax for JavaScript files. ES6 modules provide several benefits over CommonJS, including improved code organization, clearer syntax with `import` and `export` statements, and support for static analysis and tree-shaking in modern JavaScript tooling.

By specifying `"type": "module"`, Node.js will interpret our JavaScript files as ES6 modules by default. This setting is crucial for leveraging the full power of modern JavaScript features and ensuring compatibility with newer libraries and frameworks that rely on ES6 module syntax.

### Update {#update}

Since we are adopting ES6 modules, we need to include the `"type": "module"` declaration directly below `"main": "index.js"` in our `package.json` file. This configuration informs Node.js that our application will utilize ES6 module syntax for JavaScript files. Updated, our `package.json` file now appears as follows:

```json
...
"main": "index.js",
"type": "module",
...
```

### index.js {#index-js}

Create an `index.js` file at the root of our application and populate it with the following code:

```js
// Import LiteNode and Marked using ES6 import syntax
import { LiteNode } from "litenode"
import { marked } from "marked"

// Create a new instance of LiteNode
const app = new LiteNode()

// Create the entry route
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

// Start the server
app.startServer()
```

### Explanation {#index-js-explanation}

1. **Imports using ES6 Syntax**:

    - `import { LiteNode } from "litenode"`: Imports `LiteNode` from the `litenode` package. This assumes `LiteNode` is exported as a named export from the package.
    - `import { marked } from "marked"`: This syntax imports the named export `marked` from the `marked` module.

2. **LiteNode Instance**:

    - `const app = new LiteNode()`: Creates a new instance of `LiteNode`, initializing the LiteNode application.

3. **Routing and Markdown Parsing**:

    - `app.get("/", (req, res) => { ... })`: Defines a route handler for the root (`"/"`) path. When a request is made to the root path, this handler executes.
    - `const parsedIndex = app.parseMarkdownFile("index.md")`: Uses LiteNode's `parseMarkdownFile` method to parse the Markdown file named `index.md`. This method returns an object (`parsedIndex`) containing `content` (Markdown content) and `frontmatter` (metadata from the Markdown frontmatter).

4. **Markdown to HTML Conversion**:

    - `const html_content = marked(parsedIndex.content)`: Uses `marked` to convert the parsed Markdown content (`parsedIndex.content`) into HTML.

5. **Frontmatter Extraction**:

    - `const { title, description } = parsedIndex.frontmatter`: Destructure `title` and `description` from `parsedIndex.frontmatter`, extracting metadata defined in the Markdown file's frontmatter.

6. **Rendering**:

    - `res.render("layouts/index.html", { title, description, html_content })`: Sends a response (`res`) by rendering the `index.html` template located in the `layouts` directory under `views`. It passes an object (`{ title, description, html_content }`) as data to be rendered within the HTML template.

7. **Server Start**:

    - `app.startServer()`: Starts the LiteNode server, making the application ready to handle incoming requests.

This code snippet demonstrates a basic setup using LiteNode, Markdown parsing, HTML rendering, and server initialization, showcasing how to integrate Markdown content into a web application using modern JavaScript (ES6) syntax.

## Main Template {#main-template}

As previously explained, the `index.html` template resides in the `layouts` directory within `views`. Create a `layouts` folder inside the `views` directory. Within `layouts`, create an `index.html` file and populate it with the following code:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<!-- Dynamically load description from transferred data object -->
		<meta name="description" content="{{description}}" />

		<!-- Dynamically load title from transferred data object -->
		<title>{{title}} | LiteNode MAT</title>
	</head>
	<body>
		<header></header>

		<!-- Inject raw html content from transferred data object -->
		<main>{{html_content}}</main>

		<footer></footer>
	</body>
</html>
```

<alert data-sm="2column pad gap">
    <alert-icon data-sm="middle">
        <img src="https://cdn.jsdelivr.net/npm/@tabler/icons@2.44.0/icons/info-hexagon.svg" alt="Information SVG" />
    </alert-icon>
    <alert-text data-sm="middle">
		<p>In LiteNode, when directly <a href="https://litenode.pages.dev/docs/rendering-templates/#raw-html">injecting raw HTML content into a template</a>, ensure to use the <code>html_</code> property as required.</p>
    </alert-text>
</alert>

## Structure {#structure}

The directory structure of our LiteNode Markdown application is outlined below:

```txt
📂litenode-markdown-app (root directory)
  ├── 📄index.js (entry file)
  ├── 📄package.json (application settings file)
  └── 📂views (views directory)
      ├── 📄index.md (first Markdown file)
      └── 📂layouts (layouts directory)
          └── 📄index.html (main template file)
```

### Explanation {#tree-explanation}

-   **`index.js`**: This file serves as the entry point for our LiteNode application. It initializes the server, defines routes, and integrates various functionalities.
-   **`package.json`**: The `package.json` file contains configuration settings for our application, including dependencies, scripts, and metadata like project name and version.
-   **`views/`**: This directory houses all view-related files for our application. It includes Markdown files (`index.md` in this case) that contain content to be rendered dynamically.
-   **`views/layouts/`**: Within the `views` directory, `layouts` is a subdirectory that stores HTML templates used for structuring the appearance of rendered content. The `index.html` file here serves as the main template for our application.

### Notes {#notes}

-   Ensure the `index.md` file within `views/` contains Markdown content formatted with text and metadata (frontmatter).
-   The `index.html` file in `views/layouts/` provides the structure and layout for rendering content dynamically generated from the Markdown file.

This directory structure ensures a well-organized approach to developing and managing a LiteNode application that integrates Markdown-based content rendering seamlessly with HTML templates.

## Rendering {#rendering}

To view the content of our first Markdown file, follow these steps:

1. **Launch the Application**: Start your LiteNode application by executing the following command in your terminal:

    ```bash
    node index
    ```

    This command runs the `index.js` file, which is the entry point of your LiteNode application.

2. **Terminal Output**: Upon executing `node index`, you may see the following message in your terminal:

    ```txt
    Error while reading static directory: "static" directory doesn't exist!
    LiteNode will continue running without serving static assets.
    App @ http://localhost:5000
    ```

    This message indicates that LiteNode encountered an error while attempting to locate a directory named "static" for [serving static assets](https://litenode.pages.dev/docs/serving-static-files/) (such as styles, scripts, and images). LiteNode will continue running without this feature.

3. **Access the Application**: Despite the warning message, you can proceed to access your LiteNode application by clicking on the provided link or typing `http://localhost:5000` into your web browser's address bar.

    - **Example**: If LiteNode is running on the default port (`5000`), accessing `http://localhost:5000` in your browser will display the HTML content generated from `index.md`.

4. **Ignore the Warning**: The warning about the "static" directory can be ignored if your application doesn't require serving static assets at this moment. LiteNode will function normally for rendering Markdown content and handling dynamic routes as configured in your `index.js` file.

By following these steps, you can easily launch and access your LiteNode application to view the rendered HTML content generated from your Markdown files, demonstrating the seamless integration and functionality provided by LiteNode.

## Next {#next}

Now that we have a thorough understanding of how LiteNode processes and renders Markdown files to the browser, we're ready to explore more advanced topics in the next chapter. Specifically, we will delve into rendering [multiple Markdown files](https://litenode.pages.dev/docs/markdown/#parse-markdown-files) and leveraging LiteNode's [Simple Template Engine (STE)](https://litenode.pages.dev/docs/rendering-templates/) to organize and structure their presentation. Explore [Templating](/tutorial/templating) to learn how to create dynamic, reusable HTML components, improve code modularity, and streamline data injection for a more maintainable and consistent web application.
