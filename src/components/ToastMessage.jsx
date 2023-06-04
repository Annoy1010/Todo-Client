import { ToastContainer } from 'react-toastify';

const ToastMessage = () => {

    return <ToastContainer 
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
    />
}

export default ToastMessage;