const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const validateToken =asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization|| req.headers.authorization; //get the authorization 
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decode) => {
            if(err){
                res.status(401);
                throw new Error("Token is not valid");
            }
          req.user = decode.user
          next();
        });
        if(!token){
            res.status(401);
            throw new Error("Token is not valid");
        }   
    }
});
module.exports = validateToken;
// Compare this snippet from controllers/userController.js: