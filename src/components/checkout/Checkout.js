import React from "react";
import {connect} from 'react-redux';
import CheckoutForm from "./CheckoutForm";
import CheckPayment from './CheckPayment';
import IconPaypal from './IconPaypal';
import IconMasterCard from './IconMasterCard';
import IconVisa from './IconVisa';
import CheckoutPaypalForm from './CheckoutPaypalForm';
import {addPaypalItemsToCart,clearPaypalItems} from '../../actions/paypalActions';

class Checkout extends React.Component{
    componentDidMount(){
        this.props.clearPaypalItems();
        const {orders}=this.props.orders;
        var tempSubtotal=0;
        for (let m = 0; m < orders.length; m++) {
            var tempItem={};
            tempSubtotal+=parseFloat(orders[m].quantity*orders[m].price);
            tempItem.sku="100";
            tempItem.name=orders[m].name;
            tempItem.description=orders[m].description;
            tempItem.price=orders[m].price;
            tempItem.currency=orders[m].currency;
            tempItem.quantity=orders[m].quantity;
            tempItem.tax="0.15";
            this.props.addPaypalItemsToCart(tempItem);
        }
    }
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
                            <CheckoutPaypalForm/>
                        </li> 
                    </ul>
                </div>
            )
        }
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders,
      paypalItems:state.paypalItems
    }
}
export default connect(mapStateToProps,{addPaypalItemsToCart,clearPaypalItems})(Checkout);
