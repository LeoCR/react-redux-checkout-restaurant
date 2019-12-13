import {combineReducers} from "redux";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import paypalReducer from "./paypalReducer";
export default combineReducers({
    orders:cartReducer,
    user:userReducer,
    paypalItems:paypalReducer
});