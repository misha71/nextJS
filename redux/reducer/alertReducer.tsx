import {SHOW_ALERT, HIDE_ALERT} from '../types'
const initialState = {visible: false}

type Action =
    {
        type: typeof SHOW_ALERT | typeof HIDE_ALERT
        payload: {}
    }
type Payload = {payload: {}}

const handlers = {
    [SHOW_ALERT]: (state: {}, {payload}: Payload) => ({...payload, visible: true}),
    [HIDE_ALERT]: (state: {}) => ({...state, visible: false}),
    DEFAULT: (state: {}) => state
}

export const alertReducer = (state = initialState, action: Action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}