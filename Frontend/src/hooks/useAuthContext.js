import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('useAuthContext must be used in a AuthContextProvider')
    }

    return context
}