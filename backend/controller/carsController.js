const db = require('../index');
const Car = db.cars;

const addCar = async (req, res) => {

    const data = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        dateOfIntroduction: req.body.dateOfIntroduction,
        mileage: req.body.mileage,
        isEdit: req.body.isEdit,
    };

    try {
        const car = await Car.create(data);
        res.status(200).send(car);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAllCars = async (req, res) => {

    try {
        const cars = await Car.findAll({});
        res.status(200).send(cars);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateCar = async (req, res) => {
    const id = req.params.id;

    try{
        const car = await Car.update(req.body, { where: { id: id } });
        res.status(200).send(car);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteCar = async (req, res) => {
    const id = req.params.id;

    try{
        await Car.destroy({ where: { id: id }});
        res.status(200).send('Car is deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    addCar,
    getAllCars,
    updateCar,
    deleteCar
};














// const addCar = (req, res) => {
//     const data = req.body;
//     let sql = 'INSERT INTO car SET ?';
//     db.query(sql, data, err => {
//         if(err) throw err;
//         res.json({
//             status: 200,
//             message: 'Added successfully'
//         });
//     });
// };
//
// const getAllCars = (req, res) => {
//     let sql = 'FETCH DATA';
//     db.query(sql, (err, data) => {
//         if(err) throw err;
//         res.json({
//             status: 200,
//             data,
//             message: 'Cars retrieved successfully'
//         });
//     });
// };




