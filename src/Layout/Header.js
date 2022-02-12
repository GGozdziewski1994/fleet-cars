import './Header.scss';
import AuthContext from "../context/auth-contex";
import { useContext } from "react";

const Header = () => {
    const authContext = useContext(AuthContext);

    return(
        <header className='header'>
            <div className='logo'>
                <h2 className='logo--title'>Car fleet</h2>
            </div>
            <div className='logout'>
                {authContext.isLoggedIn && <button onClick={authContext.logout} className='logout--button'>Logout</button>}
            </div>
        </header>
    );
};

export default Header;