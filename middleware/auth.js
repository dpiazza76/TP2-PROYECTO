import jsonwebtoken from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

function auth(req, res, next){

    try {
        //console.log(req.header('Authorization'));
        const token = req.header('Authorization').replace('Bearer ', '');
        //const token = req.header('Token');
        jsonwebtoken.verify(token, process.env.KEY);
        next();
    } catch (error) {
        res.status(401).send({error: error.message});
    }
}


export {auth};
