import { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { UserErrors } from '../../errors';

export const AuthPage = () => {
    return (
        <div className='auth'>
            <Register />
            <Login />
        </div>
    )
}

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        try {
            await axios.post('http://localhost:3001/user/register', {
                username, 
                password
            })
            alert('User registered, now login!')
        } catch (err) {
            if (err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
                alert('ERROR: Username already exists')
            } else {
                alert('ERROR: Something went wrong')
            }
        }

    }

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

const Login = () => {
    return (
        <div>Login</div>
    )
}