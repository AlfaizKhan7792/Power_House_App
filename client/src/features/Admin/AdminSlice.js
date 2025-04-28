import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import adminService, { planss } from "./AdminService";

const AdminSlice = createSlice({
    name : "Admin",
    initialState : {
        All_Users : [],
        All_Plans : [],
        Plan : {},
        isLoading : false,
        isSuccess : false,
        isError : false,
        message : ""
    }, 
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(AllUsers.pending , (state) =>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = ""
        })
        .addCase(AllUsers.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.All_Users = action.payload
            state.isError = false
            state.message = ""
        })
        .addCase(AllUsers.rejected , (state , action) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(AllPlans.pending , (state) =>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = ""
        })
        .addCase(AllPlans.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.All_Plans = action.payload
            state.isError = false
            state.message = ""
        })
        .addCase(AllPlans.rejected , (state , action) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export default AdminSlice.reducer

// All-Users Thunk 
export const AllUsers = createAsyncThunk("FETCH/ALL-USERS", async (_, thunkAPI) => {
    const token = thunkAPI.getState().Auth.user.token;
    // console.log("Token in thunk:", token);
    try {
      const data = await adminService.userss(token);
    //   console.log("Data from API:", data);
      return data;
    } catch (error) {
    //   console.log("Error from thunk:", error.response?.data);
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  });
  

//   All-Plans Thunk
export const AllPlans = createAsyncThunk("FETCH/ALL-PLANS" , async (_, thunkAPI) =>{
    const token = thunkAPI.getState().Auth.user.token
try {
    const data = await planss(token)
return data
} catch (error) {
    const message = error.response.data.message || error.message
    return thunkAPI.rejectWithValue(message)
}
})