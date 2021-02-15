import jwt from 'jsonwebtoken';

function auth(req, res, next){

    try {
        const token = req.cookies.token;
        // console.log(token);
        if(!token){
            return res.status(401).json({ errorMessage: "Unauthorized token"});
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.id;

        next();

    } catch (error) {
        console.log('jestem')
        return res.status(401).json({ errorMessage: "Unauthorized" })
    }
}

export default auth;