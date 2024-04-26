import { useState } from 'react'
import userpool from '@/lib/userpool';
import { AuthenticationDetails, CognitoUser, ISignUpResult, CognitoUserAttribute } from 'amazon-cognito-identity-js';

export const useLogin = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // const { dispatch } = useAuthContext()

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        const user = new CognitoUser({
            Username: email,
            Pool: userpool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        try {
            const result = await new Promise((resolve, reject) => {
                user.authenticateUser(authDetails, {
                    onSuccess: (result) => {
                        resolve(result);
                    },
                    onFailure: (err) => {
                        reject(err);
                    }
                });
            });

            if (result) {
                console.log('Login success:', result);
                setIsLoading(false)
                setError('')
            }
        }
        catch (error) {
            console.error('Signup failed:', error);
        }
    }

    return { login, error, isLoading }
}