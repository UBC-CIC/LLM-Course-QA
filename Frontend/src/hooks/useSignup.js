import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {

        setIsLoading(true)

        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            setError('')
        }

    } 

    return { signup, error, isLoading }
}