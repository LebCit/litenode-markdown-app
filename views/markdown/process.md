---
title: Process
description: "Detailed process for parsing and rendering a Markdown file."
tags: ["Node.js", "Markdown", "Tutorial", "LiteNode", "Parsing", "Rendering", "HTML", "Frontmatter"]
href: process
metadata:
    index: 2
    category: Starting
    catIndex: 1
    subcategory: Process
    subCatIndex: 2
    difficulty: Beginner
    audience: [Developer, Student]
---

# Process

Before we start coding, let's understand how a Markdown file will be processed. Since a picture is worth a thousand words, let's examine and analyze the following diagram made with [Mermaid.js](https://mermaid.js.org/).

## Process Steps {#process-steps}

<process-diagram-block data-sm="column" data-lg="2column">
<img
	data-sm="rspImg"
	data-lg="order2"
	id="concept-diagram"
	src="/static/images/process-diagram.svg"
	alt="A diagram showing how a Markdown file will be processed."
/>
<process-diagram-text data-lg="order1">
<ol>
	<li>
		<p><strong>Markdown File (A)</strong></p>
		<ul>
			<li>
				The process begins with a Markdown file that contains both frontmatter and content. The frontmatter typically includes metadata such as title, date, author, etc., while the content contains the actual Markdown text to be rendered.
			</li>
		</ul>
	</li>
	<li>
		<p><strong>Parsed with LiteNode (B)</strong></p>
		<ul>
			<li>
				The Markdown file is parsed using LiteNode's <code>parseMarkdownFile</code> or <code>parseMarkdownFileS</code> method. This step separates the frontmatter from the content.
			</li>
		</ul>
	</li>
	<li>
		<p><strong>Extract Frontmatter and Content (C1 & C2)</strong></p>
		<ul>
			<li>
				<strong>Frontmatter (C1):</strong> The frontmatter is extracted and stored as a separate object. It contains metadata and additional data needed for rendering.
			</li>
			<li>
				<strong>Content (C2):</strong> The Markdown content is also extracted separately. This content will be converted into HTML.
			</li>
		</ul>
	</li>
	<li>
		<p><strong>Extract Needed Data (D)</strong></p>
		<ul>
			<li>
				The extracted frontmatter is processed to extract specific properties required for rendering. This is typically done using the <code>extractMarkdownProperties</code> method. The extracted data might include properties like title, date, and author, among others.
			</li>
		</ul>
	</li>
	<li>
		<p><strong>Parsed with Marked (F)</strong></p>
		<ul>
			<li>
				The Markdown content is parsed into HTML using Marked.js. This step converts the raw Markdown text into HTML format, which can be directly rendered in a browser.
			</li>
		</ul>
	</li>
	<li>
		<p><strong>Combine Extracted Data and Parsed HTML (G)</strong></p>
		<ul>
			<li>
				The extracted frontmatter data and the parsed HTML content are combined into a single data object. This data object contains all the necessary information needed for rendering the final HTML template.
			</li>
		</ul>
	</li>
	<li>
		<p><strong>HTML Template (H)</strong></p>
		<ul>
			<li>
				The combined data object is passed to an HTML template. The template uses this data to populate dynamic content areas, such as inserting the parsed HTML content into a designated section and using frontmatter data to set titles, dates, etc.
			</li>
		</ul>
	</li>
	<li>
		<p><strong>Rendered to Browser (I)</strong></p>
		<ul>
			<li>
				The final HTML template, now populated with data, is rendered to the browser. This step involves sending the rendered HTML as the response to the client's request, allowing the browser to display the fully rendered content.
			</li>
		</ul>
	</li>
</ol>
</process-diagram-text>
</process-diagram-block>

## Example Code {#example-code}

Here's an example route in LiteNode that demonstrates the entire process:

```javascript
import { LiteNode } from "litenode"

import { marked } from "marked"
// or const { marked } = require("marked")

const app = new LiteNode()

app.get("/article", async (req, res) => {
	try {
		// Step 1: Parse the markdown file
		// assuming `article.md` is in a `pages` folder which is in the `views` directory
		const { frontmatter, content } = app.parseMarkdownFile(`pages/article.md`)
		// or const article = app.parseMarkdownFile(`pages/article.md`)

		// Step 2: Extract needed data from frontmatter
		const extractedData = await app.extractMarkdownProperties("pages", ["title", "date", "author"])
		// or const {title, date, author} = article.frontmatter

		// Step 3: Parse the Markdown content to HTML with Marked
		const htmlContent = marked.parse(content)
		// or html_content = marked.parse(article.content)

		// Step 4: Combine extracted data and parsed HTML content into a data object
		const dataObject = { ...extractedData, html_content: htmlContent }
		// We can create a dataObject here or pass the data directly as shown below

		// Step 5: Render the HTML template with the data object
		res.render("layouts/article.html", dataObject)
		// or res.render("layouts/article.html", {title, date, author, html_content})
	} catch (error) {
		res.status(500).txt(`Error rendering article: ${error.message}`)
	}
})
```

## Conclusion {#conclusion}

This detailed process demonstrates how LiteNode and Marked.js work together to parse a Markdown file, extract necessary data, convert content to HTML, and render the final HTML template to the browser. By following these steps, you can effectively render dynamic and content-rich pages using Markdown files.

## Next {#next}

In the next section, we will create and render our [first Markdown file](/tutorial/first-file).
