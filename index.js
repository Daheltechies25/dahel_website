import express from "express";
import path from "path";
import ejs from "ejs";
import fs from "fs";

// Initialize the Express app
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");
// app.set("views", path.join(process.cwd(), "views"));

// Serve static files from the html folder (if needed)
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(path.join(process.cwd(), 'html')));
// Serve static files from the "html" folder
// Route to render the EJS templates dynamically
app.get("/", (req, res) => {
    res.render("index", { message: "Howdy Roland" });
});

// Function to render EJS templates into static HTML files
const renderEjsToHtml = (templateName, data) => {
    const templatePath = path.join(process.cwd(), "views", `${templateName}.ejs`);
    const outputDir = path.join(process.cwd(), "html"); // Change the output directory to 'html'
    
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ejs.renderFile(templatePath, data, {}, (err, str) => {
        if (err) {
            console.error(`Error rendering ${templateName}:`, err);
        } else {
            // Save the rendered HTML to the html folder
            const outputFilePath = path.join(outputDir, `${templateName}.html`);
            fs.writeFileSync(outputFilePath, str);
            console.log(`Rendered: ${templateName}.html`);
        }
    });
};

// Route to manually trigger the static HTML rendering
app.get("/generate-static", (req, res) => {
    const data = { message: "Howdy Roland" }; // Dynamic data to pass to the templates
    const templates = ["hero_next", "who_we_are", "our_pillar_section", "footer"]; // List of EJS templates to render

    templates.forEach((template) => {
        renderEjsToHtml(template, data);
    });

    res.send("Static HTML files are being generated. Check the 'html' folder.");
});

// Start the Express server
app.listen(5000, () => {
    console.log("Server running on port - 5000");
});
