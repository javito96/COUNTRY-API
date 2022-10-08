const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const controllers = require ('../controllers/index')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/countries', controllers.getAll)
router.get('/countries/:id', controllers.getByID)

module.exports = router;
