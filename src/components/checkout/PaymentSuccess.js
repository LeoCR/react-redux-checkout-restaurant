import React,{useEffect} from "react";
import {connect} from 'react-redux'; 
import {getOrders,deleteOrders} from '../../actions/cartActions';
export const PaymentSuccess=props=>{
    useEffect(()=>{
        console.log('Finished Payment Transaction');
        
        props.deleteOrders();
        props.getOrders();
    },[props])
    return(
        <React.Fragment>
                <h1>Payment Successfully</h1>
                <p>Thanks by your purchase</p>
                <a href='/user/history' target="_parent" className="btn btn-danger">View Invoices</a>
        </React.Fragment>
    )
    
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders
    }
}
export default connect(mapStateToProps,{getOrders,deleteOrders})(React.memo(PaymentSuccess));
 