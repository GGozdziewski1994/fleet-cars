import React, { useState } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    login: token => {},
    logout: () => {},
});

const getAuthFormLocalStorage = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return {
        token,
        user
    };
};

export const AuthContextProvider = props => {
    const authFormLocalStorage = getAuthFormLocalStorage();
    const initialAuthState = {
        token: '',
        user: '',
    };

    if(authFormLocalStorage) {
        initialAuthState.token = authFormLocalStorage.token;
        initialAuthState.user = authFormLocalStorage.user;
    }
    const [token, setToken] = useState(initialAuthState.token);

    const userIsLoggedIn = !!token;

    const loginHandler = (token, emailUser) => {
        setToken(token);
        localStorage.setItem('token', token);

        localStorage.setItem('user', emailUser);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');

        localStorage.removeItem('user');
    };

    const contextValue = {
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;