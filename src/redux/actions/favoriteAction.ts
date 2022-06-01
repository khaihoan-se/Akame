export const addFavorite = (data: any) => {
    return {
        type: 'ADD_FAVORITE',
        payload: data
    };

}

export const removeFavorite = (data: any) => {
    return {
        type: 'REMOVE_FAVORITE',
        payload: data
    };
}