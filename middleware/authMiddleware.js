const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const auth = async (req, res, next)=>{
    try{
        if(req.header("Authorization")){

            const token = req.header("Authorization").replace("Bearer ", "");
            const result = jwt.verify(token, "12345");
            const findUser = await User.findById({_id: result._id});
            if(findUser){
                req.user = findUser;
            }else{
                throw new Error("Please log in")
            }
            next();
        }else{
            throw new Error("Please log in")
        }
    }catch(err){
        next(err);;
    }
}

module.exports = auth;