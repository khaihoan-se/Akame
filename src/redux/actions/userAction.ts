export const getUser = (user: any) => {
    return {
        type: 'GET_USER',
        payload: user
    };

}
export const removeUser = (user: any) => {
    return {
        type: 'REMOVE_USER',
        payload: user
    }
}