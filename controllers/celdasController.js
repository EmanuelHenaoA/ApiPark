const bcrypt = require('bcryptjs/dist/bcrypt')
const Celda = require('../models/celdas')

// Crear una nueva celda
const postCelda = async (req, res) => {
    let msg = "Celda Insertada";
    const body = req.body;

    try {
        // Concatenar para generar el PIN
        const pin = `${body.NumeroCelda}${body.PlacaVehiculo}`;        
        const celda = new Celda(body);
        // Encriptar 
        if (pin) {
            celda.Pin = await bcrypt.hash(pin, 10);
        }
        await celda.save();
    } catch (error) {
        msg = error.message;
    }

    res.json({ msg: msg });
};
// Recuperar una celda específica

const getIdCelda = async (req, res) => {
    try {
        const id = req.params.id; 
        const celda = await Celda.findById(id)
        if (!celda) {
            return res.status(404).json({msg: 'Celda no encontrada'});
        }
        res.json(celda);
    } catch (error) {
        res.status(500).json({msg: 'Error al obtener la celda', error});
    }
};

// Recuperar una lista de todas las celdas
const getCelda = async (req, res) => {
    const celdas = await Celda.find()
    res.json(celdas)
}

// Recuperar una lista de todas las celdas con estado disponible.

// const getCeldaDisponible = async (req, res) => {

// }

// Actualizar una celda específica
const putCelda = async (req, res) => {
    const {_id, Estado, PlacaVehiculo, Pin} = req.body
    let msg = 'Celda Actualizada'
    id = req.params.id
    try{
        await Celda.findByIdAndUpdate(_id,{Estado: Estado, PlacaVehiculo: PlacaVehiculo, Pin: Pin})
    }catch(error){
        msg = error
    }
    res.json({msg:msg})
}

// Eliminar un celda específico
const deleteCelda = async (req, res) => {
    let msg = 'Celda Eliminada'
    id = req.params.id
    try{
        await Celda.findByIdAndDelete({_id: id})
    }catch(error){
        msg = error
    }
    res.json({msg:msg})
}

module.exports = {
    postCelda,
    getCelda,
    putCelda,
    deleteCelda,
    getIdCelda
}