import React from 'react';
import $ from 'jquery';
import CartContainer from "./CartContainer";
import OrderContainer from "./OrderContainer";
import {connect} from 'react-redux';
import {addToCart} from '../actions/cartActions';
class App extends React.Component {
  state={
    showModal:'showAddForm',
    product:null,
    hasOrders:false,
    totalOrders:0
  }
  setShowOrders=()=>{
    this.setState({
      showModal:'showBasket'
    });
    this.calculateOrders();
    $('.modal').css({'display':'block'});
  }
  calculateOrders=()=>{
    console.log('calculateOrders');
    var totalQuantity=0;
    try {
      this.props.orders.orders.forEach(function(element) {
          totalQuantity+=element.quantity;
      });
    } 
    catch (error) {
      console.log(error);
    }
    finally{
      if(totalQuantity<10){
        this.setState({
          totalOrders:'0'+totalQuantity
        })
      }
      else{
        this.setState({
          totalOrders:totalQuantity
        })
      }
    }
    
    if(totalQuantity>=1){
        this.setState({
          hasOrders:true
        });
    }
    console.log('totalQuantity '+totalQuantity);
    console.log('this.state.hasOrders '+this.state.hasOrders);
  }
  componentDidMount(){
    this.calculateOrders();
    console.log(this.props);
  }
  addProductToCart=(product)=>{
    setTimeout(() => {
      $("#productName").val(product.name); 
      $("#quantity-cart").val(1);
      $("#pricePerUnit").val(product.price);
      $("#totalPrice").val(product.price); 
      $('.modal').css({'display':'block'});
    }, 300);
    this.setState({
      product:product
    });
    this.calculateOrders();
  }
  addToCart=(quantity)=>{
      const orderObject = Object.assign({quantity: quantity}, this.state.product);
      console.log('App.addToCart.orderObject');
      console.log(orderObject);
      this.props.addToCart(orderObject);
      this.calculateOrders();
  }
  render() {
    return (
      <React.Fragment>
        <h1>Checkout</h1>
        <OrderContainer 
        orders={this.props.orders}
        totalOrders={this.state.totalOrders}/>
        <CartContainer 
            setShowOrders={this.setShowOrders}
            showModal={this.state.showModal} 
            hasOrders={this.state.hasOrders}
            totalOrders={this.state.totalOrders}
            addToCart={this.addToCart} 
            calculateOrders={this.calculateOrders}/>
      </React.Fragment>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    orders:state.orders
  }
}
export default connect(mapStateToProps,{addToCart})(App)