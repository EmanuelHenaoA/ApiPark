const {model, Schema} = require('mongoose')
const autoIncrement = require('mongoose-sequence')(require ('mongoose'))
const bcrypt = require ('bcryptjs');

const celdasSchema = new Schema (
    {
        NumeroCelda: {
            type: Number,
            unique: true,
            // required: [true, 'El Número de celda es obligatorio']
        },
        Estado: {
            type: String,
            enum: ['Disponible', 'No disponible'], 
            default: 'Disponible'
        },
        PlacaVehiculo: {
            type: String,
            required: false,
            maxlength:[6, 'Max 6 characters'],
            minlength:[5, 'Min 6 characters']
        },
        FechaIngreso: {
            type: Date,
            default: Date.now
        },
        FechaSalida: {
            type: Date
        },
        Pin: {
            type: String
        }
    }, {versionKey: false}
)

// Aplica el plugin de auto-incremento al campo `NumeroCelda`
celdasSchema.plugin(autoIncrement, { inc_field: 'NumeroCelda' });

// Middleware pre-save para limitar el número de celdas a 10
celdasSchema.pre('save', async function(next) {
    try {
        // Contar el número total de celdas en la colección
        const count = await this.constructor.countDocuments();
        // Verificar si ya hay 10 celdas registradas
        if (count >= 10) {
            const error = new Error('No se pueden registrar más de 10 celdas');
            return next(error);  // Pasar el error al middleware de manejo de errores
        }
        // Si la validación pasa, continuar con el guardado
        next();
    } catch (err) {
        // Manejar cualquier error que ocurra durante la consulta o el proceso
        next(err);
    }
});



module.exports = model('Celdas', celdasSchema, );