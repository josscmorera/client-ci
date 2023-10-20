import { setHeaderToken } from "./setHeaderToken"

export const checkAuthToken = () => {
    let token = localStorage.getItem('clientToken')
    if (token) {
        // set auth headers
        setHeaderToken(token)
        return true
    } else {
        // delete headers
        setHeaderToken()
        return false
    }
}