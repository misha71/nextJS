import {
    ADD_ITEMS,
    DELETE_ITEMS,
    GET_ITEMS,
} from "../types";

const initialState = {
    items: []
}

type Action =
    {
        type: typeof ADD_ITEMS | typeof DELETE_ITEMS | typeof GET_ITEMS
        payload: {}
    }
type Payload = {payload: {}}

const handlers = {
    [ADD_ITEMS]: (state: any, {payload}: Payload) => ({...state, items: [...state.items, payload]}),
    [GET_ITEMS]: (state: {}, {payload}: Payload) => ({...state, items: payload}),
    [DELETE_ITEMS]: (state: any, {payload}: Payload) => ({...state, items: state.items.filter((item: any)=> item._id != payload)}),
    DEFAULT: (state: {}) => state
}
export const itemsReducer = (state = initialState, action: Action) =>{
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}