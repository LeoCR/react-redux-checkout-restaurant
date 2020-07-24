import React,{useEffect} from "react";
import $ from 'jquery';
import {connect} from 'react-redux';
import {updateItemUnits,deleteFromCart} from '../../actions/cartActions';

const CartProducts =props=>{
  useEffect(()=>{
    props.calculateOrders();
  },[props])
  const deleteOrder=(order,e)=>{
      if(e){
        e.preventDefault();
      }
      props.deleteFromCart(order.id);
      props.calculateOrders();
  }
  const checkout=(e)=>{
    if(e){
      e.preventDefault();
    }
    props.checkout();
  } 
  const decrementOrder=(order)=>{
    if(order.quantity>1){
        order.quantity=order.quantity-1;
        $('#quantity-added').val(order.quantity);
    }
    props.updateItemUnits(order);
    props.calculateOrders();
  }
  const incrementOrder=(order)=>{
    order.quantity=order.quantity+1;
    $('#quantity-added').val(order.quantity);
    props.updateItemUnits(order);
    props.calculateOrders();
  }
  const calculateTotal=()=>{
    var orders=props.orders.orders,
    totalPrice=0;
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
  var orders=props.orders.orders;
  
  if(orders.length===0){
        return(
            <div className="modal-body">
                Your cart is Empty
                <button className="btn btn-success" onClick={(e)=>{
                  window.location.replace("/#menu")
                }}>Go to Cart</button>
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
                        onClick={(e)=>deleteOrder(order,e)}>
                            <span aria-hidden="true">&times;</span>
                    </button>
                    <p style={{width:'225px'}}>
                        <p style={{width:' 75px',float:'left'}}>Quantity:</p>
                        <p style={{width:'80px',height:'30px',float:'left', border:'1px solid black',padding:'0'}}  id="quantity-added">{order.quantity} </p>
                        <button type="button" className="btn btn-primary" onClick={()=>decrementOrder(order)} style={{float: 'right'}}>-</button>
                        <button type="button" className="btn btn-success" onClick={()=>incrementOrder(order)} style={{float: 'right'}}>+</button>
                    </p>
                </li>
            )}
            </ul>
            {calculateTotal()}
            <button className="btn btn-primary" onClick={(e)=>checkout(e)}>Checkout</button>
        </div>
  )
}

const mapStateToProps=(state)=>{
    return{
      products:state.products,
      orders:state.orders
    }
}
export default connect(mapStateToProps,{updateItemUnits,deleteFromCart})(React.memo(CartProducts))