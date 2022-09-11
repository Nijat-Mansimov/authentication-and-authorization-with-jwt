const admin = (req, res, next)=>{
    if(req.user && !req.user.isAdmin){
        return res.status(403).json({
            "message": "Only admin can enter"
        });
    }
    next();
    
};

module.exports = admin;