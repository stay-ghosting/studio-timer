import { configureStore } from '@reduxjs/toolkit'
import timeElapsedReducer from './slices/timeElapsedSlice'

export default store = configureStore({
    reducer: {
        timeElapsed: timeElapsedReducer
    }
})