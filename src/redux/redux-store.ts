import {createStore, combineReducers} from "redux";
import {itemsReducer} from "./items-reducer";

let reducersObject = {
    items: itemsReducer
}

let reducers = combineReducers(reducersObject);
export const store = createStore(reducers);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch