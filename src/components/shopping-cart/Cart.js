import React , {Component} from "react";
import Modal from "../Modal";
import Basket from './Basket';
import Login from "../user/Login";
class Cart extends Component{
    render(){
        return(
            <React.Fragment>
                <Basket 
                    hasOrders={this.props.hasOrders} 
                    totalOrders={this.props.totalOrders}
                    calculateOrders={this.props.calculateOrders}
                    setShowOrders={this.props.setShowOrders}/>
                <Login 
                    setShowLogin={this.props.setShowLogin}
                    setShowUserDetails={this.props.setShowUserDetails}
                    showModal={this.props.showModal} 
                />
                <Modal addToCart={this.props.addToCart} 
                     calculateOrders={this.props.calculateOrders}
                    showModal={this.props.showModal}/>
            </React.Fragment>
        );
    }
}
export default Cart;