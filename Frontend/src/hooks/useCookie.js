export const useCookie = () => {

    const cookie = async () => {

        const response = fetch('http://localhost:4000/api/user/cookie', {
            method: 'GET',
            'credentials': 'include'
        })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log(error)
        })

        return response

    } 

    return { cookie }
}