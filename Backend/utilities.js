const jwt=require('jsonwebtoken');
function authenticatetoken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        console.log("No token provided");
        return res.sendStatus(401);
    }
    
    console.log("Token:", token);  // Log the token to debug
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.sendStatus(403);  // Forbidden
        }
        req.user = user;
        next();
    });
}

module.exports={
    authenticatetoken
}