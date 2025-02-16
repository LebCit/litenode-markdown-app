---
title: Templating
description: "Breaking HTML into modular, reusable components for better maintainability."
image: "/static/images/my-image.png"
tags: ["Node.js", "Markdown", "Tutorial", "LiteNode", "Templating", "Modular Code", "Reusable Components"]
href: templating
metadata:
    index: 4
    category: Structuring
    catIndex: 2
    subcategory: Templating
    subCatIndex: 1
    difficulty: Intermediate
    audience: [Developer, Student]
---

# Templating: The Art of Slicing HTML into Reusable Components

Templating is a powerful technique in web development that involves breaking down HTML code into smaller, reusable components, and dynamically injecting custom data into these templates. This method enhances the modularity and maintainability of your codebase, making it easier to manage and update your application.

## Key Concepts

Before diving into the benefits, let's explore some key concepts in templating.

### 1. Templates {#Templates}

Templates are pre-defined HTML structures that serve as blueprints for the content you want to display. They contain placeholders where dynamic data will be inserted. These placeholders are often denoted by special syntax, such as double curly braces (`{{ }}`) or other delimiters, depending on the templating engine used.

### 2. Data Injection {#Data Injection}

Data injection is the process of populating templates with custom data. This involves replacing the placeholders in your templates with actual data values. The data can come from various sources, such as databases, APIs, or user input.

### 3. Reusability {#Reusability}

By slicing HTML into reusable components, you can use the same template across different parts of your application. This reduces redundancy, ensures consistency, and simplifies maintenance. For instance, a single template for a user profile card can be used to display information for multiple users.

## Benefits of Templating

### Modular Code {#Modular Code}

Templating promotes modular code by allowing you to separate your HTML structure from your data and logic. This separation makes your code more organized and easier to manage.

### Consistency {#Consistency}

Using templates ensures that your UI components remain consistent throughout your application. Any changes to the template will be reflected across all instances where it is used, maintaining a uniform look and feel.

### Maintainability {#Maintainability}

With templating, updating your application becomes more straightforward. Instead of modifying HTML code in multiple places, you only need to update the template, which then propagates the changes everywhere the template is used.

## Example {#example}

Let's walk through a straightforward example to illustrate how templating works with a user profile card:

```html
<!-- profile-card.html -->
<div class="profile-card">
	<h2>{{ name }}</h2>
	<p>{{ email }}</p>
</div>
```

You can then inject custom data into this template:

```javascript
const template = document.getElementById("profile-card-template").innerHTML
const data = { name: "John Doe", email: "john.doe@example.com" }

const rendered = template.replace("{{ name }}", data.name).replace("{{ email }}", data.email)

document.getElementById("profile-container").innerHTML = rendered
```

In this example, the placeholders `{{ name }}` and `{{ email }}` are replaced with the actual values from the `data` object, resulting in a personalized user profile card.

## STE {#ste}

LiteNode includes an integrated Simple Template Engine (STE), designed to streamline template rendering without burdening applications with additional dependencies. STE offers three primary functions:

1. **render(template, data)**: Renders an HTML template with provided data and sends it as the response.
2. **{{#include(filePath)}}**: Embeds an HTML template within another template.
3. **renderToFile(template, data, outputPath)**: Renders an HTML template with provided data and saves the resulting HTML to a specified file.

We've utilized STE in our [First File](/tutorial/first-file) as follows:

### In index.js {#in index js}

-   `res.render("layouts/index.html", { title, description, html_content })`

### In Main Template {#In Main Template}

Within the main template (`layouts/index.html`):

-   `<meta name="description" content="{{description}}" />`
-   `<title>{{title}} | LiteNode MAT</title>`
-   `<main>{{html_content}}</main>`

STE uses double curly braces {{ }} to dynamically load and inject data into HTML templates, simplifying the process.. To inject raw HTML content, prefix the property name with `html_`, such as `html_content`, `html_markup`, or `html_string` and so on...

This setup allows for flexible and efficient template management within LiteNode applications, enhancing both clarity and functionality. For more details on STE and its capabilities, refer to the [official documentation](https://litenode.pages.dev/docs/rendering-templates/).

## Slicing {#slicing}

To efficiently manage our templates, we can enhance our structure by introducing a `components` directory under `views`. This directory will house reusable parts of our application, including elements like `<head>`, `<header>`, `<main>`, and `<footer>`, along with their respective variations and child templates.

Organizing templates this way enhances modularity and reusability, ensuring consistency and reducing redundancy across our application.. It allows us to maintain consistency in design and functionality while reducing redundancy. Here's how our `views` directory looks like with the new `components` directory:

```txt
📂views
├── 📂components
│  ├── 📄footer.html (Reusable footer template)
│  ├── 📄head.html (Reusable head template)
│  ├── 📄header.html (Reusable header template)
│  └── 📄main.html (Reusable main template)
├── index.md (Markdown file)
└── 📂layouts
  └── 📄index.html (Main layout template)

```

### Explanation {#slicing-explanation}

1. **Components Directory**: Organizing components such as `head.html`, `header.html`, `main.html`, and `footer.html` in a dedicated directory (`components/`) allows for easy reuse throughout the application. These templates encapsulate common UI elements and reduce redundancy in code.

2. **Layouts Directory**: The `layouts/` directory houses `index.html`, which serves as the main template integrating various components to form complete pages. This separation ensures clarity and simplifies the structure of individual pages.

### Benefits {#slicing-benefits}

-   **Modularity and Reusability**: Separating components from layouts enables modular design, making it easier to update and reuse UI elements across different pages.
-   **Simplified Maintenance**: Clear organization facilitates easier maintenance and updates, improving developer efficiency and reducing the risk of errors.

-   **Scalability**: As the application grows, this structure supports scalability by providing a foundation for adding new components and layouts without disrupting existing functionality.

By adopting this enhanced directory structure, you establish a solid foundation for managing views and components effectively, aligning with best practices for frontend development.

## Including Templates {#Including Templates}

Now that we've created reusable components, let's integrate them into the main layout template using the `{{#include(filePath)}}` directive:

### Reusable Components {#Reusable Components}

1. **head.html**:

```html
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<!-- Dynamically load description from transferred data object -->
	<meta name="description" content="{{description}}" />

	<!-- Dynamically load title from transferred data object -->
	<title>{{title}} | LiteNode MAT</title>
</head>
```

2. **header.html**:

```html
<header>
	<h1>Welcome LiteNode's Explorer!</h1>
</header>
```

3. **main.html**:

```html
<main>
	<!-- Inject raw HTML content from transferred data object -->
	{{html_content}}
</main>
```

4. **footer.html**:

```html
<footer>
	<p>Proudly Made With LiteNode!</p>
</footer>
```

### Main Layout Template (index.html) {#Main Layout Template}

```html
<!DOCTYPE html>
<html lang="en">
	<!-- Include head.html in index.html -->
	{{#include("components/head.html")}}
	<body>
		<!-- Include header.html in index.html -->
		{{#include("components/header.html")}}

		<!-- Include head.html in index.html -->
		{{#include("components/main.html")}}

		<!-- Include footer.html in index.html -->
		{{#include("components/footer.html")}}
	</body>
</html>
```

### Explanation {#including-templates-explanation}

-   **Components**: Each component (`head.html`, `header.html`, `main.html`, `footer.html`) is designed to encapsulate specific parts of the HTML structure, making them reusable across different pages.
-   **Main Layout Template (`index.html`)**: This template integrates the components using the `{{#include(filePath)}}` directive, ensuring that the structure remains modular and easy to maintain.

### Testing {#testing}

Now, let's check if everything works perfectly. Head over to [http://localhost:5000](http://localhost:5000) to see your main layout template in action.

The components are seamlessly integrated into `index.html` and inherit its data object, ensuring consistent rendering across the application. This approach not only promotes modularity and reusability but also facilitates efficient management of dynamic content within LiteNode.

### Data Inheritance {#data inheritance}

Included templates automatically inherit the data object passed to their parent template, ensuring seamless data propagation. This inheritance mechanism ensures seamless propagation of dynamic content throughout the application's UI. This approach not only promotes consistency but also simplifies the management of shared data across different sections of the application.

<alert data-sm="2column pad gap">
    <alert-icon data-sm="middle">
        <img src="https://cdn.jsdelivr.net/npm/@tabler/icons@2.44.0/icons/info-hexagon.svg" alt="Information SVG" />
    </alert-icon>
    <alert-text data-sm="middle">
		<p>The data object passed to a parent template is also inherited by its included templates!</p>
    </alert-text>
</alert>

## Conclusion {#conclusion}

Mastering templating is crucial for modern web development, helping you build dynamic, maintainable, and reusable HTML components with ease. By slicing your HTML into templates and injecting custom data, you can build scalable and efficient web applications. Whether you are working on a small project or a large-scale application, templating helps you keep your code clean, organized, and easy to manage.

## Next {#next}

You might wonder why we're breaking down our main layout template (`index.html`) into reusable components, especially when we're simply rendering it with data from our single Markdown file (`index.md`). Curious about why we broke down our main layout template into reusable components? We'll explore this in our next section: [One For All](/tutorial/one-for-all). Stay tuned!
