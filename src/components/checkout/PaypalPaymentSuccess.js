import React from "react";
import {connect} from 'react-redux';
import api from "../../apis/api";
import {getParameterByName} from "../../utils/utils";
import {getOrders,deleteOrders} from '../../actions/cartActions';
class PaypalPaymentSuccess extends React.Component{
    componentDidMount=async()=>{
        var _this=this;
        return new Promise((resolve, reject) => {
            var paymentId = getParameterByName('paymentId');
            var token=getParameterByName('token');
            var PayerID=getParameterByName('PayerID');
            var headerInvoice=this.props.headerInvoices.headerInvoices[0];
            var invoiceDetail=this.props.invoiceDetails.invoiceDetails[0];
            for (let l = 0; l < headerInvoice.length; l++) {
                var headInvc = headerInvoice[l];
                if(headInvc.id_header>0){
                    api.post('/api/add/header-invoice',{headerInvoice:headInvc})
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
                var tempInvDtl=Object.assign(invDtl, {paypal_id:paymentId,paypal_payer_id:PayerID,paypal_token:token});
                if(tempInvDtl.id_invoice_detail>0&& tempInvDtl.header_invoice>0){
                    api.post('/api/add/invoice-paypal',{invoiceDetail:tempInvDtl})
                    .then(res=>{
                        console.log('Invoice created '+res);
                    })
                    .catch(err=>{
                        console.log('An error occurs on post(/api/add/invoice)');
                        console.error(err);
                    })
                }
                
            }
            setTimeout(() => {
                _this.props.deleteOrders();
                _this.props.getOrders();
                resolve('resolved');
            }, 3900);
        });
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
 