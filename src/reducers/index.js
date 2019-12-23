import {combineReducers} from "redux";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import paypalReducer from "./paypalReducer";
import invoiceDetailReducer from "./invoiceDetailReducer";
import headerInvoiceReducer from "./headerInvoiceReducer";
export default combineReducers({
    orders:cartReducer,
    user:userReducer,
    paypalItems:paypalReducer,
    invoiceDetails:invoiceDetailReducer,
    headerInvoices:headerInvoiceReducer
});