import { app, marked } from "./initialize.js"
import { cp, mkdir, rm } from "node:fs/promises"

const index = app.parseMarkdownFile("index.md")
const pages = await app.parseMarkdownFileS("markdown")
const groupedByCategory = await app.groupByMarkdownProperty(
	"markdown",
	["metadata.category", "metadata.catIndex", "metadata.subcategory", "metadata.subCatIndex", "href"],
	"metadata.category"
)
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

async function build() {
	try {
		// Remove existing "_site" directory if it exists
		await rm("_site", { recursive: true, force: true })

		// Create output directories
		await mkdir("_site", { recursive: true })
		await mkdir("_site/static", { recursive: true })
		await mkdir("_site/tutorial", { recursive: true })

		// Copy static folder to _site/static
		await cp("static", "_site/static", { recursive: true })

		// Define function to create the main route
		async function createMainRoute() {
			const html_content = marked.parse(index.content)
			const { title, description } = index.frontmatter

			// Create "index.html" in "_site" directory
			await app.renderToFile(
				"layouts/index.html",
				{
					title,
					description,
					html_content,
					entryRoute: true,
				},
				"_site/index.html"
			)
		}

		// Define function to create each page route
		async function createPageRoute() {
			for (const page of pages) {
				try {
					const fileFrontmatter = page.frontmatter

					// Added to output each page in a directory matching its href
					const fileHREF = fileFrontmatter.href
					// Create a folder for each page
					await mkdir(`_site/tutorial/${fileHREF}`, { recursive: true })

					const htmlContent = marked.parse(page.content)
					const html_toc = app.generateTOC(htmlContent)
					const tocLength = html_toc.length

					// Create HTML file out of each page
					await app.renderToFile(
						"layouts/index.html",
						{
							description: fileFrontmatter.description,
							title: fileFrontmatter.title,
							html_content: htmlContent,
							mainMenu: mainMenu,
							html_toc,
							tocLength,
							tutorialRoute: true,
						},
						`_site/tutorial/${fileHREF}/index.html`
					)
				} catch (error) {
					console.error(`Error processing page: ${page.fileName}`, error)
				}
			}
		}

		// Define function to create the 404 route
		async function createError404Route() {
			await app.renderToFile(
				"layouts/index.html",
				{
					title: "Page Not Found",
					description: "The server cannot find the requested resource",
					notFoundRoute: true,
				},
				"_site/404.html"
			)
		}

		// Execute the route creation functions
		createMainRoute()
		createPageRoute()
		createError404Route()
	} catch (error) {
		console.error("Build error:", error)
	}
}

await build()
