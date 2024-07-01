---
title: Loops
description: Using loops to dynamically generate content in templates for a scalable architecture
image: "/static/images/my-image.png"
tags: ["Node.js", "Backend Architecture", "Project Organization", "Unified System", "Loops", "LiteNode", "Template Rendering", "Dynamic Content"]
href: loops
metadata:
    index: 9
    category: Structuring
    catIndex: 2
    subcategory: Loops
    subCatIndex: 6
    difficulty: Advanced
    audience: [Developer, Student]
---

# Loops

Loops in template engines simplify repetitive tasks and enhance code reusability, making templates more efficient and maintainable. By iterating over data structures such as arrays or objects, loops allow templates to dynamically render content based on the provided data. This capability reduces redundancy in code by eliminating the need for manual repetition, thereby improving maintainability and reducing the chances of errors. Additionally, loops enable templates to handle varying amounts of data gracefully, adapting to changes in input size or content effortlessly. This flexibility not only streamlines development but also enhances the scalability of applications, making template engines a powerful tool for efficient web and application development.

## Each {#each}

LiteNode's Simple Template Engine ([STE](https://litenode.pages.dev/docs/rendering-templates/)) provides the powerful [{{#each}}](https://litenode.pages.dev/docs/ste-helpers/#each) directive, enhancing templating in Node.js applications. Firstly, it simplifies the rendering of arrays by automatically iterating through each item and including specified content for each iteration, reducing the need for manual looping in application code. This streamlines development and improves code readability. Secondly, for arrays of objects, `{{#each}}` supports dot notation to access object properties directly within the template, facilitating dynamic content rendering based on object attributes. This flexibility enables developers to easily display complex data structures without extensive preprocessing. Moreover, STE's `{{#each}}` directive supports nested loops seamlessly, allowing developers to handle multi-level data structures with ease. Nested `{{#each}}` directives incrementally manage inner loops, maintaining clarity and organization within the template code. Overall, LiteNode's Simple Template Engine with its `{{#each}}` directive empowers developers to efficiently generate dynamic HTML content from arrays and objects, making it a robust choice for Node.js web applications needing scalable and maintainable templating solutions.

## Generating Menu {#Generating Menu}

We'll use LiteNode's [extractMarkdownProperties](https://litenode.pages.dev/docs/markdown/#extract-markdown-properties) method to dynamically generate a menu from our page titles. This function retrieves an array of properties that we'll integrate into the data object for our templates. Using the `{{#each}}` directive, we can precisely control how this array is rendered, ensuring each page title is displayed as desired in the menu interface.

### entryRoute.js {# entryRoute-js}

```js
// Before:
app.get("/", (req, res)=>{...})

// Render index.html with assigned data object
res.render("layouts/index.html", { title, description, html_content, entryRoute: true })

// After:
app.get("/", async (req, res)=>{...})

// Generate an array of title objects from markdown files
const titles = await app.extractMarkdownProperties("pages", ["title", "href"])
titles.sort((a, b) => (a.title < b.title ? -1 : 1))

// Render index.html with assigned data object including titles
res.render("layouts/index.html", { title, description, html_content, entryRoute: true, titles })
```

### pageRoute.js {#pageRoute js}

```js
// Before:
// Parse the Markdown files in the "pages" directory with LiteNode's parseMarkdownFileS method
const parsedMarkdownFiles = await app.parseMarkdownFileS("pages")
...
// Render index.html with assigned data object
res.render("layouts/index.html", { title, description, html_content, pageRoute: true })

// After:
// Parse the Markdown files in the "pages" directory with LiteNode's parseMarkdownFileS method
const parsedMarkdownFiles = await app.parseMarkdownFileS("pages")
// Generate an array of title objects from parsed markdown files
const titles = await app.extractMarkdownProperties(parsedMarkdownFiles, ["title", "href"])
titles.sort((a, b) => (a.title < b.title ? -1 : 1))
...
// Render index.html with assigned data object including titles
res.render("layouts/index.html", { title, description, html_content, pageRoute: true, titles })
```

### Explanation {#explanation}

1. **Enhancement Purpose**: Both `entryRoute.js` and `pageRoute.js` now use LiteNode's `extractMarkdownProperties` to get an array of title and href objects from markdown files. This array (`titles`) is then passed into the data object for rendering `index.html`.

2. **Flexibility**: The `extractMarkdownProperties` method can accept either a directory path (`"pages"`) or an array of pre-parsed markdown files (`parsedMarkdownFiles`). This flexibility allows you to adapt the method based on your needs and existing code structure.

3. **Data Structure**: The `titles` array contains objects with a `title` and `href` properties extracted from each markdown file's frontmatter. As noted, these titles are returned in alphabetical order.

4. **Sorting by Index**: If you want to order the titles based on an `index` property in the frontmatter, you can enhance your markdown files with an `index` field. For instance:

    ```markdown
    ---
    title: Basic Usage
    href: "basic-usage"
    index: 2
    ---
    ```

    Then, modify your `extractMarkdownProperties` call to include the `"index"` field in addition to `"title"`, and sort the `titles` array based on the `index` value. Here’s how you could modify it:

    ```js
    // Generate an array of title and href objects including index from parsed markdown files
    const titles = await app.extractMarkdownProperties(parsedMarkdownFiles, ["title", "href", "index"])

    // Sort titles array based on index
    titles.sort((a, b) => (a.index > b.index ? 1 : -1))
    ```

For the sake of simplicity in this tutorial, I will use the `titles` array sorted alphabetically. Feel free to try the suggested enhancement as an exercise.

### header.html {#header-html}

Let's create our menu in `header.html` under the main heading tag like this:

```html
<header>
	<h1>Welcome LiteNode's Explorer</h1>

	<header-menu>
		<span>
			<a href="/">Home</a>
		</span>

		{{#each titles}}
		<span>
			<a href="/page/{{href}}">{{title}}</a>
		</span>
		{{/each}}
	</header-menu>
</header>
```

If you're curious about the origin of the `<header-menu>` tag, you can explore more about [Custom HTML Tags](https://matthewjamestaylor.com/custom-tags) and find practical examples in [Custom Element Examples](https://matthewjamestaylor.com/custom-element-examples). These resources delve into how custom tags can be defined and utilized to enhance HTML with specialized components and functionalities.

[Restart your server](/tutorial/one-for-all#restart-server) and start exploring your app with ease using the newly created menu.

## Conclusion {#conclusion}

Creating the menu was a breeze with LiteNode's easy array generation from frontmatter and the powerful `{{#each}}` directive in STE!

## Next {#next}

Next, we'll dive into [Styling](/tutorial/html-attributes) the application to make it responsive without using frontend frameworks. We'll also explore the [Islands Architecture](https://jasonformat.com/islands-architecture/) and how to utilize frontmatter properties directly in Markdown files. Stay tuned!
