const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB;

const connect = async()=>{
    try {
        const conection=await mongoose.connect(uri,{useNewUrlParser: true})
        return conection
    } catch (error) {
        console.log(error)
    }
}

module.exports = connect

