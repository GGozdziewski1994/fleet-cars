import {EDIT, HIDE_EDIT, IS_EDIT, REMOVE, RENDER} from "../../constants/reducerCarsConstants";

const reducerCars = (state, action) => {
    const findIndex = state.findIndex(car => car.id === action.id);
    const updateCar = [...state];
    switch (action.type){
        case REMOVE: {
            action.remove(action.id);
            return state.filter(car => car.id !== action.id);
        }
        case IS_EDIT: {
            updateCar[findIndex].isEdit = true;
            return [...updateCar]
        }
        case HIDE_EDIT: {
            updateCar[findIndex].isEdit = false;
            return [...updateCar]
        }
        case EDIT: {
            updateCar[findIndex] = {
                ...state[findIndex],
                isEdit: false,
                brand: action.brand,
                model: action.model,
                year: action.year,
                mileage: action.mileage,
                dateOfIntroduction: action.dateOfIntroduction,
            }
            action.update(action.id, updateCar[findIndex]);
            return [...updateCar]
        }
        case RENDER: return [...action.cars]
        default: return [...state]
    }
};

export default reducerCars;