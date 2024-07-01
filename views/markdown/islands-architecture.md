---
title: Islands
description: Enhancing page presentation control directly from Markdown files with Islands Architecture
image: "/static/images/my-image.png"
tags: ["Islands Architecture", "Modular Design", "Styling", "Dynamic Content", "LiteNode", "Responsive Design", "Web Development", "Project Organization"]
href: islands
metadata:
    index: 11
    category: Styling
    catIndex: 3
    subcategory: Islands
    subCatIndex: 2
    difficulty: Advanced
    audience: [Developer, Student]
---

# Islands Architecture

Islands Architecture is a modern design pattern in web application development that enhances modularity, scalability, and maintainability. It revolves around breaking down a large monolithic application into smaller, self-contained modules or "islands." Each island typically handles a specific functionality or feature of the application independently.

By adopting Islands Architecture, developers can achieve several advantages:

1. **Modularity**: Islands are isolated components that can be developed, tested, and deployed independently. This modular approach promotes code reusability and simplifies maintenance.

2. **Scalability**: Scaling an application becomes more manageable as islands can be scaled individually based on their specific usage patterns and performance requirements.

3. **Flexibility**: Islands can use different technologies, frameworks, or even be hosted on separate servers, providing flexibility in technology choices and deployment strategies.

4. **Resilience**: Failure in one island typically doesn’t affect others, enhancing the overall resilience of the application.

5. **Team Collaboration**: Islands facilitate parallel development by enabling different teams to work on different parts of the application simultaneously without significant interference.

Overall, Islands Architecture offers a structured approach to building complex web applications, promoting agility, robustness, and ease of management throughout the development lifecycle.

Haven't we previously explored and applied this concept by slicing our backend and frontend into reusable components?<br>
Yes, indeed we have. However, as a bonus, I want to show you how we can take this approach even further!

## Individual Styles {#Individual Styles}

Let's explore how we can dynamically apply unique styles to any page directly from its Markdown content!

Pick any Markdown file and add the following example right after its frontmatter:

```markdown
---
...

---

<style>
    p {
        color: red;
    }
</style>
```

This addition empowers us to customize styles directly within the Markdown content, offering unparalleled flexibility and control over each page's presentation. After saving the modified file, simply access it in your browser, and voilà – magic in action!

As seemingly insignificant as it may appear, this example illustrates our ability to apply custom styles, scripts, markup, and dynamically load data within any page. It showcases the flexibility and power inherent in customizing the presentation and functionality of each page according to specific needs.

## Individual Data {#Individual Data}

To integrate individual dynamic data within a page, we'll use LiteNode's [generateTOC](https://litenode.pages.dev/docs/markdown/#generate-toc) method. This method generates a table of contents based on the heading tags in `add-ids-to-headings.md`, as an example. Initially, we'll invoke the method and incorporate the generated HTML string into the data object within `pageRoute.js`. Subsequently, we'll render this dynamic content in the markdown file.

### generateToc {#generate-toc}

Add the following code in `pageRoute.js` under `const html_content` to generate a table of contents (TOC):

```js
// Before:
// Parse the file `content` with Marked
const html_content = marked.parse(currentMarkdownFile.content)

// After:
// Parse the file `content` with Marked
const html_content = marked.parse(currentMarkdownFile.content)

// Generate a TOC that will only be used in add-ids-to-headings.md
const html_toc = app.generateTOC(html_content)
```

This addition prepares `html_toc` using `app.generateTOC(html_content)` specifically for `add-ids-to-headings.md`, enhancing the functionality by dynamically generating a table of contents from the Markdown content parsed by Marked.

### TOC in dataObject {#TOC in dataObject}

In `pageRoute.js`, include `html_toc` in the data object like this:

```js
// Before:
// Render currentMarkdownFile with assigned data object
res.render("layouts/index.html", { title, description, html_content, titles, pageRoute: true })

// After:
// Render currentMarkdownFile with assigned data object
res.render("layouts/index.html", { title, description, html_content, titles, pageRoute: true, html_toc })
```

In the updated code, `html_toc` is added to the data object passed to the `res.render` function. This allows `html_toc` to be accessible within the `index.html` layout template and its children templates, enabling the rendering of the generated table of contents (`html_toc`) along with other necessary data (`title`, `description`, `html_content`, `titles`, `pageRoute`).

### Update File {#update file}

Replace the existing content (excluding the frontmatter) of `add-ids-to-headings.md` with the following code snippet to demonstrate our example:

```markdown
<style>
    .highlighted {
        background-color: red;
    }
</style>

The `{{# id}}` syntax allows you to add custom IDs to HTML headings in Markdown.<br>
This is useful for creating anchor links and improving navigation within your documents.

<table-of-contents>
{{html_toc}}
</table-of-contents>

Example Usage:

# Introduction {#intro}

## Getting Started {#getting-started}

### Installation {#installation}

### Basic Usage {#basic-usage}

## Advanced Topics {#advanced-topics}

### Error Handling {#error-handling}

#### onError {#on-error}

#### notFound {#not-found}

### Middleware {#middleware}

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const toc = document.querySelector("table-of-contents");
        const tocLinks = toc.querySelectorAll("a");
        const hash = window.location.hash;

        // Function to highlight the corresponding element
        const highlightElement = (id) => {
            const targetElement = document.getElementById(id);
            if (targetElement) {
                targetElement.classList.add("highlighted"); // Add a CSS class for highlighting
                setTimeout(() => {
                    targetElement.classList.remove("highlighted"); // Remove the highlight after a delay
                }, 2000); // Delay of 2 seconds
            }
        };

        // Add click event listeners to tocLinks
        tocLinks.forEach((tocLink) => {
            tocLink.addEventListener("click", (event) => {
                const id = tocLink.getAttribute("href").substring(1); // Get the id without the #
                highlightElement(id); // Call the highlight function
            });
        });

        // Highlight the element if the hash exists in the URL
        if (hash) {
            const idFromHash = hash.substring(1); // Remove the leading #
            highlightElement(idFromHash); // Call the highlight function
        }
    });
</script>
```

#### Explanation {#explanation}

1. **Style Block (`<style>`)**:

    - Defines a CSS rule `.highlighted` that sets the background color of highlighted elements to red. This is used in conjunction with JavaScript to visually highlight the heading tags.

2. **Table of Contents (`<table-of-contents>`)**:

    - `html_toc` is dynamically replaced with generated table of contents (TOC) HTML content, showcasing the hierarchical structure of headings (`## Getting Started`, etc.).

3. **Script Block (`<script>`)**:
    - Implements JavaScript functionality that:
        - Listens for the DOMContentLoaded event.
        - Retrieves the table of contents (`toc`) and its links (`tocLinks`).
        - Handles click events on TOC links to highlight corresponding sections on the page (`highlightElement` function).
        - Automatically highlights the heading corresponding to the current URL hash (`window.location.hash`), if present.

Although the style and script might not be essential, this example demonstrates the integration of styling (`<style>`), dynamic content (`html_toc`), and interactive functionality (`<script>`) within a Markdown file.

Given that `html_content` contains the HTML representation of a Markdown file, when accessing the content of `add-ids-to-headings.md` in the browser, `html_toc` is identified within the data object and subsequently parsed to generate its corresponding HTML output.

### Restart Server {#restart server}

Finally, [restart your server](/tutorial/one-for-all#restart-server) (`pageRoute.js` modified), refresh your browser, and click on the `Add IDs to Headings` link in the menu. You will see the table of contents (TOC) positioned exactly where we placed it within the document. Click on any TOC link, and the corresponding heading will be highlighted!

## Conclusion {#conclusion}

This example showcasing individual dynamic data highlights the power and flexibility of using Islands Architecture with LiteNode. Now, you have a clear understanding of how you can use LiteNode to push the boundaries of Islands Architecture to new heights.

## Next {#next}

Get ready for the final part of this tutorial: generating a static site that can be deployed to any platform hosting static sites Head over to [Static Site](/tutorial/static-site) to complete the journey of creating a Markdown-based application in Node.js.
