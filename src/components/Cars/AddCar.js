import './AddCar.scss';
import Backdrop from "../UI/Backdrop";
import Modal from "../UI/Modal";
import { createYear, createToday } from "./date/createDate";
import useForm from "../../hooks/use-form";

const AddCar = props => {
    const {
        value: enteredBrand,
        isValid: enteredBrandIsValid,
        hasError: brandInputHasError,
        valueChangeHandler: brandChangeHandler,
        valueBlurHandler: brandBlurHandler,
        reset: resetBrandInput
    } = useForm(value => value.trim() !== '');

    const {
        value: enteredModel,
        isValid: enteredModelIsValid,
        hasError: modelInputHasError,
        valueChangeHandler: modelChangeHandler,
        valueBlurHandler: modelBlurHandler,
        reset: resetModelInput
    } = useForm(value => value.trim() !== '');

    const {
        value: enteredYear,
        isValid: enteredYearIsValid,
        hasError: yearInputHasError,
        valueChangeHandler: yearChangeHandler,
        valueBlurHandler: yearBlurHandler,
        reset: resetYearInput
    } = useForm(value => value >= '1900' && value <= `${createYear()}`);

    const {
        value: enteredDate,
        isValid: enteredDateIsValid,
        hasError: dateInputHasError,
        valueChangeHandler: dateChangeHandler,
        valueBlurHandler: dateBlurHandler,
        reset: resetDateInput
    } = useForm(value => value);

    const {
        value: enteredMileage,
        isValid: enteredMileageIsValid,
        hasError: mileageInputHasError,
        valueChangeHandler: mileageChangeHandler,
        valueBlurHandler: mileageBlurHandler,
        reset: resetMileageInput
    } = useForm(value => Number(value) >= 0);

    const submitHandler = event => {
        event.preventDefault();

        const newCar = {
            brand: enteredBrand,
            model: enteredModel,
            year: enteredYear,
            mileage: enteredMileage,
            dateOfIntroduction: enteredDate,
            isEdit: false,
        };

        props.onAdd(newCar);
        props.onCancel();

        resetBrandInput()
        resetModelInput()
        resetYearInput()
        resetDateInput()
        resetMileageInput()
    };

    let formIsValid = false;
    if(enteredBrandIsValid && enteredModelIsValid && enteredYearIsValid && enteredDateIsValid && enteredMileageIsValid) formIsValid = true;

    const classNameBrand = brandInputHasError ? 'modal__control--input invalid' : 'modal__control--input';
    const classNameModel = modelInputHasError ? 'modal__control--input invalid' : 'modal__control--input';
    const classNameYear = yearInputHasError ? 'modal__control--input invalid' : 'modal__control--input';
    const classNameDate = dateInputHasError ? 'modal__control--input invalid' : 'modal__control--input';
    const classNameMileage = mileageInputHasError ? 'modal__control--input invalid' : 'modal__control--input';

    return(
        <section>
            <Backdrop onClick={props.onCancel} />
            <Modal className='modal'>
                <h2 className='modal--title'>Add new Car</h2>
                <form onSubmit={submitHandler}>
                    <div className='modal__control'>
                        <label className='modal__control--label'>Brand</label>
                        <input
                            className={classNameBrand}
                            type='text'
                            id='brand'
                            onChange={brandChangeHandler}
                            onBlur={brandBlurHandler}
                            value={enteredBrand}
                        />
                        {brandInputHasError && <p className='error-text'>Brand cannot be empty</p>}
                    </div>
                    <div className='modal__control'>
                        <label className='modal__control--label'>Model</label>
                        <input
                            className={classNameModel}
                            type='text'
                            id='model'
                            onChange={modelChangeHandler}
                            onBlur={modelBlurHandler}
                            value={enteredModel}
                        />
                        {modelInputHasError && <p className='error-text'>Model cannot be empty</p>}
                    </div>
                    <div className='modal__control'>
                        <label className='modal__control--label'>Year</label>
                        <input
                            className={classNameYear}
                            type='number'
                            id='year'
                            min='1900'
                            max={`${createYear()}`}
                            onChange={yearChangeHandler}
                            onBlur={yearBlurHandler}
                            value={enteredYear}
                        />
                        {yearInputHasError && <p className='error-text'>Year cannot be less than 1900 and greater than {createYear()}</p>}
                    </div>
                    <div className='modal__control'>
                        <label className='modal__control--label'>Date of introduction</label>
                        <input
                            className={classNameDate}
                            type='date'
                            min='1970-01-01'
                            max={createToday()}
                            id='data-introduction'
                            onChange={dateChangeHandler}
                            onBlur={dateBlurHandler}
                            value={enteredDate}
                        />
                        {dateInputHasError && <p className='error-text'>Date cannot be less than 1900-01-01 and greater than {createToday()}</p>}
                    </div>
                    <div className='modal__control'>
                        <label className='modal__control--label'>Car mileage</label>
                        <input
                            className={classNameMileage}
                            type='number'
                            id='car-mileage'
                            min='0'
                            onChange={mileageChangeHandler}
                            onBlur={mileageBlurHandler}
                            value={enteredMileage}
                        />
                        {mileageInputHasError && <p className='error-text'>Mileage must not be less than zero</p>}
                    </div>
                    <div className='modal__actions'>
                        <button type='button' onClick={props.onCancel} className='modal__actions--button'>Cancel</button>
                        <button disabled={!formIsValid} className='modal__actions--button'>Add</button>
                    </div>
                </form>
            </Modal>
        </section>
    );
};

export default AddCar;