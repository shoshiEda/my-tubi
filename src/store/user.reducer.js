import { userService } from '../services/user.service.js'


export const SET_USER = 'SET_USER'
export const LOGOUT_USER = 'LOGOUT_USER'



const initialState = {
    user: userService.getLoggedinUser(),
}



export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
       
        case SET_USER:
            newState = { ...state, user: { 
                ...state.user,
                ...action.user 
            }  }
            break

            case LOGOUT_USER:
            newState = { ...state, user: action.user}
            break
      
        default:
    }
    // For debug:
     window.userState = newState
     console.log('State:', newState)
    return newState

}
