import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import planService from "./PlansService";


const PlanSlice = createSlice({
    name: "Plan",
    initialState: {
        Plans: [],
        Plan: {},
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
    },
    reducers: {
        restore : (state , action) => {
          return{
            Plans: [],
            Plan: {},
            generateAiPlan : null,
            isLoading: false,
            isSuccess: false,
            isError: false,
            message: "",
          }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetPlans.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(GetPlans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Plans = action.payload;
                state.isError = false;
            })
            .addCase(GetPlans.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })


            .addCase(GetPlan.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(GetPlan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Plan = action.payload;
                state.isError = false;
            })
            .addCase(GetPlan.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })


            .addCase(AddPlan.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(AddPlan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Plans = [...state.Plans , action.payload];
                state.isError = false;
            })
            .addCase(AddPlan.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })


            .addCase(GeneratePlan.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(GeneratePlan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.generateAiPlan = action.payload;
                state.isError = false;
            })
            .addCase(GeneratePlan.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })


            .addCase(RemovePlan.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(RemovePlan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Plans = state.Plans.filter(item => item._id !== action.payload)
                state.isError = false;
            })
            .addCase(RemovePlan.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const {restore} = PlanSlice.actions
export default PlanSlice.reducer;

// Get All Plans
export const GetPlans = createAsyncThunk("FETCH/PLANS" , async(id , thunkAPI) => {
    let token = thunkAPI.getState().Auth.user.token
    try {
        return await planService.fetchPlans(id , token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// Get Single Plan
export const GetPlan = createAsyncThunk("FETCH/PLAN" , async (pid , thunkAPI) =>{
    let token = thunkAPI.getState().Auth.user.token
    try {
    return await planService.fetchPlan(pid , token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Add Plan
export const AddPlan = createAsyncThunk("ADD/PLAN" , async (formData , thunkAPI) =>{
    let token = thunkAPI.getState().Auth.user.token
    try {
        return await planService.createPlan(formData , token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Generate AI Plan 
export const GeneratePlan = createAsyncThunk("GENERATE/PLAN", async(userInfo , thunkAPI) =>{
    let token = thunkAPI.getState().Auth.user.token
    try {
        return await planService.generate(userInfo, token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Remove Thunk
export const RemovePlan = createAsyncThunk("REMOVE/PLAN" , async (id , thunkAPI) =>{
    const token = thunkAPI.getState().Auth.user.token
    try {
        localStorage.removeItem("user._id")
        await planService.deletee(id, token);
        return id
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})