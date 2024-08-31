const {Router} = require("express");
const {postCelda, getCelda, putCelda, deleteCelda, getIdCelda} = require('../controllers/celdasController')

const celdasRouter = Router()
celdasRouter.get('/', getCelda)
celdasRouter.post('/', postCelda)
celdasRouter.put('/', putCelda)
celdasRouter.delete('/:id', deleteCelda)
celdasRouter.get('/:id', getIdCelda)

module.exports = celdasRouter