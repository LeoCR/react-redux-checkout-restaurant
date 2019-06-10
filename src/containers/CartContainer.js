import React from "react";
import Cart from "../components/shopping-cart/Cart";
class CartContainer extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Cart 
                    setShowOrders={this.props.setShowOrders}
                    setShowUserDetails={this.props.setShowUserDetails}
                    showModal={this.props.showModal}
                    setShowLogin={this.props.setShowLogin}
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