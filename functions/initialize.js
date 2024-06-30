// Import LiteNode and markedParseAndHighlight
import { LiteNode } from "litenode"
import { markedParseAndHighlight } from "./markedParseAndHighlight.js"

// Create a new instance of LiteNode called app
const app = new LiteNode()

// Assign markedParseAndHighlight to marked
const marked = markedParseAndHighlight

// Export variables to be used where needed
export { app, marked }
