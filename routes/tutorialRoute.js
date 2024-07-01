import { app, marked } from "../functions/initialize.js"

// Create the entry route
export const tutorialRoute = () => {
	app.get("/tutorial/:href", async (req, res) => {
		// Parse the Markdown files in the "markdown" directory with LiteNode's parseMarkdownFileS method
		const parsedMarkdownFiles = await app.parseMarkdownFileS("markdown")

		// Find the currentMarkdownFile form parsedMarkdownFiles by its `href` property in its frontmatter
		const currentMarkdownFile = parsedMarkdownFiles.find((file) => file.frontmatter.href === req.params.href)

		// Group Markdown files by category
		const groupedByCategory = await app.groupByMarkdownProperty(
			"markdown",
			["metadata.category", "metadata.catIndex", "metadata.subcategory", "metadata.subCatIndex", "href"],
			"metadata.category"
		)

		// Generate the main menu out of groupedByCategory
		const mainMenu = Object.entries(groupedByCategory)
			.map(([key, value]) => {
				// Clone the value array to avoid mutation
				const sortedValue = [...value].sort((a, b) => a["metadata.subCatIndex"] - b["metadata.subCatIndex"])

				return { key, value: sortedValue }
			})
			.sort((a, b) => {
				// Sort mainMenu based on the metadata.catIndex of the first object in each value array
				const catIndexA = a.value[0]["metadata.catIndex"]
				const catIndexB = b.value[0]["metadata.catIndex"]
				return catIndexA - catIndexB
			})

		// Test if such a file exists
		if (currentMarkdownFile) {
			// If the file exists, extract the needed data to be transferred
			const { title, description } = currentMarkdownFile.frontmatter

			// Parse the file `content` with Marked
			const html_content = marked.parse(currentMarkdownFile.content)

			// Generate a table of contents out of the heading tags in current Markdown file
			const html_toc = app.generateTOC(html_content)
			// or html_toc = app.generateTOC(currentMarkdownFile.content)

			// Get the html_toc length to display it only if it contains at least a heading tag
			const tocLength = html_toc.length

			// Render currentMarkdownFile with assigned data object
			res.render("layouts/index.html", {
				mainMenu,
				title,
				description,
				html_content,
				tocLength,
				html_toc,
				tutorialRoute: true,
			})
		} else {
			res.redirect("/404", 302)
		}
	})
}
