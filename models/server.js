const express = require('express')
const dbConnect = require('../database/config')
require('../database/config')
const celdasRouter = require('../router/celdasRouter')

class Server {
    constructor(){
        this.app = express()
        this.listen()
        this.dbConnection()
        this.route()
    }
    async dbConnection(){
        await dbConnect()
    }
    route(){
        this.app.use(express.json())
        this.app.use('/api/celdas', celdasRouter )
    }
    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor Corriendo')
        })
    }
}

module.exports = Server