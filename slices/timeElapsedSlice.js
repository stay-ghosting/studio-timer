// const time = new Date(s * 1000).toISOString().slice(11, 19);
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// dispatch(timeElapsedSlice.actions.setTimer(seconds));

const initialState = {
    hms: {
        h: 0,
        m: 0,
        s: 0,
    }
};
export const timeElapsedSlice = createSlice({
    name: 'timeElapsed',
    initialState,
    reducers: {
        setElapsedHMS: (state, action) => {
            state.hms = action.payload;
        },
    },
})


export const selectHMS = (state) => state.timeElapsed.hms;

export const { setElapsedHMS } = timeElapsedSlice.actions;

export default timeElapsedSlice.reducer;