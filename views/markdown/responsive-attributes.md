---
title: CSS From HTML
description: Creating responsive designs using HTML data attributes
image: "/static/images/my-image.png"
tags: ["CSS", "HTML Attributes", "Responsive Design", "Styling", "Web Development", "Project Organization", "Responsive Attributes", "CSS Grid"]
href: html-attributes
metadata:
    index: 10
    category: Styling
    catIndex: 3
    subcategory: CSS From HTML
    subCatIndex: 1
    difficulty: Intermediate
    audience: [Developer, Student]
---

# Responsive Attributes

Although our application is already responsive due to its minimal content, this section will explore how to create a more sophisticated responsive design using HTML data attributes. This approach minimizes the reliance on extensive CSS rules or the need to use a CSS framework. Additionally, the principles of [Responsive Attributes](https://matthewjamestaylor.com/responsive-attributes) can be grasped in under 30 minutes for beginners and in just 10 minutes for those already familiar with CSS basics.

## CSS Grid {#CSS Grid}

[CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) is a powerful layout system that allows web developers to design complex web layouts easily. Unlike traditional CSS frameworks or float-based layouts, CSS Grid provides a two-dimensional grid-based layout system, enabling precise control over both rows and columns of an HTML element. It offers a straightforward approach to creating responsive designs, making it ideal for arranging content in a grid structure that adapts seamlessly to different screen sizes and devices. With CSS Grid, developers can achieve sophisticated layouts without relying on complex positioning hacks or additional markup, thereby streamlining the design process and enhancing flexibility in web development.

## Responsive Styles {#Responsive Styles}

To add responsive styles, use the [Responsive Attributes Generator](https://responsive-attributes-generator.pages.dev/) (RAG) to generate a stylesheet. Simply click on the CSS icon file in the header. This action will provide us with a compact 16KB stylesheet which we will save in the `css` directory and load in our `head.html`. It's worth noting that we can minify the generated stylesheet for optimization.

You can think of the generated stylesheet from RAG as a wrapper that simplifies harnessing the power of CSS Grid directly through HTML data attributes which will explore shortly.

The `css` folder structure within the `static` directory is organized as follows:

```txt
📂css (styles directory)
├── 📄a11y-dark.min.css (Highlighting stylesheet optimized for accessibility)
└── 📄responsive-attributes.css (Stylesheet designed for responsive layouts)
```

The `head.html` file has been updated to include `responsive-attributes.css` as follows:

```hbs
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<!-- Dynamically load description from transferred data object -->
	<meta name="description" content="{{description}}" />

	<!-- Dynamically load title from transferred data object -->
	<title>
		{{title}} | LiteNode MAT
	</title>

	<!-- Load responsive-attributes.css for all routes -->
	<link rel="stylesheet" href="/static/css/responsive-attributes.css" />

	{{#if pageRoute}}
		<!-- Load a11y-dark.min.css only if pageRoute is true -->
		<link rel="stylesheet" href="/static/css/a11y-dark.min.css" />
	{{/if}}
</head>
```

This setup ensures that `responsive-attributes.css` is consistently loaded across all pages, while `a11y-dark.min.css` is conditionally loaded based on the `pageRoute` variable.

## Update index.html {#update-index-html}

Transform the `<body>` tag in `index.html` into a grid layout with padding and gaps by updating it as follows:

```hbs
<!-- Before -->
<body>

<!-- After -->
<body data-sm="column childPad gap">
```

Here's an explanation of what this change does:

-   `data-sm="column"` sets the display of the body as a grid container of 1 column for all breakpoints.
-   `childPad` adds padding within the grid items.
-   `gap` adds a gap between the grid items, providing spacing and enhancing the layout.

Since we've added a new stylesheet, [Restart the Server](/tutorial/one-for-all#restart-server) so it can recognize it and take a look at our application, you'll notice that each part of the application is now clearly separated from the others.

## Update header.html {#update-header-html}

Update `header.html` to enhance the menu appearance and functionality:

```html
<header>
	<h1>Welcome to LiteNode's Explorer</h1>

	<header-menu data-sm="3column gap" data-lg="6column" class="menu-grid">
		<span data-sm="center">
			<a href="/">Home</a>
		</span>
		{{#each titles}}
		<span data-sm="center">
			<a href="/page/{{href}}">{{title}}</a>
		</span>
		{{/each}}
	</header-menu>
</header>
```

### Explanation {#explanation}

1. **header-menu Grid Configuration**:

    - `data-sm="3column gap"`: This sets `header-menu` to display as a grid container with 3 columns and a gap between the items for small and medium screens.
    - `data-lg="6column"`: For large and extra-large screens, `header-menu` will switch to a 6-column layout.

2. **Inheritance of Alignment Settings**:

    The `data-sm="center"` attribute centers each menu item horizontally within its column for all breakpoints. The alignment settings defined for `data-sm` apply universally across larger breakpoints (`data-md`, `data-lg`, `data-xl`).Therefore, the horizontal centering specified at `data-sm` level propagates up through all subsequent breakpoints.

### Steps {#steps}

-   **Save Changes**: Save the modified `header.html` file.
-   **Refresh Browser**: Refresh your browser to see the updated menu layout.
-   **Responsive Behavior**: Resize your browser window to observe how the menu adapts its layout based on screen size, switching between 3 columns for smaller screens and 6 columns for larger screens.

These changes improve the menu's appearance and usability, ensuring it looks great and adapts to different screen sizes.

## Next {#next}

This section just scratches the surface of what you can achieve with responsive attributes. While our focus isn't on CSS, exploring these attributes can significantly enhance your design skills. I encourage you to explore the versatility of responsive attributes; once you grasp their straightforward concepts, you may find yourself relying less on CSS frameworks in the future.

Returning to some valuable insights in our tutorial, the next section will delve into the concept of [Islands Architecture](/tutorial/islands).
