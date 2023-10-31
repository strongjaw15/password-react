// instantiate a new object
const utils = {
    // show alert
    showAlert: function (message) {
        const alert = document.createElement('div');
        alert.classList.add('alert');
        alert.innerText = message;
        document.body.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 2000);
    },
};

// export the object
export default utils;