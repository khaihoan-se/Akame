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
        case 'REMOVE_FAVORITE': {
            // const newList = state.listFavorite.filter((item: any) => item.id !== action.payload.id);
            return {
                ...state,
                listFavorite: state.listFavorite.filter((item: any) => item.id !== action.payload)
            }
        }
        default:
        return state;
    }
};
export default listFavorite;