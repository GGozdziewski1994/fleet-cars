import './CarItem.scss';
import {useReducer, useRef, useEffect, useCallback, useState} from "react";
import useHttp from "../../hooks/use-http";
import {createToday, createYear} from "./date/createDate";
import { PUT, DELETE } from '../../constants/methodsConstants';
import { REMOVE, EDIT, HIDE_EDIT, IS_EDIT, RENDER } from '../../constants/reducerCarsConstants';
import reducerCars from './reducerCars';
const UPDATE_CAR = process.env.REACT_APP_UPDATE_CAR;
const DELETE_CAR = process.env.REACT_APP_DELETE_CAR;

const CarItem = props => {
    const { giveDataCars: dataCars } = props;
    const [stateCars, onDispatchCars] = useReducer(reducerCars, dataCars);
    const [animationYear, setAnimationYear] = useState(false);
    const [animationMileage, setAnimationMileage] = useState(false);
    const { sendRequest } = useHttp();
    const brandRef = useRef(null);
    const modelRef = useRef(null);
    const yearRef = useRef(null);
    const mileageRef = useRef(null);
    const dateOfIntroductionRef = useRef(null);

    const updateCar = useCallback(async (id, updateCar) => {
        await sendRequest(UPDATE_CAR + '/' + id, PUT, updateCar);
    }, [sendRequest]);

    const deleteCar = useCallback(async id => {
        await sendRequest(DELETE_CAR + '/' + id, DELETE,);
    }, [sendRequest]);

    useEffect(() => {
        onDispatchCars({type: RENDER, cars: dataCars});
    }, [dataCars]);

    const removeCarHandler = event => {
        onDispatchCars({type: REMOVE, id: +event.target.id, remove: deleteCar});
    };

    const editCarHandler = event => {
        event.preventDefault();

        const enteredYear = yearRef.current.value;
        const enteredMileage = mileageRef.current.value;

        if(enteredYear > createYear() || Number(enteredYear) < 1900) {
            setAnimationYear(true);

            setTimeout(() => {
                setAnimationYear(false);
            }, 1000);
            return;
        }

        if(Number(enteredMileage) < 0) {
            setAnimationMileage(true);

            setTimeout(() => {
                setAnimationMileage(false);
            }, 1000);
            return;
        }

        onDispatchCars({
            type: EDIT,
            id: +event.target.id,
            brand: brandRef.current.value,
            model: modelRef.current.value,
            year: enteredYear,
            mileage: enteredMileage,
            dateOfIntroduction: dateOfIntroductionRef.current.value,
            update: updateCar,
        });
    };

    const carIsEdit = event => {
        onDispatchCars({type: IS_EDIT, id: +event.target.id});
    };

    const carHideEdit = event => {
        onDispatchCars({type: HIDE_EDIT, id: +event.target.id});
    };

    const classNameYearError = animationYear ? 'animation--error' : '';
    const classNameMileageError = animationMileage ? 'animation--error' : '';

    return(
        stateCars.map(car => {
            return(
                <div key={car.id} className='container'>
                    <div>
                        <div className='car'>
                            <div className='car--title'>
                                <h2>Car data</h2>
                            </div>
                            {!car.isEdit && <div>
                                <p className='car--data'>Brand: <span className='car--item'>{car.brand}</span></p>
                                <p className='car--data'>Model: <span className='car--item'>{car.model}</span></p>
                                <p className='car--data'>Year: <span className='car--item'>{car.year}</span></p>
                                <p className='car--data'>Car mileage: <span className='car--item'>{car.mileage} km</span></p>
                                <p className='car--data'>Date of introduction: <span className='car--item'>{car.dateOfIntroduction}</span></p>
                            </div>}
                            {car.isEdit && <form>
                                <label className='car--data car--data-edit'>Brand: <input
                                    ref={brandRef}
                                    type='text'
                                    size={car.brand.length}
                                    defaultValue={car.brand}/>
                                </label>
                                <label className='car--data car--data-edit'>Model:<input
                                    ref={modelRef}
                                    type='text'
                                    size={car.model.length}
                                    defaultValue={car.model}/>
                                </label>
                                <label className='car--data car--data-edit'>Year: <input
                                    className={classNameYearError}
                                    ref={yearRef}
                                    type='number'
                                    min='1900'
                                    max={`${createYear()}`}
                                    size={String(car.year).length}
                                    defaultValue={car.year}/>
                                </label>
                                <label className='car--data car--data-edit'>Car mileage: <input
                                    className={classNameMileageError}
                                    ref={mileageRef}
                                    size={String(car.mileage).length}
                                    defaultValue={car.mileage}/>
                                </label>
                                <label className='car--data car--data-edit'>Date of introduction: <input
                                    type='date'
                                    min='1970-01-01'
                                    max={createToday()}
                                    ref={dateOfIntroductionRef}
                                    size={String(car.dateOfIntroduction).length}
                                    defaultValue={car.dateOfIntroduction.split('.').reverse().join('-')}
                                />
                                </label>
                            </form>}
                        </div>
                        <div className='car'>
                            <div className='car--title'>
                                <h2>Information</h2>
                            </div>
                            <p className='car--data'>Creation: <span className='car--item'>{car.creationDate}</span></p>
                            <p className='car--data'>Actualisation: <span className='car--item'>{car.actualisationDate}</span></p>
                        </div>
                    </div>
                    {!car.isEdit && <div className='controls__button'>
                        <button className='controls__button--edit' id={car.id} onClick={carIsEdit}>Edit</button>
                        <button className='controls__button--remove' id={car.id} onClick={removeCarHandler}>Remove
                        </button>
                    </div>}
                    {car.isEdit && <div className='controls__button'>
                        <button className='controls__button--cancel' id={car.id} onClick={carHideEdit}>Cancel</button>
                        <button className='controls__button--confirm' id={car.id} onClick={editCarHandler}>Confirm</button>
                    </div>}
                </div>
            );
        })
    );
};

export default CarItem;