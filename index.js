const express = require("express");
require("./db/dbConnection");
const userRouter = require("./router/userRouter")
const errorMiddleware = require("./middleware/errorMiddleware");
const jwt = require("jsonwebtoken");


const app = express();

app.use(express.json());
// app.use(express.urlencoded());

app.use("/api/users", userRouter);

app.get("/", (req, res)=>{
    res.status(200).json({
        "message": "Hello World"
    })
});

app.use(errorMiddleware);

// function test() {
//     const token = jwt.sign({_userID: "newUserID", isAdmin: true, isActive: true}, "123456", {expiresIn: "2h"});
//     console.log(token);

//     const result = jwt.verify(token, "123456");
//     console.log(result);
// }

// test();

PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`);
});