import { app } from "./functions/initialize.js"
import { entryRoute } from "./routes/entryRoute.js"
import { tutorialRoute } from "./routes/tutorialRoute.js"

// Define handling for 404 (Not Found) errors
app.notFound((req, res) => {
	res.status(404).render("layouts/index.html", {
		title: "Page Not Found",
		description: "The server cannot find the requested resource",
		notFoundRoute: true,
	})
})

entryRoute()
tutorialRoute()

// Start the server
app.startServer()
