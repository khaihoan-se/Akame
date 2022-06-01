// reducers/hobby.js
const initialState = {
    listUser: [],
};
const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'GET_USER': {
            // const newList = [...state.listUser, action.payload];
            const newList = [...state.listUser, action.payload];

            // newList.push(action.payload);
            return {
                ...state,
                listUser: newList,
            }
        }
        case 'REMOVE_USER': {
            const newList = ''

            return {
                ...state,
                listUser: newList,
            }
        }
        default:
        return state;
    }
};
export default userReducer;