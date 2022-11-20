/* Using dependent modules here */
const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;

/*Creating express app */
const app = express();

/*Setting up the vew engine of app to EJS */
app.set('view engine','ejs');

/* static middleware for rendering static files */
app.use(express.static('public'));

/* The root route for get request */
app.get("/", (req,res) => {
    res.render("index");
});

/*About us route */
app.get("/about",(req,res)=> {
    res.render("about")
});

/*Contact us route */
app.get("/contact",(req,res)=> {
    res.render("about")
});

/*Blog route */
app.get("/blog",(req,res)=> {
    res.render("blog")
});

/*Spin the server here */
app.listen(PORT, ()=>{
    console.log(`Server is up and listening at port ${PORT}`);
})
