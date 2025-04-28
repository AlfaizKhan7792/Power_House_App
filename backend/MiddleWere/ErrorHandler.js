const MiddleWere = (err, req, res, next) =>{

const checkStatus = res.statusCode < 400 ? 500 : res.statusCode

res.status(checkStatus)

res.json({
    message : err.message, 
    stack : process.env.NODE_ENV === "development" ? err.stack : null
})


}


module.exports = MiddleWere