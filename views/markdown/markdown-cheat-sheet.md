---
title: Markdown Cheat Sheet
description: "Basic guide to mastering Markdown syntax for efficient content creation"
image: "/static/images/my-image.png"
tags: ["Markdown Syntax", "Documentation", "Formatting", "Guide", "Content Creation", "Reference", "Cheat Sheet"]
href: markdown-cheat-sheet
metadata:
    index: 13
    category: "Bonus!"
    catIndex: 5
    subcategory: MD Cheat Sheet
    subCatIndex: 1
    difficulty: Intermediate
    audience: [Developer, Student]
---

# Markdown Cheat Sheet

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Here’s a quick reference to help you get started with Markdown.

## Headers {#headers}

```markdown
# H1

## H2

### H3

#### H4

##### H5

###### H6
```

## Emphasis {#emphasis}

```markdown
_Italic_
**Bold**
**_Bold and Italic_**
```

## Lists {#lists}

### Unordered List {#Unordered List}

```markdown
-   Item 1
-   Item 2
    -   Sub Item 1
    -   Sub Item 2
```

### Ordered List {#Ordered List}

```markdown
1. Item 1
2. Item 2
    1. Sub Item 1
    2. Sub Item 2
```

## Links {#links}

```markdown
[Link Text](https://example.com)
```

## Images {#images}

```markdown
![Alt Text](https://example.com/image.jpg)
```

## Blockquotes {#Blockquotes}

```markdown
> This is a blockquote.
```

## Code {#code}

### Inline Code {#Inline Code}

```markdown
`inline code`
```

### Code Block {#Code Block}

````markdown
```json
{
	"firstName": "John",
	"lastName": "Smith",
	"age": 25
}
```
````

## Tables {#tables}

```markdown
| Header 1    | Header 2    |
| ----------- | ----------- |
| Row 1 Col 1 | Row 1 Col 2 |
| Row 2 Col 1 | Row 2 Col 2 |
```

## Horizontal Rules {#Horizontal Rules}

```markdown
---
```

## Task Lists {#Task Lists}

```markdown
-   [x] Completed Task
-   [ ] Incomplete Task
```

## Including Metadata {#Including Metadata}

Some static site generators allow including metadata in the Markdown files' frontmatter; LiteNode handles it natively:

```yaml
---
title: "Markdown Cheat Sheet"
description: "Basic guide to mastering Markdown syntax for efficient content creation"
tags: ["Markdown Syntax"]
---
```

By mastering these Markdown basics, you'll be able to create well-structured and formatted content efficiently.
