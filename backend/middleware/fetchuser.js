const jwt = require('jsonwebtoken'); //to generate token of a hash value

const JWT_SECRET = 'creatingiNoteBook';


const fetchuser = (req, res, next) =>{

    const tok = req.header('token');
    if(!tok){
        return res.status(401).send({error: "Enter valide token"})
    }
    // console.log(tok)
    try {
        const data = jwt.verify(tok, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).send({error: "Something went wrong"})
    }
}


module.exports = fetchuser;