/* Using dependent modules here */
const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;

/*Creating express app */
const app = express();

/* The root route for get request */
app.get("/", (req,res) => {
    res.send("Welcome to my Question Answer Community");
});


/*Spin the server here */
app.listen(PORT, ()=>{
    console.log(`Server is up and listening at port ${PORT}`);
})
