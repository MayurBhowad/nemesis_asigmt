import { CLEAR_ERRORS, GET_ERRORS, GET_USER, GET_DATA, CLEAR_USER } from "../types.redux";

const initialState = {
    isAuthenticated: false,
    user: {},
    error: {},
    data: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        // case SET_CURRENT_USER:
        //     return {
        //         ...state,
        //         isAuthenticated: !isEmpty(action.payload),
        //         user: action.payload
        //     }
        case GET_ERRORS:
            return {
                ...state,
                user: {},
                error: action.payload,
                loading: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: {},
                loading: false
            }

        case GET_USER:
            return {
                ...state,
                isAuthenticated: action.payload.role === 'admin' || action.payload.role === 'tester' ? true : false,
                user: action.payload,
                loading: false
            }
        case CLEAR_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                loading: false
            }

        case GET_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false
            }

        default:
            return state;
    }
}