import { createSlice } from '@reduxjs/toolkit'

import { login, register } from '../thunks/user'

const initialState = {
  _id : '',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  role: '',
  followers: [],
  following: [],
  coins: 0,
  createAt: '',
  status: null,
  message: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return {
                ...action.payload.data,
                status: 'fulfilled',
                message: ''
            }
        },
        resetStatus: state => {
            state.status = null
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        resetUser: state => {
            return initialState
        } 

    },
    extraReducers: builder => {
        builder.addCase(register.rejected, (state, action) => {
            state.status = 'rejected'
            state.message = action.payload
        })
        builder.addCase(register.pending, (state, action) => {
            state.status = 'pending'
            state.message = ''
        })
        builder.addCase(register.fulfilled, (state, action) => {
            return { 
                ...action.payload.data,
                status: 'fulfilled',
                message: ''
            }
        })
        builder.addCase(login.pending, (state, action) => {
            state.status = 'pending'
            state.message = ''
        })
        builder.addCase(login.rejected, (state, action) => {

            state.status = 'rejected'
            state.message = action.payload
        })
        builder.addCase(login.fulfilled, (state, action) => {
            return {
                ...action.payload.data,
                status: 'fulfilled',
                message: ''
            }
        })
    }
})

export const { setUser, resetStatus, setMessage, resetUser } = userSlice.actions

export default userSlice.reducer