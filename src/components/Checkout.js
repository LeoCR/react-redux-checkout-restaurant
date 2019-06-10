import React from "react";
import {connect} from 'react-redux';
import CheckoutForm from "./checkout/CheckoutForm";
import CheckPayment from './checkout/CheckPayment';
import IconPaypal from './checkout/IconPaypal';
import IconMasterCard from './checkout/IconMasterCard';
import IconVisa from './checkout/IconVisa';
class Checkout extends React.Component{
    //https://medium.com/@romanchvalbo/how-i-set-up-react-and-node-with-json-web-token-for-authentication-259ec1a90352
    render(){
        const {orders}=this.props.orders;
        if(orders.length===0){
            return(
                <React.Fragment>
                </React.Fragment>
            )
        }
        else{
            return(
                <div id="payment-method">
                    <ul className="list-group">
                        <li className="list-group-item checkout-item-card selected">
                            <CheckPayment method='card'/>
                            <IconVisa/>
                            <IconMasterCard/>
                            <div className="form-payment method-to-pay">
                                <CheckoutForm/>  
                            </div>
                        </li>
                        <li className="list-group-item checkout-item-paypal">
                            <CheckPayment method='paypal'/>
                            <IconPaypal/>
                             <div className="form-payment method-to-pay" style={{width:'100%',position:'relative',float:'left'}}>
                                <p>To complete the transaction, we will send you to PayPal's secure servers.</p>
                                <button className="btn btn-danger">Proceed</button>
                                <span style={{fontSize:'8px'}}>By completing the purchase, you agree to these <a href="#">Terms of Use</a></span>
                             </div>
                        </li>
                    </ul>
                </div>
            )
        }
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders
    }
}
export default connect(mapStateToProps)(Checkout);
