import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        refreshToken: null
    },
    reducers: {
        setTokens: (state, action) => {
            const { accessToken, refreshToken } = action.payload
            state.accessToken = accessToken
            state.refreshToken = refreshToken
        },
        logout: (state) => {
            state.accessToken = null
            state.refreshToken = null
        }
    }
})

export const { setTokens, logout } = authSlice.actions

export default authSlice.reducer

export const selectAccessToken = (state) => state.auth.accessToken
export const selectRefreshToken = (state) => state.auth.refreshToken