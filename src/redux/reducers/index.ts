import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listFavorite from "./listFavorite";

const rootReducer = combineReducers({
    user: userReducer,
    favorite: listFavorite,
})

export default rootReducer;