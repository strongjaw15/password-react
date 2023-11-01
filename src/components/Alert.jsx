import '../assets/style/Alert.css';

const Alert = ({ message }) => {
    return (
        <div className="alert hidden">
            <h4>{message}</h4>
        </div>
    );
};

export default Alert;