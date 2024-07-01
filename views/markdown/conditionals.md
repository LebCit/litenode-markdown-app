---
title: Conditionals
description: Using conditionals to enhance template rendering and maintain a scalable architecture
image: "/static/images/my-image.png"
tags: ["Node.js", "Backend Architecture", "Project Organization", "Unified System", "Conditionals", "LiteNode", "STE", "Template Rendering"]
href: conditionals
metadata:
    index: 8
    category: Structuring
    catIndex: 2
    subcategory: Conditionals
    subCatIndex: 5
    difficulty: Intermediate
    audience: [Developer, Student]
---

# Conditionals

LiteNode's Simple Template Engine ([STE](https://litenode.pages.dev/docs/rendering-templates/)) leverages [conditionals](https://litenode.pages.dev/docs/ste-helpers/) to enhance the dynamic behavior of templates. With directives such as `{{#if}}`, `{{#else}}`, `{{#elseif}}`, and `{{#not}}`, developers can implement robust conditional logic directly within their templates. These directives enable templates to adapt their output based on specific conditions, ensuring a more personalized and responsive user experience.

By utilizing conditional operators like `&&` (logical AND), `||` (logical OR), `==` (equality), `!=` (inequality), `>` (greater than), `<` (less than), `>=` (greater than or equal to), and `<=` (less than or equal to), LiteNode STE empowers developers to create templates that dynamically respond to different data states and user inputs. This capability not only simplifies template management but also enhances code readability and maintainability by keeping logic closer to the presentation layer.

In summary, LiteNode STE's robust support for conditionals and operators enables developers to build flexible and interactive templates that adapt intelligently based on varying conditions, thereby improving the overall usability and functionality of web applications.

## The Bridge {#The Bridge}

Templates bridge the backend and frontend of a web application, playing a key role in presenting data to users. It encapsulates the visual structure and logic of a webpage, enabling seamless integration of dynamic content from the backend while maintaining a responsive and intuitive user interface on the frontend.

From a backend perspective, templates in web development frameworks like LiteNode act as dynamic placeholders where data from the server can be injected and processed. They provide a structured framework for rendering HTML, CSS, client-side scripts, and images, ensuring consistency and efficiency in how information is presented to users.

On the frontend side, templates enhance user experience by organizing and styling data in a meaningful way. They enable the display of real-time updates, interactive elements, and conditional rendering based on user input or system states. This capability is essential for creating responsive and adaptive user interfaces that cater to various devices and user interactions.

Templates also facilitate code separation and maintainability in web applications. By keeping presentation logic distinct from business logic (handled by the backend) and client-side interactivity (handled by frontend scripts), templates promote modular development practices. This separation of concerns allows developers to iterate on design, functionality, and performance optimizations more efficiently.

In essence, templates serve as a bridge that harmonizes the backend's data processing capabilities with the frontend's presentation and interaction requirements. They enable developers to create cohesive, scalable, and user-friendly web applications that deliver a seamless experience across different platforms and devices.

## Detecting Routes {#Detecting Routes}

Now that we have a deeper understanding of how templates act as a bridge between the backend and frontend, facilitating the injection and processing of data from the server, we recognize the significance of the data object. This object serves as dynamic information transferred to a template. Conditionals play a crucial role in instructing the template to render specific data from this transferred object based on predefined conditions. Thus, conditionals enable templates to dynamically adjust their output according to varying criteria, enhancing the flexibility and responsiveness of the application's user interface.

To identify a route, add a truthy property like `entryRoute: true` or `pageRoute: true` to its data object. This way, you can use conditional directives in the template to control what gets rendered. You can then utilize this property within the template using a conditional directive like `{{#if}}` to determine whether a markup should be shown. It's important to note that a truthy property assigned to a route is effectively falsy for all other routes unless explicitly assigned to other route(s).

To selectively load `a11y-dark.min.css` only when the browser is rendering a `pageRoute`, we'll utilize the `{{#if}}`, `{{#else}}` and `{{#not}}` directives in the `head.html` template.

### Instructions {#Instructions}

**1. Update `entryRoute.js`:**

Let's update `entryRoute.js` to include an `entryRoute` property in the data object sent to the template.

```javascript
// Before:
res.render("layouts/index.html", { title, description, html_content })

// After:
res.render("layouts/index.html", { title, description, html_content, entryRoute: true })
```

**2. Update `pageRoute.js`:**

Similarly, update `pageRoute.js` to include a truthy `pageRoute` property in the data object passed to the template.

```javascript
// Before:
res.render("layouts/index.html", { title, description, html_content })

// After:
res.render("layouts/index.html", { title, description, html_content, pageRoute: true })
```

### Directives {#directives}

In `head.html`, use STE conditional directives to load `a11y-dark.min.css` based on the route conditions.

**Using `{{#if}}`:**

```handlebars
{{#if pageRoute}}
	<!-- Load a11y-dark.min.css only if pageRoute is true -->
	<link rel="stylesheet" href="/static/css/a11y-dark.min.css" />
{{/if}}
```

**Using `{{#if}}` with `{{#else}}`:**

```handlebars
{{#if pageRoute}}
	<!-- Load a11y-dark.min.css only if pageRoute is true -->
	<link rel="stylesheet" href="/static/css/a11y-dark.min.css" />
{{#else}}
	<!-- Optionally provide fallback styles for other routes -->
{{/if}}
```

**Using `{{#not}}`:**

```handlebars
{{#not entryRoute}}
	<!-- Load a11y-dark.min.css only if entryRoute is false -->
	<link rel="stylesheet" href="/static/css/a11y-dark.min.css" />
{{/not}}
```

These directives allow us to conditionally include `a11y-dark.min.css` based on whether `pageRoute` or `entryRoute` is true or false, loading the stylesheet only on a page route, providing flexibility in styling based on the current route's context.

## Next {#next}

In the next section, we'll explore [Loops](/tutorial/loops) to generate a menu by looping through the titles of our pages. Stay tuned!
