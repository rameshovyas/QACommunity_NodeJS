/* Using dependent modules here */
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mysql = require("mysql");

const PORT = 3000;

// Create connection pool for my sql database
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'QACommunity'
});


/*Creating express app */
const app = express();

/*Setting up the vew engine of app to EJS */
app.set('view engine','ejs');

/* static middleware for rendering static files */
app.use(express.static('public'));

//Use body parser
app.use(bodyParser.urlencoded({ extended: true }));


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

/* GET/signup */
app.get("/signup", (req,res) =>{
    res.render("signup") 
})

/**
 * Authentication Service Methods Here
 */

/* POST Sign up */
app.post("/signup", (req,res) => {
    res.render("thanks", {name:"Ramesh Vyas"})
})




/*Spin the server here */
app.listen(PORT, ()=>{
    console.log(`Server is up and listening at port ${PORT}`);
})
