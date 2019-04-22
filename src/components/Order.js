import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCart} from '../actions/cartActions';
class Order extends React.Component {
    componentWillMount(){
        console.log('Order componentWillMount');
        console.log(this.props);
    }
    deleteOrder=(id)=>{
        this.props.deleteFromCart(id);
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
                    <h4>  {this.props.info.name}</h4>
                    <h5>Quantity:  {this.props.info.quantity}</h5>    
                    <p>Price per unit:<span className="badge badge-warning text-dark">${this.props.info.price}</span></p>
                    <img src={this.props.info.picture} alt={this.props.info.name} style={{maxWidth:"200px"}}/>
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
      orders:state.orders
    }
}
export default connect(mapStateToProps,{deleteFromCart})(Order)