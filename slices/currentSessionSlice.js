import { createSlice } from '@reduxjs/toolkit'

export const sessionInfo = createSlice({
    name: 'sessionInfo',
    initialState: {
        name: '',
        pricePerInterval: 0,
        intervalSeconds: 0,
    },

    reducers: {
        updateSession: (state, action) => {
            const { name, pricePerInterval, intervalSeconds } = action.payload;

            // update the state
            state.sessions = { name, pricePerInterval, intervalSeconds }
        },
    }
})

// Action creators are generated for each case reducer function
export const { updateSession } = sessionInfo.actions

export default sessionInfo.reducer