import React , {Component} from "react";
import Modal from "./Modal";
import Basket from './Basket';
class Cart extends Component{
    render(){
        return(
            <React.Fragment>
                <Basket showModal={this.props.showModal} 
                    hasOrders={this.props.hasOrders} 
                    totalOrders={this.props.totalOrders}
                    calculateOrders={this.props.calculateOrders}
                    setShowOrders={this.props.setShowOrders}/>
                <Modal addToCart={this.props.addToCart} 
                     calculateOrders={this.props.calculateOrders}
                    showModal={this.props.showModal}/>
            </React.Fragment>
        );
    }
}
export default Cart;