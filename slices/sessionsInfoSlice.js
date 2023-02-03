import { createSlice } from '@reduxjs/toolkit'

export const sessionsSlice = createSlice({
    initialState: {
        sessions: [],
    },
    name: 'sessions',
    reducers: {
        addSession: (state, action) => {
            const newSession = action.payload
            // set id to the the largest currently stored id + 1
            let id = 0;
            state.sessions.forEach((session) => {
                if (id < session.id) {
                    id = session.id
                }
            });
            newSession.id = id;

            // update the state
            state.sessions = [...state.sessions, newSession]
        },
    }
})

// Action creators are generated for each case reducer function
export const { addSession } = sessionsSlice.actions;

export default sessionsSlice.reducer