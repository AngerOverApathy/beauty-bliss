import { useState, SyntheticEvent } from 'react';
import { UserErrors } from '../../errors';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export const AuthPage = () => {
    return (
        <div className='auth'>
            <Register />
            <Login />
        </div>
    )
}

const Register = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [_, setCookies] = useCookies(['access_token'])

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        try {
            const result = await axios.post('http://localhost:3001/user/login', {
                username, 
                password
            })
            setCookies('access_token', result.data.access_token)
            localStorage.setItem('userID', result.data.userID)
        } catch (err) {

            let errorMessage: string = ''
            switch (err?.response?.data?.type) {
                case UserErrors.NO_USER_FOUND:
                    errorMessage = 'ERROR: Username not found'
                    break
                case UserErrors.WRONG_CREDENTIALS:
                    errorMessage = 'ERROR: Incorrect password/username'
                    break
                default:
                    errorMessage = 'ERROR: Something went wrong'
            }
            alert(errorMessage)
        }

    }

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