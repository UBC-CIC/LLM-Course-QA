import { useState } from 'react'

export const useLogin = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // const { dispatch } = useAuthContext()

    const login = async (username: string, password: string) => {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password }),
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