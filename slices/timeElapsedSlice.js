import { createSlice } from '@reduxjs/toolkit'

// const time = new Date(s * 1000).toISOString().slice(11, 19);

export const timeElapsedSlice = createSlice({
    name: 'timeElapsed',
    initialState: {
        interval: null,
        seconds: 0
    },
    reducers: {
        startTimer: (state) => {
            state.interval = setInterval(
                () => state.seconds++,
                1000);
        },

        pauseTimer: (state) => {
            if (interval !== null) {
                clearInterval(state.interval);
            }
        },

        resetTimer: (state) => {
            pauseTimer();
            state.seconds = 0
        },
    }
})

// Action creators are generated for each case reducer function
export const { startTimer, pauseTimer, resetTimer } = timeElapsedSlice.actions

export const selectSeconds = (state) => state.timeElapsed.seconds;

export default timeElapsedSlice.reducer