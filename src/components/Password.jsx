import { useState } from 'react';
import { Alert } from './index.js';
import utils from '../assets/utils/utils.js';
import '../assets/style/Password.css';

const Password = () => {
	// State variables
	const [passwordParams, setPasswordParams] = useState({
		passwordLength: 8,
		includeUppercase: true,
		includeLowercase: true,
		includeNumbers: true,
		includeSymbols: true,
		excludeSimilarCharacters: true,
		includeEveryCharacter: false
	});
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // specialCharacters will include these characters: !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
    // Set a range of Unicode values for the special characters
    const specialCharacters = Array.from({ length: 30 }, (_, i) => i + 33); // Basic Latin special characters

    // Set a range of Unicode values for the lowercase letters
    const lowercase = Array.from({ length: 26 }, (_, i) => i + 97); // Basic Latin lowercase letters

    // Set a range of Unicode values for the uppercase letters
    const uppercase = Array.from({ length: 26 }, (_, i) => i + 65); // Basic Latin uppercase letters

    // Set a range of Unicode values for the numbers
    const numbers = Array.from({ length: 10 }, (_, i) => i + 48); // Basic Latin numbers

    // Set a range of Unicode values for the similar characters
    const similarCharacters = [48, 79, 73, 108, 124]; // 0, O, I, l, |

    // Set a range of Unicode values for every character
    const everyCharacter = Array.from({ length: 1114111 - 33 }, (_, i) => i + 33); // All printable Unicode characters

    // Function to generate a random password
    const generateRandomPassword = () => {
        let characterSets = [];

        // Include selected character sets based on options
        if (passwordParams.includeUppercase) {
            characterSets.push(uppercase);
        }
        if (passwordParams.includeLowercase) {
            characterSets.push(lowercase);
        }
        if (passwordParams.includeNumbers) {
            characterSets.push(numbers);
        }
        if (passwordParams.includeSymbols) {
            characterSets.push(specialCharacters);
        }
        if (passwordParams.includeEveryCharacter) {
            characterSets = [everyCharacter];
        }
        
        // Merge selected character sets into one array
        let allCharacters = [].concat(...characterSets);

        // Remove similar characters if option is selected
        if (passwordParams.excludeSimilarCharacters) {
            // use a filter function to remove similar characters
            allCharacters = allCharacters.filter(character => !similarCharacters.includes(character));
        }

        let password = '';

        // Generate the password
        for (let i = 0; i < passwordParams.passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * allCharacters.length);
            password += String.fromCharCode(allCharacters[randomIndex]);
        }

        setGeneratedPassword(password);
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to copy the generated password to the clipboard
    const copyPasswordToClipboard = () => {
        // code to copy the password to the clipboard
        navigator.clipboard.writeText(generatedPassword);
        // set the alert message
        setAlertMessage('Password copied to clipboard!');
        utils.showAlert();
    };

    return (
        <div className="password">
            <form>
                <label>
                    Length
                    <input type="number" min="1" max="128" id="passwordLength" value={passwordParams.passwordLength} onChange={e => setPasswordParams({ ...passwordParams, passwordLength: e.target.value })} />
                </label>
                <label>
                    Include Uppercase
                    <input type="checkbox" id="includeUppercase" checked={passwordParams.includeUppercase} onChange={e => setPasswordParams({ ...passwordParams, includeUppercase: e.target.checked })} />
                </label>
                <label>
                    Include Lowercase
                    <input type="checkbox" id="includeLowercase" checked={passwordParams.includeLowercase} onChange={e => setPasswordParams({ ...passwordParams, includeLowercase: e.target.checked })} />
                </label>
                <label>
                    Include Numbers
                    <input type="checkbox" id="includeNumbers" checked={passwordParams.includeNumbers} onChange={e => setPasswordParams({ ...passwordParams, includeNumbers: e.target.checked })} />
                </label>
                <label>
                    Include Special Characters
                    <input type="checkbox" id="includeSymbols" checked={passwordParams.includeSymbols} onChange={e => setPasswordParams({ ...passwordParams, includeSymbols: e.target.checked })} />
                </label>
                <label>
                    Exclude Similar Characters
                    <input type="checkbox" id="excludeSimilarCharacters" checked={passwordParams.excludeSimilarCharacters} onChange={e => setPasswordParams({ ...passwordParams, excludeSimilarCharacters: e.target.checked })} />
                </label>
                <label>
                    Include Every Character (Experimental)
                    <input type="checkbox" id="includeEveryCharacter" checked={passwordParams.includeEveryCharacter} onChange={e => setPasswordParams({ ...passwordParams, includeEveryCharacter: e.target.checked })} />
                </label>
                <label>
                    Generate Password
                    <button onClick={(e)=>{e.preventDefault(); generateRandomPassword()}}>Generate Password</button>
                </label>
                <label>
                    Password
                    <input type={showPassword ? 'text' : 'password'} value={generatedPassword} readOnly />
                </label>
                <label>
                    Show Password
                    <input type="checkbox" onChange={togglePasswordVisibility} />
                </label>
                <label>
                    Copy
                    <button onClick={(e)=>{e.preventDefault(); copyPasswordToClipboard()}}>Copy</button>
                </label>
            </form>
            <Alert message={alertMessage} />
        </div>
    );
};

export default Password;