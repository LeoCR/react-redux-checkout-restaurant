import React,{useEffect} from "react";
import $ from 'jquery';
import api from '../apis/api';
import {connect} from 'react-redux';
import UserDetails from './user/UserDetails';
import {updateItemUnits,deleteFromCart} from '../actions/cartActions';
import CartProducts from './shopping-cart/CartProducts';
import {setUser} from "../actions/userActions";
const Modal =props=>{
    useEffect(()=>{
        setUserData();
    },[]) 
    const setUserData=()=>{ 
        try {
            api.get('/api/user/info').then(function (res) {
                if(res.data){
                    props.setUser(res.data);
                }
            });
        } catch (error) {
            console.log('An error occurs in Modal.setUserData() '+error);
        }
    }
    const closeModal=(e)=>{
        if(e){
            e.preventDefault();
        }
        $('.modal').css({'display':'none'});
        $('body').toggleClass('modal-opened');
    } 
    const checkout=(e)=>{
        if(e){
            e.preventDefault();
        }
        $('.modal').css({'display':'none'});
        $('body').toggleClass('modal-opened');
    } 
    var ModalContent,titleModal;
    if(props.showModal==='showUserDetails'){
        ModalContent=<UserDetails/>;
        titleModal='User Details';
    }
    else{
        titleModal='Shopping Cart';
        ModalContent=<CartProducts calculateOrders={props.calculateOrders} checkout={checkout}/>;
    }
    return(
        <div className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{titleModal}</h5>
                        <button type="button" className="close" 
                            data-dismiss="modal" aria-label="Close" 
                            onClick={(e)=>closeModal(e)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {ModalContent}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders,
      user:state.user  
    }
}

export default connect(mapStateToProps,{updateItemUnits,deleteFromCart,setUser})(React.memo(Modal))