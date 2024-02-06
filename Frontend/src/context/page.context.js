import { createContext, useReducer, useEffect } from 'react';

export const PageContext = createContext()

export const pageReducer = (state, action) => {
    switch (action.type) {
        case 'INBOX':
            localStorage.setItem('page', 'INBOX')
            return {
                page: 'inbox'
            }
        case 'SENT':
            localStorage.setItem('page', 'SENT')
            return {
                page: 'sent'
            }
        case 'STARRED':
            localStorage.setItem('page', 'STARRED')
            return {
                page: 'starred'
            }
        case 'DRAFTS':
            localStorage.setItem('page', 'DRAFTS')
            return {
                page: 'drafts'
            }
        case 'SPAM':
            localStorage.setItem('page', 'SPAM')
            return {
                page: 'spam'
            }
        case 'BIN':
            localStorage.setItem('page', 'BIN')
            return {
                page: 'bin'
            }
        default:
            return state
    }
}

export const PageContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pageReducer, {
        page: 'inbox'
    })

    useEffect(() => {
        const page = (localStorage.getItem('page'))

        if (page) {
            dispatch({ type: (page) })
        } else {
            localStorage.setItem('page', state.page.toUpperCase())
        }

    }, [])

    return (
        <PageContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PageContext.Provider>
    )

}