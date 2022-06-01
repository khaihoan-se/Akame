// reducers/hobby.js
const initialState = {
    listFavorite: [],
};
const listFavorite = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_FAVORITE': {
            const newList = [...state.listFavorite, action.payload];
            return {
                ...state,
                listFavorite: newList,
            }
        }
        default:
        return state;
    }
};
export default listFavorite;