/**
 * Scrolls to the element with the ID specified in the URL hash, adjusting for the header height.
 *
 * This function ensures that the page scrolls smoothly to the element specified by the hash
 * in the URL, taking into account the height of a fixed header. It also updates the header height
 * dynamically on window resize and sets up event listeners to handle anchor clicks that link to IDs.
 *
 * @function
 */
export const scrollToId = () => {
	// Select the header element to account for its height during scrolling
	const header = document.querySelector("header")
	let headerHeight = header.offsetHeight

	/**
	 * Scrolls smoothly to the element specified by the current URL hash.
	 */
	const scrollToCurrentHash = () => {
		// Get the current hash from the URL (without the '#' character)
		const currentHash = window.location.hash.substring(1)
		if (currentHash) {
			// Find the target element by ID
			const targetElement = document.getElementById(currentHash)
			if (targetElement) {
				// Calculate the target position considering the header height
				const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight
				// Scroll to the target position smoothly
				window.scrollTo({
					top: targetPosition,
					behavior: "smooth",
				})
			}
		}
	}

	// Update the header height on window resize (useful for responsive designs)
	window.addEventListener("resize", () => {
		headerHeight = header.offsetHeight
		scrollToCurrentHash()
	})

	// Add click event listeners to all anchor elements with hrefs starting with '#'
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault() // Prevent the default anchor behavior

			// Remove the 'active' class from all anchor elements
			document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
				anchor.classList.remove("active")
			})

			// Add the 'active' class to the clicked anchor
			this.classList.add("active")

			// Get the target ID from the href attribute of the clicked anchor
			const targetId = this.getAttribute("href").substring(1)
			// Find the target element by ID
			const targetElement = document.getElementById(targetId)

			if (targetElement) {
				// Calculate the target position considering the header height
				const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight
				// Scroll to the target position smoothly
				window.scrollTo({
					top: targetPosition,
					behavior: "smooth",
				})

				// Update the URL hash to reflect the new position
				history.pushState(null, null, `#${targetId}`)
			}
		})
	})

	// Scroll to the current hash when the page loads
	scrollToCurrentHash()
}
