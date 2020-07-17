let express = require("express");
let app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("*", (req, res) => {
    res.send("Don't look at me");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, process.env.IP, () => {
    console.log("Server started at " + PORT + "!");
});