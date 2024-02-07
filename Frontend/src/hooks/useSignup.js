import { useState } from 'react'

export const useSignup = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const signup = async (name, username, password, role) => {

        setIsLoading(true)

        const response = await fetch('http://127.0.0.1:5000/users/register', {
            method: 'POST',
            body: JSON.stringify({name, username, password, role}),
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
            // localStorage.setItem('user', JSON.stringify(json))
            setIsLoading(false)
            setError('')
        }

    } 

    return { signup, error, isLoading }
}