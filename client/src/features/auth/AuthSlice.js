import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Login, Register } from "./AuthService";

const UserExit = JSON.parse(localStorage.getItem('user'))

const AuthSlice = createSlice({
    name : 'Auth',
    initialState : {
        user : UserExit || null,
        isLoading : false,
        isSuccess : false,
        isError : false,
        message : ""
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(LoginUser.pending , (state , action) =>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(LoginUser.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.isError = false
        })
        .addCase(LoginUser.rejected , (state , action) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(RegisterUser.pending , (state , action) =>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(RegisterUser.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.isError = false
        })
        .addCase(RegisterUser.rejected , (state , action) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(LogOutUser.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
            state.user = null
        })
    }
})


export default AuthSlice.reducer


// Login Thunk
export const LoginUser = createAsyncThunk('AUTH/LOGIN' , async (FormData , thunkAPI) =>{
    try {
        return await Login(FormData) 
    } catch (error) {
        // toast.error(error)
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Register Thunk
export const RegisterUser = createAsyncThunk('AUTH/REGISTER' , async(FormData , thunkAPI) =>{
    try {
        return await Register(FormData)
    } catch (error) {
        // toast.error(error)
const message = error.response.data.message
return thunkAPI.rejectWithValue(message)
    }
})


// Exit User Thunk
export const LogOutUser = createAsyncThunk('AUTH/LOGOUT' , () =>{
 localStorage.removeItem("user")
})