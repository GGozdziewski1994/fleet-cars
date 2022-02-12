import './AuthForm.scss';
import { regEmail, regFullName, regPassword } from "./regExp";
import ErrorModal from "../UI/ErrorModal";
import {Fragment, useContext, useEffect, useState} from "react";
import useForm from "../../hooks/use-form";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../context/auth-contex";
import token from "./token";
import { POST } from '../../constants/methodsConstants';
const LOGIN = process.env.REACT_APP_LOGIN;
const SIGN_UP = process.env.REACT_APP_SIGN_UP;

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const authContext = useContext(AuthContext);
    const { isLoading, sendRequest, data, error, cleanError } =useHttp();

    const {
        value: enteredFullName,
        isValid: enteredFullNameIsValid,
        hasError: fullNameInputHasError,
        valueChangeHandler: fullNameChangeHandler,
        valueBlurHandler: fullNameBlurHandler,
        reset: resetFullNameInput
    } = useForm(value => regFullName.test(value));

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        valueBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useForm(value => regEmail.test(value));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        valueBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useForm(value => regPassword.test(value));

    useEffect(async () => {
        if(data) await authContext.login(data.token, enteredEmail);
    }, [data, authContext, enteredEmail]);

    const switchAuthModalHandler = () => {
        setIsLogin(prevState => !prevState);
        resetInput();
    };

    const resetInput = () => {
        resetFullNameInput();
        resetEmailInput();
        resetPasswordInput();
    };

    const submitHandler = async event => {
        event.preventDefault();

        let url;
        let body;
        if(isLogin) {
            url = LOGIN;
            body = {
                email: enteredEmail,
                password: enteredPassword,
            }
        } else {
            url = SIGN_UP;
            const createToken = token();
            body = {
                fullName: enteredFullName,
                email: enteredEmail,
                password: enteredPassword,
                token: createToken
            }
        }
        await sendRequest(url, POST, body);

        resetInput();
    };

    let formIsValid = false;
    if(isLogin && enteredEmailIsValid && enteredPasswordIsValid) formIsValid = true;
    if(!isLogin && enteredFullNameIsValid && enteredEmailIsValid && enteredPasswordIsValid) formIsValid = true;

    const classNameFullName = fullNameInputHasError ? 'control--input invalid-auth' : 'control--input';
    const classNameEmail = emailInputHasError ? 'control--input invalid-auth' : 'control--input';
    const classNamePassword = passwordInputHasError ? 'control--input invalid-auth' : 'control--input';

    return(
        <Fragment>
            {error && <ErrorModal onClean={cleanError}>{error}</ErrorModal>}
            <section className='form'>
                <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                <form onSubmit={submitHandler}>
                    {!isLogin && <div className='control'>
                        <label className='control--label' htmlFor='name'>Full Name</label>
                        <input
                            className={classNameFullName}
                            type='text'
                            id='name'
                            required
                            onChange={fullNameChangeHandler}
                            onBlur={fullNameBlurHandler}
                            value={enteredFullName}
                        />
                        {fullNameInputHasError && <p className='error--text-auth'>Enter full name</p>}
                    </div>}
                    <div className='control'>
                        <label className='control--label' htmlFor='email'>Email</label>
                        <input
                            className={classNameEmail}
                            type='email'
                            id='email'
                            maxLength='255'
                            required
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            value={enteredEmail}
                        />
                        {emailInputHasError && <p className='error--text-auth'>Enter email e.g. example@gmail.com</p>}
                    </div>
                    <div className='control'>
                        <label className='control--label' htmlFor='password'>Password</label>
                        <input
                            className={classNamePassword}
                            type='password'
                            id='password'
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            value={enteredPassword}
                        />
                        {passwordInputHasError && <p className='error--text-auth'>Password must contain at least 6 characters, including a number and a special character</p>}
                    </div>
                    <div className='actions'>
                        {!isLoading && <button disabled={!formIsValid} className='actions--request'>{isLogin ? 'Login' : 'Create Account'}</button>}
                        {isLoading && <p>{isLogin ? '...Requesting login' : '...Requesting new account'}</p>}
                        <button type='button' onClick={switchAuthModalHandler} className='actions--toggle'>{isLogin ? 'Create new Account' : 'Login with existing account'}</button>
                    </div>
                </form>
            </section>
        </Fragment>
    );
};

export default AuthForm;