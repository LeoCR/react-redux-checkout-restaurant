import React from "react";
import {connect} from 'react-redux';
import history from '../../history';
import {getOrders,deleteOrders} from '../../actions/cartActions';
class PaymentSuccess extends React.Component{
    componentDidMount(){
        console.log('Finished Payment Transaction');
        history.push('/payment-successfully')
        this.props.deleteOrders();
        this.props.getOrders();
    }
    render(){
        return(
            <React.Fragment>
                    <h1>Payment Successfully</h1>
                    <p>Thanks by your purchase</p>
                    <a className="btn btn-danger" href='/user/history' target="_parent">View Invoices</a>
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders
    }
}
export default connect(mapStateToProps,{getOrders,deleteOrders})(PaymentSuccess);
 