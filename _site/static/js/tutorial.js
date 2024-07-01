import { highlightCurrentMenuItem } from "./highlightCurrentMenuItem.js"
import { openCloseMobileMenu } from "./openCloseMobileMenu.js"
import { updateExternalLinks } from "./updateExternalLinks.js"
import { scrollToId } from "./scrollToId.js"

document.addEventListener("DOMContentLoaded", () => {
	// Open and close the mobile menu
	openCloseMobileMenu()

	// Add target and rel attributes to external links
	updateExternalLinks()

	// Highlight current menu item
	highlightCurrentMenuItem()

	// Scroll to corresponding id after click on TOC link
	scrollToId()
})
