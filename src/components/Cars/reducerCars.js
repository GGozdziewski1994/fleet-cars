import {EDIT, REMOVE, RENDER} from "../../constants/reducerCarsConstants";

const reducerCars = (state, action) => {
    const findIndex = state.findIndex(car => car.id === action.id);
    const updateCar = [...state];
    switch (action.type){
        case REMOVE: {
            return state.filter(car => car.id !== action.id);
        }
        case EDIT: {
            updateCar[findIndex] = {...state[findIndex], ...action.updateCar};
            return [...updateCar]
        }
        case RENDER: return [...action.cars]
        default: return [...state]
    }
};

export default reducerCars;