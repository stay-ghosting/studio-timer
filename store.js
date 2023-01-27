import { configureStore } from '@reduxjs/toolkit'
import sessionInfoReducer from './slices/sessionsInfoSlice'

export default configureStore({
    reducer: {
        sessioninfo: sessionInfoReducer
    }
})