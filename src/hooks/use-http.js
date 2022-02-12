import { useReducer, useCallback } from "react"
import { SEND, FETCH, CLEAR, ERROR } from '../constants/reducerHttpConstants';
import { PUT, POST } from '../constants/methodsConstants';
const LOGIN = process.env.REACT_APP_LOGIN;
const SIGN_UP = process.env.REACT_APP_SIGN_UP;

const initialState = {
    cars: [],
    loading: false,
    error: null,
}

const httpReducer = (state, action) => {
    if(action.type === SEND) {
        return {loading: true, error: null, data: null}
    }

    if(action.type === FETCH) {
        return {...state, data: action.data, loading: false}
    }

    if(action.type === ERROR) {
        return {...state, error: action.error, loading: false}
    }

    if(action.type === CLEAR) {
        return {...state, error: null, loading: false}
    }

    return {...state}
}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const cleanError = useCallback(() => dispatchHttp({type: CLEAR}, []));

    const sendRequest = useCallback(async (url, method, body, addCar) => {
        dispatchHttp({type: SEND});

        let dataBody;
        if(method === POST || method === PUT)
            dataBody = {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        else dataBody = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const response = await fetch(url, dataBody);
            if(!response.ok && (LOGIN || SIGN_UP)) throw Error('Wrong Email or Password!');
            if(!response.ok) throw new Error('Something went wrong!');

            if(!addCar) {
                const data = await response.json();

                dispatchHttp({type: FETCH, data: data});
            }
        } catch(error) {
            dispatchHttp({type: ERROR, error: error.message});
        }
    }, []);

    return {
        isLoading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        sendRequest,
        cleanError,
    }
};

export default useHttp;