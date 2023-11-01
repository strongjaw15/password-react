// instantiate a new object
const utils = {
    // show alert
    showAlert: async function (duration = 3000) {
        // get the fade out duration from the css variable and convert the duration to milliseconds from seconds and remove the 's' from the end
        const fadeOutDuration = getComputedStyle(document.documentElement).getPropertyValue('--fade-out-duration').trim().slice(0, -1) * 1000;
        const fadeInDuration = getComputedStyle(document.documentElement).getPropertyValue('--fade-in-duration').trim().slice(0, -1) * 1000;
        // duration has to be at least equal to the sum of fadeIn and fadeOut
        duration = Math.max(duration, fadeInDuration + fadeOutDuration);
        // get the alert element by class alert
        const alert = document.getElementsByClassName('alert')[0];
        // remove the initially hidden class if it exists
        alert.classList.remove('hidden');
        // remove the fade-out class if it exists
        alert.classList.remove('fade-out');
        // add the fade-in class
        alert.classList.add('fade-in');
        // wait for the fade-in to finish
        await new Promise(resolve => setTimeout(resolve, fadeInDuration));
        // wait for the duration minus fade-in and fade-out
        await new Promise(resolve => setTimeout(resolve, duration - fadeInDuration - fadeOutDuration));
        // remove the fade-in class
        alert.classList.remove('fade-in');
        // add the fade-out class
        alert.classList.add('fade-out');
        // wait for the fade-out to finish
        await new Promise(resolve => setTimeout(resolve, fadeOutDuration));
        // add the hidden class
        alert.classList.add('hidden');
    },
};

// export the object
export default utils;