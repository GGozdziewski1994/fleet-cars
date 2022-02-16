import './Cars.scss';
import './loader.scss';
import CarItem from "./CarItem";
import AddCar from "./AddCar";
import { Fragment, useCallback, useEffect, useState, useReducer } from "react";
import useHttp from "../../hooks/use-http";
import ErrorModal from "../UI/ErrorModal";
import transformDate from "./date/transformDate";
import reducerCars from "./reducerCars";
import { GET, POST } from '../../constants/methodsConstants';
import { RENDER } from "../../constants/reducerCarsConstants";
const GET_ALL_CARS = process.env.REACT_APP_GET_ALL_CARS;
const ADD_CAR = process.env.REACT_APP_ADD_CAR;

const Cars = () => {
    const [stateCars, onDispatchCars] = useReducer(reducerCars, []);
    const [isAddCar, setIsAddCar] = useState(false);
    const { isLoading, sendRequest, data, error, cleanError } = useHttp();

    const fetchCars = useCallback(async () => {
        await sendRequest(GET_ALL_CARS, GET);
    },[sendRequest]);

    const addNewCar = useCallback(async newCar => {
        await sendRequest(ADD_CAR, POST, newCar, true);
        await fetchCars();
    }, [sendRequest]);

    useEffect( () => {
        fetchCars();
    }, [fetchCars]);

    useEffect(() => {
        if(!isLoading && !error && data) {
            const cars = data.map(car => {
                return {
                    ...car,
                    //dateOfIntroduction: car.dateOfIntroduction.split('-').reverse().join('.'),
                    creationDate: transformDate(car.createdAt),
                    actualisationDate: transformDate(car.updatedAt),
                }
            });
            onDispatchCars({type: RENDER, cars: cars.reverse()})
        }

    }, [isLoading, data, error]);

    const showAddCarHandler = () => {
        setIsAddCar(true);
    };

    const hideAddCarHandler = () => {
        setIsAddCar(false);
    };

    const carItem = stateCars.map(car => (
        <CarItem
            onDispatchCars={onDispatchCars}
            key={car.id}
            id={car.id}
            brand={car.brand}
            model={car.model}
            year={car.year}
            mileage={car.mileage}
            dateOfIntroduction={car.dateOfIntroduction}
            creationDate={car.creationDate}
            actualisationDate={car.actualisationDate}
        />
    ));

    return(
        <Fragment>
            {error && <ErrorModal onClean={cleanError}>{error}</ErrorModal>}
            <section>
                {isAddCar && <AddCar onAdd={addNewCar} onCancel={hideAddCarHandler}/>}
                <div className='add-car'>
                    <button onClick={showAddCarHandler} className='add-car--button'>Add new car</button>
                </div>
                <div className='cars'>
                    {isLoading && <div id='loader'></div>}
                    {!isLoading && carItem}
                </div>
            </section>
        </Fragment>
    );
};

export default Cars;