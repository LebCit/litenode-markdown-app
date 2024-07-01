import { app, marked } from "../functions/initialize.js"

// Create the entry route
export const entryRoute = () => {
	app.get("/", (req, res) => {
		// Parse the Markdown file with LiteNode's parseMarkdownFile method
		const parsedIndex = app.parseMarkdownFile("index.md")

		// Getting the content out of the parsed file
		const html_content = marked.parse(parsedIndex.content)

		// Extract title and description from the file frontmatter
		const { title, description } = parsedIndex.frontmatter

		// Render index.html with assigned data object
		res.render("layouts/index.html", { title, description, html_content, entryRoute: true })
	})
}
