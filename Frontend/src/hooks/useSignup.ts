import { useState } from 'react'

export const useSignup = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const signup = async (name: string, username: string, password: string, role: string) => {
        setIsLoading(true)

        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users/register`, {
            method: 'POST',
            body: JSON.stringify({ name, username, password, role }),
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
            setIsLoading(false)
            setError('')
        }

    }

    return { signup, error, isLoading }
}