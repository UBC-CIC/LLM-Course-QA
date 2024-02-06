import { createContext, useReducer, useEffect } from 'react'
import { useCookie } from '../hooks/useCookie'
import { useAuthContext } from '../hooks/useAuthContext'

export const CookieContext = createContext()

export const cookieReducer = (state, action) => {
    switch (action.type) {
        case 'GET_COOKIE':
            return {
                user: action.payload.user,
                token: action.payload.accessToken
            }
        case 'DELETE_COOKIE':
            return {
                user: null,
                token: null
            }
        default:
            return state
    }
}

export const CookieContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cookieReducer, {
        user: null,
        token: null
    })

    const { cookie } = useCookie()

    const { user, dispatch: authDispatch } = useAuthContext()
    
    useEffect(() => {
        console.log(user)
        cookie().then(res => {
            if (res) {
                dispatch({
                    type: 'GET_COOKIE',
                    payload: res
                })
                authDispatch({
                    type: 'LOGIN',
                    payload: res.user
                })
            }
        })
    }, [])

    return (
        <CookieContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CookieContext.Provider>
    )
}