const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/RestfulAPI", {useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=>{
        console.log("Connected to database");
    })
    .catch((err)=>{
        console.log(`Error occurred while connecting to database: ${err}`);
    })

