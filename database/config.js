const mongoose = require('mongoose')

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_CNN)
        console.log('Servidor conectado a la base de datos')
    }catch(error){
        console.log(error)
    }
}

module.exports = dbConnection