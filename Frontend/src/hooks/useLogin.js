import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        const response = await fetch('http://127.0.0.1:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password}),
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            // dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
            setError('')
            console.log(localStorage.getItem('user'))
            console.log((json))
        }

    } 

    return { login, error, isLoading }
}