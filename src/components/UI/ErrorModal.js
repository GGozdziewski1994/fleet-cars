import Modal from "./Modal";
import Backdrop from "./Backdrop";
import './ErrorModal.scss';

const ErrorModal = props => {
    return(
        <section>
            <Backdrop onClick={props.onClean}/>
            <Modal>
                <h2 className='title--error'>Error</h2>
                <p className='children--error'>{props.children}</p>
                <div className='actions--error'>
                    <button onClick={props.onClean}>OK</button>
                </div>
            </Modal>
        </section>
    );
};

export default ErrorModal;