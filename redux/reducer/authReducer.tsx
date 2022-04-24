import {IS_AUTH, NO_AUTH} from '../types'
const initialState = {auth: false}

type Action =
{
    type: typeof IS_AUTH | typeof NO_AUTH
    payload: {}
}

type Payload = {payload: {}}

const handlers = {
    [IS_AUTH]: (sate:{}, {payload}: Payload) => ({...payload, auth: true}),
    [NO_AUTH]: (state:{}) => ({...state, auth: false}),
    DEFAULT: (state:{}) => state
}

export const authReducer = (state = initialState, action: Action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
