import { userService } from '../services/user.service.js'

export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_SEARCH = 'SET_SEARCH'
export const SET_CURR_SONG = 'SET_CURR_SONG'
export const SET_CURR_STATION = 'SET_CURR_STATION'
export const SET_PLAY = "SET_PLAY"




const initialState = {
  isLoading: false,
  isSearch:false,
  currSong:userService.getLoggedinUser()? userService.getLoggedinUser().currSong : null,
  currStation:userService.getLoggedinUser()? userService.getLoggedinUser().currStation : null,
  player:false,
  isPlay:false,
};

export function systemReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_SEARCH:
      return { ...state, isSearch: action.value }
    case SET_CURR_SONG:
      return { ...state, currSong:{...state.currSong, ...action.song }}
    case SET_CURR_STATION:
      return { ...state, currStation: {...state.currStation, ...action.station }}
    case SET_PLAY:
        return { ...state, isPlay: action.term }
    default: return state
  }
}
