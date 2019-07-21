import React from "react";
import $ from 'jquery';
import api from '../apis/api';
import {connect} from 'react-redux';
import UserDetails from './user/UserDetails';
import {updateItemUnits,deleteFromCart} from '../actions/cartActions';
import CartProducts from './shopping-cart/CartProducts';
import {setUser} from "../actions/userActions";
class Modal extends React.Component{
    componentDidMount(){
        this.setUserData();
    }
    setUserData=()=>{
        var _this=this;
        try {
            api.get('/api/user/info').then(function (res) {
                if(res.data){
                    _this.props.setUser(res.data);
                }
            });
        } catch (error) {
            console.log('An error occurs in Modal.setUserData() '+error);
        }
    }
    closeModal=(e)=>{
        $('.modal').css({'display':'none'});
        $('body').toggleClass('modal-opened');
    } 
    checkout=(e)=>{
        $('.modal').css({'display':'none'});
        $('body').toggleClass('modal-opened');
    }
    render(){
        var ModalContent,titleModal;
        if(this.props.showModal==='showUserDetails'){
            ModalContent=<UserDetails/>;
            titleModal='User Details';
        }
        else{
            titleModal='Shopping Cart';
            ModalContent=<CartProducts calculateOrders={this.props.calculateOrders} checkout={this.checkout}/>;
        }
        return(
            <div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{titleModal}</h5>
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
      orders:state.orders,
      user:state.user  
    }
}

export default connect(mapStateToProps,{updateItemUnits,deleteFromCart,setUser})(Modal)