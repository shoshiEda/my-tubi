import { createStore, combineReducers } from 'redux'

import { carReducer } from './car.reducer.js'
import { userReducer } from './user.reducer.js'
import { systemReducer } from './system.reducer'
import { songReducer } from './song.reducer.js'


const rootReducer = combineReducers({
    carModule: carReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    songModule: songReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



