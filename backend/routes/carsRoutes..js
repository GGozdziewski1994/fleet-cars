const express = require('express');
const {
    addCar,
    getAllCars,
    updateCar,
    deleteCar
} = require('../controller/carsController');

const router = express.Router();

router.post('/addCar', addCar);
router.get('/allCars', getAllCars);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;