const { Router } = require('express');
const { userRoutes } = require('./user.routes');
const { predioRoutes } = require('./predio.routes');

const router = Router();

router.use("/users", userRoutes);
router.use("/predios", predioRoutes);

exports.router = router;
