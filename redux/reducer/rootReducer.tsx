import {combineReducers} from "redux"
import {authReducer} from "./authReducer"
import {alertReducer} from "./alertReducer"
import {loadReducer} from "./loadReducer"
import {registerReducer} from "./registerReducer"
import {itemsReducer} from "./itemsReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    load: loadReducer,
    register: registerReducer,
    items: itemsReducer
})