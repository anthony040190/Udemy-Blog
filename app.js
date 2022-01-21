const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// VARIABLES INITIALIZATION
var blogTitles = [];
var blogBodies = [];

// END POINTS
app.get("/", (req, res) => {
    res.render("index", {
                        blogTitles: blogTitles,
                        blogBodies: blogBodies
    });
});



app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {

    let title = req.body.blogTitle;
    let body = req.body.blogBody;

    blogTitles.push(title);
    blogBodies.push(body);
    
    res.redirect("/");

});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/post/:id", (req, res) => {
    let titleId = req.params.id;
    res.render("post", {
                        id: titleId,
                        blogTitles: blogTitles,
                        blogBodies: blogBodies
    });
});




app.listen(process.env.PORT || port, () => {
    console.log(`The server is listening on port ${port}`);
});