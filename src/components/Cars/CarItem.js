import './CarItem.scss';
import { useRef, useCallback, useState} from "react";
import useHttp from "../../hooks/use-http";
import { createToday, createYear } from "./date/createDate";
import { PUT, DELETE } from '../../constants/methodsConstants';
import { REMOVE, EDIT } from '../../constants/reducerCarsConstants';
const UPDATE_CAR = process.env.REACT_APP_UPDATE_CAR;
const DELETE_CAR = process.env.REACT_APP_DELETE_CAR;

const CarItem = props => {
    const [isEdit, setIsEdit] = useState(false);
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
        props.onDispatchCars({type: EDIT, id: +id, updateCar});
    }, [props, sendRequest]);

    const deleteCar = useCallback(async id => {
        await sendRequest(DELETE_CAR + '/' + id, DELETE);
        props.onDispatchCars({type: REMOVE, id: +id});
    }, [props, sendRequest]);

    const removeCarHandler = () => {
        deleteCar(props.id);
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

        updateCar(props.id, {
            brand: brandRef.current.value,
            model: modelRef.current.value,
            year: enteredYear,
            mileage: enteredMileage,
            dateOfIntroduction: dateOfIntroductionRef.current.value,
        });

        setIsEdit(false);
    };

    const carIsEdit = () => {
        setIsEdit(true);
    }

    const carHideEdit = () => {
        setIsEdit(false);
    };

    const classNameYearError = animationYear ? 'animation--error' : '';
    const classNameMileageError = animationMileage ? 'animation--error' : '';

    return(
        <div className='container'>
            <div>
                <div className='car'>
                    <div className='car--title'>
                        <h2>Car data</h2>
                    </div>
                    {!isEdit && <div>
                        <p className='car--data'>Brand: <span className='car--item'>{props.brand}</span></p>
                        <p className='car--data'>Model: <span className='car--item'>{props.model}</span></p>
                        <p className='car--data'>Year: <span className='car--item'>{props.year}</span></p>
                        <p className='car--data'>Car mileage: <span className='car--item'>{props.mileage} km</span></p>
                        <p className='car--data'>Date of introduction: <span className='car--item'>{props.dateOfIntroduction}</span></p>
                    </div>}
                    {isEdit && <form>
                        <label className='car--data car--data-edit'>Brand: <input
                            ref={brandRef}
                            type='text'
                            size={props.brand.length}
                            defaultValue={props.brand}/>
                        </label>
                        <label className='car--data car--data-edit'>Model:<input
                            ref={modelRef}
                            type='text'
                            size={props.model.length}
                            defaultValue={props.model}/>
                        </label>
                        <label className='car--data car--data-edit'>Year: <input
                            className={classNameYearError}
                            ref={yearRef}
                            type='number'
                            min='1900'
                            max={`${createYear()}`}
                            size={String(props.year).length}
                            defaultValue={props.year}/>
                        </label>
                        <label className='car--data car--data-edit'>Car mileage: <input
                            className={classNameMileageError}
                            ref={mileageRef}
                            size={String(props.mileage).length}
                            defaultValue={props.mileage}/>
                        </label>
                        <label className='car--data car--data-edit'>Date of introduction: <input
                            type='date'
                            min='1970-01-01'
                            max={createToday()}
                            ref={dateOfIntroductionRef}
                            size={String(props.dateOfIntroduction).length}
                            defaultValue={props.dateOfIntroduction.split('.').reverse().join('-')}
                        />
                        </label>
                    </form>}
                </div>
                <div className='car'>
                    <div className='car--title'>
                        <h2>Information</h2>
                    </div>
                    <p className='car--data'>Creation: <span className='car--item'>{props.creationDate}</span></p>
                    <p className='car--data'>Actualisation: <span className='car--item'>{props.actualisationDate}</span></p>
                </div>
            </div>
            {!isEdit && <div className='controls__button'>
                <button className='controls__button--edit' onClick={carIsEdit}>Edit</button>
                <button className='controls__button--remove' onClick={removeCarHandler}>Remove</button>
            </div>}
            {isEdit && <div className='controls__button'>
                <button className='controls__button--cancel' onClick={carHideEdit}>Cancel</button>
                <button className='controls__button--confirm' onClick={editCarHandler}>Confirm</button>
            </div>}
        </div>
    );
};

export default CarItem;