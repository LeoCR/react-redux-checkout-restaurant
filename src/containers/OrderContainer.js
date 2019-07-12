import React from "react";
import Order from "../components/checkout/Order";
import { Router, Route, Link } from "react-router-dom";
import Checkout from '../components/checkout/Checkout';
import history from '../history';
class OrderContainer extends React.Component{
    renderOrders=()=>{
        const {orders}=this.props.orders;
        if(orders.length===0){
            return(
                <div>
                    No products into basket
                </div>
            )
        }
        else{
            return(
                <React.Fragment>
                    <div className="list-orders">
                        {this.props.totalOrders} in the Basket
                        <ul className="list-group">
                            {
                                orders.map(order=>
                                    {
                                        return(
                                            <li className="orders list-group-item">
                                                <Order key={order.id} info={order}
                                                />
                                            </li>
                                        )
                                    } 
                                )
                            }
                        </ul>
                    </div>
                </React.Fragment>
            )
        }
        
    }
    calculateTotal=()=>{
        var orders=this.props.orders.orders,
        totalPrice=0;
        orders.forEach(function(element) {
            totalPrice+=element.price*element.quantity;
        });
        if(totalPrice===0){
            return(
                <React.Fragment>
                </React.Fragment>
            )
        }
        return(
            <React.Fragment>
                <hr></hr>
                <h3>{totalPrice}$</h3>
            </React.Fragment>
        )
    }
    renderCheckout=()=>{
        var orders=this.props.orders.orders;
        if(orders.length===0){
            return(
                <React.Fragment>
                </React.Fragment>
            )
        }
        return(
            <div className="checkout-details">
                <Link className="btn btn-danger" to="/checkout/payment">Pay</Link>
            </div>
        )
    }
    render(){
        return(
            <React.Fragment>
                <Router history={history}>
                    <Route
                        exact
                        path='/checkout'
                        render={() => <React.Fragment>
                            {this.renderOrders()}
                            <h1>Total:</h1> 
                            {this.calculateTotal()}
                            {this.renderCheckout()}
                        </React.Fragment>}
                    />
                    <Route
                        exact
                        path='/checkout/payment'
                        render={() =><React.Fragment>
                            {this.renderOrders()}
                            <h1>Total:</h1> 
                            {this.calculateTotal()}
                             <Checkout/>
                        </React.Fragment>}
                    />
                    <Route exact 
                    path="/payment-successfully" 
                    render={()=><React.Fragment>
                            <h1>Payment Successfully</h1>
                            <p>Thanks by your purchase</p>
                    </React.Fragment>} 
                    />
                </Router>
            </React.Fragment>
        )
    }
}
export default OrderContainer;