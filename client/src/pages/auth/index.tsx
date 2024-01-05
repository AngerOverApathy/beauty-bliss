import { useState, SyntheticEvent } from 'react';
import { UserErrors } from '../../errors'; // Custom error types
import { useCookies } from 'react-cookie'; // Hook for managing cookies
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import axios from 'axios'; // Axios for HTTP requests

// AuthPage Component: A wrapper component that renders both Register and Login components.
export const AuthPage = () => {
    return (
        <div className='auth'>
            <Register />
            <Login />
        </div>
    )
}

// Register Component: Manages the registration of new users.
const Register = () => {
    // useState hooks to manage state for username and password.
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Function to handle the registration form submission.
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault(); // Prevents the default form submit action.
        try {
            // Sends a POST request to register a new user with entered username and password.
            await axios.post('http://localhost:3001/user/register', { username, password });
            alert('User registered, now login!');
        } catch (err) {
            // Error handling based on the custom error types defined in UserErrors.
            if (err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
                alert('ERROR: Username already exists');
            } else {
                alert('ERROR: Something went wrong');
            }
        }
    }

    // Rendering the registration form with input fields for username and password.
    return (
        <div className='auth-container'>
            <form>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div> 
                <button type='submit' onClick={handleSubmit}>Register</button>   
            </form>
        </div>
    )
}

// Login Component: Manages the login functionality for existing users.
const Login = () => {
    // useState hooks to manage state for username and password.
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // useCookies hook to manage cookies; specifically, the access token.
    const [_, setCookies] = useCookies(['access_token']);

    // useNavigate hook for redirecting the user after successful login.
    const navigate = useNavigate();

    // Function to handle the login form submission.
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault(); // Prevents the default form submit action.
        try {
            // Sends a POST request to login the user with entered username and password.
            const result = await axios.post('http://localhost:3001/user/login', { username, password });
            // Setting the access token in cookies and userID in local storage.
            setCookies('access_token', result.data.access_token);
            localStorage.setItem('userID', result.data.userID);
            // Redirecting to the home page after successful login.
            navigate('/');
        } catch (err) {
            // Custom error handling based on the response type.
            let errorMessage: string = '';
            switch (err?.response?.data?.type) {
                case UserErrors.NO_USER_FOUND:
                    errorMessage = 'ERROR: Username not found';
                    break;
                case UserErrors.WRONG_CREDENTIALS:
                    errorMessage = 'ERROR: Incorrect password/username';
                    break;
                default:
                    errorMessage = 'ERROR: Something went wrong';
            }
            alert(errorMessage);
        }
    }

    // Rendering the login form with input fields for username and password.
    return (
        <div className='auth-container'>
            <form>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div> 
                <button type='submit' onClick={handleSubmit}>Login</button>   
            </form>
        </div>
    )
}
