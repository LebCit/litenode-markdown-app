import { Marked } from "marked"
import hljs from "highlight.js/lib/core"
import { markedHighlight } from "marked-highlight"

// List of languages to import and register
const languages = ["javascript", "markdown", "bash", "xml", "css", "plaintext", "json", "handlebars"]

// Function to register Highlight.js languages asynchronously
const registerLanguages = async () => {
	for (const lang of languages) {
		try {
			const module = await import(`highlight.js/lib/languages/${lang}`)
			hljs.registerLanguage(lang, module.default)
		} catch (error) {
			console.error(`Failed to import ${lang} language module`, error)
		}
	}
}

// Call the async function to register languages
registerLanguages()

export const markedParseAndHighlight = new Marked(
	markedHighlight({
		langPrefix: "hljs language-",
		highlight(code, lang, info) {
			// Check if the language is registered, otherwise default to plaintext
			const language = hljs.getLanguage(lang) ? lang : "plaintext"

			// Transform code to highlighted HTML
			return hljs.highlight(code, { language }).value
		},
	})
)
