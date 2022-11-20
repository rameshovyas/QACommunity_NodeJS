/* Using dependent modules here */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
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

//Use body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//Use Cookiee Parser middleware
app.use(cookieParser());

let loggedUser="";
let questionList=[];
/* The root route for get request */
app.get("/", (req,res) => {
    //Fetch all available questions from database
    try{
        pool.getConnection((err, connection) => {
            if(err){
                console.log(`Error connecting MySQL : ${err}`);
                return;
            }
            //Select questions lates first
            const sql =`select * from question order by postedOn DESC`;
            connection.query(sql, async(err,rows) =>{
                try{
                    if(err) {
                        console.log(err);
                        return;
                    }                              
                    //User doesnot exists
                    if(rows.length !=0 ) {
                       // questionList = rows;
                       //console.log(rows);
                       res.render("index",{cookies:req.cookies,name:loggedUser, questions:rows});
                    }
                }
                catch{}
            });
        });
    }
    catch{
    }
    
});

app.get("/view/:slug", (req,res) => {
    //Fetch all available questions from database
    try{
        pool.getConnection((err, connection) => {
            if(err){
                console.log(`Error connecting MySQL : ${err}`);
                return;
            }
            //Select questions lates first
            const sql =`select * from question where id=1`;
            connection.query(sql, async(err,rows) =>{
                try{
                    if(err) {
                        console.log(err);
                        return;
                    }                              
                    //User doesnot exists
                    if(rows.length !=0 ) {
                      
                       res.render("viewQuestion",{question:rows[0], cookies:req.cookies});
                    }
                }
                catch{}
            });
        });
    }
    catch{
    }
    
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

/* GET/signin */
app.get("/signin", (req,res) =>{
    res.render("signin") 
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
    
})


/* Sign in POST method */
// Login route
app.post("/signin", async (req, res) => {
    try {
        const { email,password } = req.body;
        if(email) {            
            pool.getConnection((err, connection) => {
            if(err) {
                console.error(err);
                return;
            }
            const sql =`select * from user_auth where username='${email}'`;
            connection.query(sql, async(err,rows) =>{
                if(err) {
                    console.log(err);
                    return;
                }
                if(rows.length ===0) {
                    res.render("error",{errorMessage: "User does not exists!"});
                    return;
                }

                // Username found Compare the password now
                const saltedPassword = rows[0].user_password;
        
                const compareResult = await bcrypt.compare(password, saltedPassword);

                if(compareResult === true) {                  

                    // Generate new SessionId
                    const sessionId = await randomSessionId();

                    //Associate sessionId with the user by updating record
                    const sql= `update user_auth set sessionId ='${sessionId}' where username='${email}'`
                    connection.query(sql, (err,rows) => {
                    if(err) {
                       console.error(err);                       
                     } 
                     else {
                        loggedUser=firstName + " " + lastName; 
                        res.setHeader("set-cookie", [`SESSION_ID=${sessionId}; httponly; samesite=lax`]);
                        res.redirect("/"); // Redirect to home page after successful login
                     }                       
                });

                }
                else {
                    res.render("error",{errorMessage: "Password incorrect"});
                }

                
            });    
            });
        }
        else {
            res.status(400).send("Username is required");
        }
    }
    catch (ex){       
        console.error(ex);
    }
});


/* signout */
app.get("/signout", async (req,res) => {
    const sessionId = req.cookies.SESSION_ID;
    if(sessionId) {
        pool.getConnection((err, connection) => {
            if(err) {
                console.error(err);
            }
            else
            {   
              const sql=`update user_auth set sessionId = null where sessionId = '${sessionId}'`
              connection.query(sql, (err,rows) => {
                if(err) {                                        
                    res.render("error", {erroMessage : err});
                }
                else {                   
                    res.render("index", {cookies : req.cookies});
                }
              });
            }
        });  
    }
});




/*Spin the server here */
app.listen(PORT, ()=>{
    console.log(`Server is up and listening at port ${PORT}`);
})


// Function to Gneretae random string for session id
async function randomSessionId() {
    return crypto.randomBytes(64).toString('hex');
}
