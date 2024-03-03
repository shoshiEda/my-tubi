export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_SEARCH = 'SET_SEARCH'


const initialState = {
  isLoading: false,
  isSearch:false
};

export function systemReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_SEARCH:
      return { ...state, isSearch: action.term }
    default: return state
  }
}
