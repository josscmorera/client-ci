import {createSlice} from '@reduxjs/toolkit'

import { logout, authCheck } from '../thunks/auth'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false
    },
    reducers: {
        authSuccess: (state) => {
            state.isAuth = true
        },
        authFailure: state => {
            state.isAuth = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(authCheck.rejected, (state, action) => {
                state.isAuth = false
            })
            .addCase(authCheck.fulfilled, state => {
                state.isAuth = true
            })
            .addCase(logout.fulfilled, state => {
                state.isAuth = false
            })

    }
})

export const { authSuccess, authFailure } = authSlice.actions

export default authSlice.reducer