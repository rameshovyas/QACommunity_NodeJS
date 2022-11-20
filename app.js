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

    try{
        // Read request data from form 
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const username = req.body.email;
        const user_password = req.body.password;
        //Getting database connection 
        pool.getConnection((err, connection) => {
            if(err){
                console.log(`Error connecting MySQL : ${err}`);
                return;
            }
        //If connected successfully, check for user already exists
        const sql =`select username from user_auth where username = '${username}'`;
        connection.query(sql, async(err,rows) =>{
            try{
                if(err) {
                    console.log(err);
                    return;
                }                              
                //User doesnot exists
                if(rows.length ===0 ) { //Create new user
                    // Generate a new salt for every user
                    const salt = await bcrypt.genSalt();
                    // Create password hash
                    const hashedPassword = await bcrypt.hash(user_password,salt);
                                
                    const sql = "insert into user_auth (firstName, lastName, username,user_password) values('" + firstName + "','" + lastName + "','" + username + "','" + hashedPassword + "')";
                  
                    connection.query(sql, (err,rows) =>{
                        if(err) {
                            console.log(err);
                            return;
                        }
                        console.log("User created!");
                        res.render("thanks",{name: `${firstName} ${lastName}`});
                    });                        

                }
                else{
                    console.log("User alreday exists");
                    res.render("error",{errorMessage: "User already exists!"});
                }
            }
            catch {
                res.send({"error": "Unable to access data"});
            }

         });    
        });
    }
    catch {
        res.status(500).send();
    }
   


   
    //res.render("thanks", {name:"Ramesh Vyas"})
})




/*Spin the server here */
app.listen(PORT, ()=>{
    console.log(`Server is up and listening at port ${PORT}`);
})
