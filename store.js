import { configureStore } from '@reduxjs/toolkit'
import sessionInfoReducer from './slices/sessionsInfoSlice'
import timeElapsedReducer from './slices/timeElapsedSlice'

export default store = configureStore({
    reducer: {
        sessioninfo: sessionInfoReducer,
        timeElapsed: timeElapsedReducer
    }
})