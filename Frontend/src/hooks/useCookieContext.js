import { useContext } from 'react'
import { CookieContext } from '../context/cookie.context'

export const useCookieContext = () => {
    const context = useContext(CookieContext);

    if (!context) {
        throw Error('useCookieContext must be used in a CookieContextProvider')
    }

    return context
}