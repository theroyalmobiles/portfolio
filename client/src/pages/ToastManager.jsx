import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Optional utility to use outside React components
export const showToast = (msg, type = "success") => {
    if (type === "success") toast.success(msg, { position: "top-right", autoClose: 2000 });
    else toast.error(msg, { position: "top-right", autoClose: 2000 });
};

// Place this component once in your App.jsx or Layout
const ToastManager = () => {
    return <ToastContainer />;
};

export default ToastManager;
