import {FIELDS_SAVE} from '../types'
const initialState = {email: '', password: ''}

type Action =
    {
        type: typeof FIELDS_SAVE
        payload: {}
    }

type Payload = {payload: {}}
const handlers = {
    [FIELDS_SAVE]: (state: {}, {payload}: Payload) => ({...state, ...payload}),
    DEFAULT: (state: {}) => state
}
export const registerReducer = (state = initialState, action: Action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}