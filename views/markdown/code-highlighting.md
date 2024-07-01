---
title: Highlight Code
description: "Improving code block rendering with syntax highlighting using highlight.js"
image: "/static/images/my-image.png"
tags: ["Node.js", "Markdown", "Tutorial", "highlight.js", "marked-highlight", "Code Highlighting", "Static Assets", "Project Organization"]
href: highlight-code
metadata:
    index: 6
    category: Structuring
    catIndex: 2
    subcategory: Highlight Code
    subCatIndex: 3
    difficulty: Advanced
    audience: [Developer, Student]
---

# Highlight Code

You might wonder how code highlighting fits into structuring our application. In this section, we'll leverage the static assets folder to enhance our frontend. This folder allows us to seamlessly load images, scripts, and styles, ensuring our application's frontend is both functional and visually appealing.

## Static Assets {#Static Assets}

Static assets are essential in web development, enhancing both functionality and aesthetics. These assets typically include images, stylesheets (CSS), scripts (JavaScript), fonts, and other files that are served directly to the client's browser without any processing by the server. Unlike dynamic content generated on-the-fly, static assets remain unchanged unless manually updated or replaced.

Integrating static assets efficiently can significantly improve the user experience by optimizing page load times, enabling visual enhancements, and facilitating interactive functionalities. This section explores how to effectively utilize and manage static assets using [LiteNode's feature to serve static files](https://litenode.pages.dev/docs/serving-static-files/).

## Static Directory {# Static Directory}

LiteNode uses a `static` directory by default for serving static files. You can customize this by specifying a different name during initialization. For instance, if you prefer using a directory named `public` instead of the default `static`, you can simply initialize LiteNode as follows:

```js
const app = new LiteNode("public")
```

We'll stick with the default option and create a `static` directory at the root of our application.<br>
Additionally, we'll create three folders within the `static` directory:

-   `images`: This folder will store image files to be loaded later on.
-   `js`: Here, we'll store JavaScript files for our scripts.
-   `css`: This folder will hold stylesheets that we'll use shortly.

Here is the directory structure representing the `static` folder within our application:

```txt
📂 litenode-markdown-app (root directory)
└── 📂 static (static assets directory)
    ├── 📂 css (stylesheets directory)
    ├── 📂 images (images directory)
    └── 📂 js (scripts directory)
```

## Highlight Scripts {#Highlight Scripts}

Before we load the stylesheet to highlight code blocks, let's include the necessary markup with the following installed modules:

-   `highlight.js`
-   `marked-highlight`

To achieve this, we'll modify `index.js` by replacing:

```js
import { marked } from "marked"
```

with the following code:

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

// Configuring marked with markedHighlight
const marked = new Marked(
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

This code sets up Markdown rendering with code highlighting using `marked`, `highlight.js`, and `marked-highlight` modules.

1. **Imports:**

    - `Marked`: The Marked class.
    - `hljs`: Core functionality of `highlight.js`.
    - `markedHighlight`: Plugin for `marked` that enhances it with syntax highlighting capabilities.

2. **List of Languages:**

    - `languages`: Array listing languages for syntax highlighting. Each language's module is dynamically imported from `highlight.js`.
    - For a comprehensive list of languages supported by Highlight.js, including their corresponding classes and aliases, refer to the [SUPPORTED LANGUAGES](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) file.

3. **Register Languages Function (`registerLanguages`):**

    - Asynchronously registers languages with `highlight.js` using dynamic imports.

4. **Async Function Invocation:**

    - `registerLanguages()` initiates language registration upon script execution.

5. **Configuring `marked` with `markedHighlight`:**
    - Instantiates `marked` with `markedHighlight`, configuring options like `langPrefix` and a custom `highlight` function.

This setup ensures that Markdown content with code blocks is highlighted using `highlight.js`, making it more readable and visually appealing.

Alternatively, we could have retained the original `index.js` setup, loading `highlight.js` directly in the browser. However, I prefer server-side handling to minimize client-side responsibilities.

## Highlight Styles {#Highlight Styles}

With the code blocks ready for highlighting, let's choose and load a stylesheet that suits your needs. You can preview the appearance of all available highlighting styles on the [demo page of highlight.js](https://highlightjs.org/demo). Once you've decided on a style, you have a couple of options to integrate it into your project:

1. **Using a CDN:**

    - Copy the HTML link from the [highlight.js styles directory on JSDELIVR](https://www.jsdelivr.com/package/npm/highlight.js?tab=files&path=styles) and add it to your `head.html`.

2. **Local Integration:**
    - Alternatively, you can click on the chosen style, copy (`Ctrl + A` then `Ctrl + C`) its content, and paste it (`Ctrl + V`) into your local CSS file to load without relying on a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network).

We will copy and paste the content of [a11y-dark.min.css](https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/a11y-dark.min.css) into a file named `a11y-dark.min.css`, which we'll create inside the `css` folder located within the `static` directory.

To use this stylesheet, all we ave to do is to load it in `head.html` like so:

```html
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<!-- Dynamically load description from transferred data object -->
	<meta name="description" content="{{description}}" />

	<!-- Dynamically load title from transferred data object -->
	<title>{{title}} | LiteNode MAT</title>

	<!-- Load highlighting stylesheet file -->
	<link rel="stylesheet" href="/static/css/a11y-dark.min.css" />
</head>
```

1. **`<link>` Element:**

    - The `<link>` element is an HTML tag used to define a link between a document and an external resource. In this case, it specifies that the document should link to an external stylesheet.

2. **Attributes of the `<link>` Element:**

    - `rel="stylesheet"`: Specifies the relationship between the current document and the linked resource, indicating that it is a stylesheet.
    - `href="/static/css/a11y-dark.min.css"`: Specifies the URL (or path) to the external stylesheet file. Here, `/static/css/a11y-dark.min.css` is the path relative to the root of the web server.

3. **Purpose:**
    - When a web browser encounters this `<link>` element, it fetches the content of the `a11y-dark.min.css` file from the specified location (`/static/css/a11y-dark.min.css`). Once fetched, the browser applies the styles defined in the CSS file to the HTML document, affecting the visual appearance of elements on the webpage.

Finally, [restart your server](/tutorial/one-for-all#restart-server) and check each Markdown file route to see your highlighted code blocks in action. Enjoy!

## Next {#next}

Now that our code blocks are highlighted by injecting the necessary markup from the backend and applying the desired highlight style on the frontend via a stylesheet using LiteNode's static assets loader, we can move forward to our next objective. Upon closer inspection of `index.js`, you'll notice it's already growing significantly with just two routes. Imagine managing 10 or more routes; it would become unwieldy and hard to maintain. Therefore, in the next section on structuring our application, we'll explore how to modularize our backend code into reusable components, akin to what we've achieved with our frontend templates. Head over to [Sliced Backend](/tutorial/sliced-backend) to delve into the art of organizing your backend into reusable components and **maintaining a scalable architecture**.
