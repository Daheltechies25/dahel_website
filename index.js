import express from "express";
import path from "path";

const app = express();


app.set("view engine", "ejs");

app.set("views", path.join(process.cwd(), "views"));

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
    res.render("index", { message: "Howdy Roland" });
});

app.listen(5000, () => {
    console.log("Server running on port - 5000");
});
