import React from "react";
import $ from 'jquery';
import {connect} from 'react-redux';
import {updateItemUnits,deleteFromCart} from '../actions/cartActions';
class Modal extends React.Component{
    closeModal=(e)=>{
        $('.modal').css({'display':'none'});
        $('body').toggleClass('modal-opened');
    }
    calculateTotal=()=>{
        var orders=this.props.orders.orders;
        var totalPrice=0
        orders.forEach(function(element) {
            totalPrice+=element.price*element.quantity;
        });
        return(
            <React.Fragment>
                <hr></hr>
                <h3>Total Price:</h3>
                <h5>{totalPrice}$</h5>
            </React.Fragment>
        )
    }
    addToCart=(e)=>{
        $('.modal').css({'display':'none'});
        var quantity=parseInt($('#quantity-cart').val());
        this.props.addToCart(quantity);
        this.props.calculateOrders();
    }
    decrement=(e)=>{
        var currentValue=parseInt($('#quantity-cart').val());
        if(currentValue>1){
            currentValue=parseInt($('#quantity-cart').val())-1;
        }
        $('#quantity-cart').val(currentValue);
        var totalPrice=parseFloat($('#quantity-cart').val())*parseFloat($("#pricePerUnit").val());
        $("#totalPrice").val(totalPrice);
        this.props.calculateOrders();
    }
    increment=(e)=>{
        var currentValue=parseInt($('#quantity-cart').val())+1;
        $('#quantity-cart').val(currentValue);
        var totalPrice=parseFloat($('#quantity-cart').val())*parseFloat($("#pricePerUnit").val());
        $("#totalPrice").val(totalPrice);
        this.props.calculateOrders();
    }
    checkout=(e)=>{
        $('.modal').css({'display':'none'});
    }
    decrementOrder=(order)=>{
        if(order.quantity>1){
            order.quantity=order.quantity-1;
            $('#quantity-added').val(order.quantity);
        }
        this.props.updateItemUnits(order);
        this.props.calculateOrders();
    }
    incrementOrder=(order)=>{
        order.quantity=order.quantity+1;
        $('#quantity-added').val(order.quantity);
        this.props.updateItemUnits(order);
        this.props.calculateOrders();
    }
    deleteOrder=(order,e)=>{
        e.preventDefault();
        this.props.deleteFromCart(order.id);
        this.props.calculateOrders();
    }
    updateQuantity=()=>{
        console.log('updateQuantity')
    }
    showProducts=()=>{
        var orders=this.props.orders.orders;
        this.props.calculateOrders();
        if(orders.length===0){
            return(
                <div className="modal-body">
                    Your cart is Empty
                </div>
            )
        } 
        return(
            <div id="show-orders" className="modal-body">
                <ul style={{padding:'5px 15px',listStyle:'none'}}>
                {orders.map(order => 
                    <li key={order.id} 
                        style={{listStyle:'none',width:'100%',
                        position:'relative',float:'left'}}>
                        <h5 style={{maxWidth:'350px',float:'left',
                        width:'100%'}}>{order.name}</h5>
                        <button style={{width:'50px' ,float:'left'}} 
                            type="button" className="btn btn-danger" 
                            data-dismiss="modal" aria-label="Close" 
                            onClick={(e)=>this.deleteOrder(order,e)}>
                                <span aria-hidden="true">&times;</span>
                        </button>
                        <p style={{width:'225px'}}>
                            <label htmlFor="quantity-added" 
                            style={{width:' 75px'}}>Quantity:</label>
                            <input type="number" value={order.quantity}  
                                style={{width:'80px',height:'30px',
                                border:'1px solid black',padding:'0'}} 
                                id="quantity-added" name="quantity-added"
                                onChange={()=>this.updateQuantity()}/>
                            <button type="button" className="btn btn-primary" 
                                onClick={()=>this.decrementOrder(order)} 
                                style={{float: 'right'}}>-</button>
                            <button type="button" className="btn btn-success" 
                                onClick={()=>this.incrementOrder(order)} 
                                style={{float: 'right'}}>+</button>
                        </p>
                    </li>
                )}
                </ul>
                {this.calculateTotal()}
                <button className="btn btn-primary">Checkout</button>
            </div>
        )
    }
    showAddForm=()=>{
        this.props.calculateOrders();
        return(
            <React.Fragment>
                <div className="modal-body">
                    <label htmlFor="productName">Product Name:</label>
                    <input type="hidden" name="idProduct" 
                        id="idProduct" disabled/>
                    <input type="text" name="productName" 
                        id="productName" disabled/>
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" name="quantity" 
                        id="quantity-cart" />
                    <button type="button" className="btn btn-danger" 
                        onClick={this.decrement}>-</button>
                    <button type="button" className="btn btn-success" 
                        onClick={this.increment}>+</button>
                    <label htmlFor="pricePerUnit">Price per Unit:</label>
                    <input type="number" name="pricePerUnit" 
                        id="pricePerUnit" disabled/>
                    <label htmlFor="totalPrice">Total Price:</label>
                    <input type="number" name="totalPrice" 
                        id="totalPrice" disabled/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" 
                        onClick={(e)=>this.addToCart(e)}>Add to Cart</button>
                    <button type="button" className="btn btn-danger" 
                        data-dismiss="modal" 
                        onClick={(e)=>this.checkout(e)}>Checkout</button>
                </div>
            </React.Fragment>        
        );
    }
    render(){
        var ModalContent;
        if(this.props.showModal==='showAddForm'){
            ModalContent=this.showAddForm();
        }
        else{
            ModalContent=this.showProducts();
        }
        return(
            <div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Shopping Cart</h5>
                            <button type="button" className="close" 
                                data-dismiss="modal" aria-label="Close" 
                                onClick={(e)=>this.closeModal(e)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {ModalContent}
                    </div>
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

export default connect(mapStateToProps,{updateItemUnits,deleteFromCart})(Modal)