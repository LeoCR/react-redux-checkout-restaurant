import React from "react";
import {connect} from 'react-redux';
import api from "../../apis/api";
import {getOrders,deleteOrders} from '../../actions/cartActions';
class PaypalPaymentSuccess extends React.Component{
    componentDidMount=async()=>{
        console.log('Finished Payment Transaction');
        /*history.push('/paypal/payment/success');
        this.props.deleteOrders();
        this.props.getOrders();*/
        console.log('componentDidMount this.props');
        console.log(this.props);
        var headerInvoice=this.props.headerInvoices.headerInvoices[0];
        var invoiceDetail=this.props.invoiceDetails.invoiceDetails[0];
        for (let l = 0; l < headerInvoice.length; l++) {
            const headInvc = headerInvoice[l];
            if(headInvc.id_header>0){
                console.log(headInvc);
                await api.post('/api/add/header-invoice',{headerInvoice:headInvc})
                .then(res=>{
                    console.log('headerInvoice created ');
                    console.log(res);
                })
                .catch(err=>{
                    console.log('An error occurs on post(/api/add/header-invoice)');
                    console.error(err);
                })
            }
        }
        for (let m = 0; m < invoiceDetail.length; m++) {
            const invDtl = invoiceDetail[m];
            if(invDtl.id_invoice_detail>0&& invDtl.header_invoice>0){
                console.log(invDtl);
                await api.post('/api/add/invoice',{invoiceDetail:invDtl})
                .then(res=>{
                    console.log('Invoice created '+res);
                })
                .catch(err=>{
                    console.log('An error occurs on post(/api/add/invoice)');
                    console.error(err);
                })
            }
        }
    }
    render(){
        return(
            <React.Fragment>
                    <h1>Payment Successfully</h1>
                    <p>Thanks by your purchase</p>
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        headerInvoices:state.headerInvoices,
        invoiceDetails:state.invoiceDetails,
        orders:state.orders
    }
}
export default connect(mapStateToProps,{getOrders,deleteOrders})(PaypalPaymentSuccess);
 