import {createSlice} from '@reduxjs/toolkit'

const user = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
    }
})

const {actions, reducer} = user;
export const {setUser} = actions;
export default reducer;