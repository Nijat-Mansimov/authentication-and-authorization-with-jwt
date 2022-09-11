const errorHandler = (err, req, res, next)=>{
    res.json({
        "errorCode": err.statusCode,
        "errorMessage": err.message
    })
}

module.exports = errorHandler;