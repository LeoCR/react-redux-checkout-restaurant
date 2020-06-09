import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCart} from '../../actions/cartActions';
import {addPaypalItemsToCart,clearPaypalItems} from '../../actions/paypalActions';
class Order extends React.Component {
    deleteOrder=(id)=>{
        console.log('deleteOrder');
        this.props.clearPaypalItems();
        const {orders}=this.props.orders;
        this.props.deleteFromCart(id);
        var tempSubtotal;
        for (let m = 0; m < orders.length; m++) {
            var tempItem={};
            tempSubtotal+=parseFloat(orders[m].quantity*orders[m].price);
            tempItem.name=orders[m].name;
            tempItem.description=orders[m].description;
            tempItem.price=orders[m].price;
            tempItem.currency=orders[m].currency;
            tempItem.quantity=orders[m].quantity.toString();
            this.props.addPaypalItemsToCart(tempItem);
        }
    }
    render(){
        if(!this.props.info){
            return(
                <div>
                    No Orders
                </div>
            )
        }
        return(
            <div className="order-item">
                <div className="order-item-left-side">
                    <h3 style={{fontSize:"29px"}}>  {this.props.info.name}</h3>
                    <span className="badge badge-success text-dark">Quantity:  {this.props.info.quantity}</span>    
                    <p>Price per unit:<span className="badge badge-warning text-dark">${this.props.info.price}</span></p>
                    <img src={this.props.info.picture} alt={this.props.info.name} style={{maxWidth:"80px"}}/>
                </div>
                <div className="order-item-right-side">
                    <button className="btn btn-danger" onClick={()=>this.deleteOrder(this.props.info.id)}>X</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders,
      paypalItems:state.paypalItems
    }
}
export default connect(mapStateToProps,{deleteFromCart,addPaypalItemsToCart,clearPaypalItems})(Order)