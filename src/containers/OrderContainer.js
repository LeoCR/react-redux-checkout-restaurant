import React from "react";
import Order from "../components/Order";
class OrderContainer extends React.Component{
    renderOrders=()=>{
        const {orders}=this.props.orders;
        if(orders.length===0){
            return(
                <div>
                    No Orders
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
        return(
            <React.Fragment>
                <hr></hr>
                <h5>{totalPrice}$</h5>
            </React.Fragment>
        )
    }
    renderForm=()=>{
        return(
            <div className="checkout-details">
                <h1>Total:</h1> 
                {this.calculateTotal()}
                <button className="btn btn-danger">Pay</button>
            </div>
        )
    }
    render(){
        return(
            <React.Fragment>
                {this.renderOrders()}
                {this.renderForm()}
            </React.Fragment>
        )
    }
}
export default OrderContainer;