import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth/AuthSlice"
import PlanReducer from "./plans/PlansSlice"
import AdminReducer from "./Admin/AdminSlice"

const store = configureStore({
    reducer : {
Auth : AuthReducer,
Plan : PlanReducer,
Admin : AdminReducer,
    }
})


export default store