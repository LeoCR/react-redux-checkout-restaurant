import React from "react";
import Cart from "../components/Cart";
class CartContainer extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Cart 
                    setShowOrders={this.props.setShowOrders}
                    showModal={this.props.showModal}
                    addToCart={this.props.addToCart}
                    totalOrders={this.props.totalOrders}
                    hasOrders={this.props.hasOrders}
                    calculateOrders={this.props.calculateOrders}
                />
            </React.Fragment>
        )
    }
}
export default CartContainer;