import {  createAsyncThunk } from '@reduxjs/toolkit'

import Axios from '../../lib/Axios'
import { authSuccess } from '../slices/auth'


export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        let response = await Axios.post('/users/register', userData)

        localStorage.setItem('clientToken', response.data.token)

        thunkAPI.dispatch(authSuccess())

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || error.response?.message)
    }
})

export const login = createAsyncThunk('user/login', async (userData, thunkAPI) => {
    try {
        delete Axios.defaults.headers.common['Authorization']

        let response = await Axios.post('/users/login', userData)

        localStorage.setItem('clientToken', response.data.token)

        thunkAPI.dispatch(authSuccess())

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || error.response?.message)
    }
})