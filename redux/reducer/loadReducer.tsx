import {SHOW_LOADER, HIDE_LOADER} from "../types"
const initialState = {
    ready: false
}
type Action =
    {
        type: typeof SHOW_LOADER | typeof HIDE_LOADER
    }

const handlers = {
    [SHOW_LOADER]: (state: {}) => ({...state, ready: true}),
    [HIDE_LOADER]: (state: {}) => ({...state, ready: false}),
    DEFAULT: (state: {}) => state
}
export const loadReducer = (state = initialState, action: Action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state)
}