import React from 'react';
import {connect} from 'react-redux';
import api from '../../apis/api';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class CheckoutPaypalForm extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            userData:'',
            userId:0,
            nextHeaderInvoice:0,
            nextIdInvoiceDetail:0,
            nextIdHeader:0,
            nextOrderCode:'',
            subtotal:0,
            items:[],
            isValid:false
        }
    }
    componentDidMount=async ()=>{
        var _this=this;
        try {
            cookies.remove('restaurant_header_invoices', { path: '/' });
            cookies.remove('restaurant_invoice_details', { path: '/' });
        } catch (error) {
            console.log('An error occurs in componentDidMount()');
            console.log(error);
        }
        await api.get('/api/user/info')
        .then((res)=>{
            _this.setState({
                userData:res.data
            });
        })
        await api.get('/api/invoice-detail/get-last')
        .then((res)=>{
            _this.setState({
                nextHeaderInvoice:parseInt(res.data[0].header_invoice)+1
            })
        }) 
        await api.get('/api/header-invoice/get-last-header-id')
        .then((res)=>{
            _this.setState({
                nextIdHeader:parseInt(res.data[0].id_header)+1
            })
        })
        await api.get('/api/invoice-detail/get-last-id-invoice-detail')
        .then((res)=>{
            _this.setState({
                nextIdInvoiceDetail:parseInt(res.data[0].id_invoice_detail)+1
            })
        })
        setTimeout(async() => { 
            if(_this.state.userData._json!==undefined){ 
                await api.get('/api/find/email/'+_this.state.userData._json.email).then((res)=>{
                    _this.setState({
                        userId:res.data.id
                    }); 
                })
            }
            else if(_this.state.userData.email!==undefined){
                await api.get('/api/find/email/'+_this.state.userData.email).then((res)=>{
                    _this.setState({
                        userId:res.data.id
                    });
                })
            }
        }, 700);
        await api.get('/api/count-max-order-code')
        .then((res)=>{
            var tempNexOrder=parseInt(res.data[0].maxOrderCode)+1;
            _this.setState({
                nextOrderCode:'INVC'+tempNexOrder
            })
        })
        var tempSubtotal=0;
         
        for (let index = 0; index < this.props.orders.orders.length; index++) {
            tempSubtotal+=this.props.orders.orders[index].quantity*this.props.orders.orders[index].price;
        }
        this.setState({
            subtotal:tempSubtotal
        });
    }
    onChangeTerms=()=>{
        this.setState({
            isValid:!this.state.isValid
        });
    }
    submitPaypalForm=async(e)=>{
        e.preventDefault();
        return new Promise((resolve, reject) => {
            var tempNextHeaderInvoice=this.state.nextHeaderInvoice;
            var _this=this;
            var tempSubtotal=0;
            
            for (let index = 0; index < this.props.orders.orders.length; index++) {
                tempSubtotal+=this.props.orders.orders[index].quantity*this.props.orders.orders[index].price;
            }
            this.setState({
                subtotal:tempSubtotal
            });
            
            if(this.state.isValid){
                var shipping="1";
                var tax="0.15";
                var tempTotal=parseFloat(this.state.subtotal+parseFloat(tax)+parseFloat(shipping));
                cookies.set('restaurant_total', tempTotal);
                
                var date=new Date();
                var todayIs='';
                var currentMonth;
                var headerInvoices=[];
                var invoiceDetails=[];
                if(date.getMonth()<10){
                    currentMonth='0'+date.getMonth();
                }
                else{
                    currentMonth=date.getMonth();
                }
                todayIs=date.getFullYear()+'-'+currentMonth+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                if(this.props.orders){
                    var i=0;
                    var tempNextIdInvoiceDetail=this.state.nextIdInvoiceDetail;
                    var tempNextIdHeader=this.state.nextIdHeader;
                    do{
                        if(this.props.orders.orders[i]!==undefined){
                            var total=this.props.orders.orders[i].quantity*parseFloat(this.props.orders.orders[i].price)
                            var headerInvoice={
                                id_header:tempNextIdHeader,
                                total:total,
                                product_id:this.props.orders.orders[i].id,
                                product_name:this.props.orders.orders[i].name,
                                product_quantity:this.props.orders.orders[i].quantity
                            };
                            var invoiceDetail={
                                id_invoice_detail:tempNextIdInvoiceDetail,
                                client_restaurant:this.state.userId,
                                header_invoice:tempNextHeaderInvoice,
                                order_code:this.state.nextOrderCode,
                                date_of_billing:todayIs
                            }
                            if(this.state.userId>0){
                                tempNextIdHeader++;
                                tempNextIdInvoiceDetail++;
                                tempNextHeaderInvoice++;
                                headerInvoices.push(headerInvoice);
                                invoiceDetails.push(invoiceDetail);
                            }
                        }
                        i++;
                    }
                    while(i<=this.props.orders.orders.length)
                    cookies.set('restaurant_header_invoices', headerInvoices);
                    cookies.set('restaurant_invoice_details', invoiceDetails);
                }
                setTimeout(() => {
                    api.post('/api/pay-with-paypal', {
                        total:parseFloat(tempTotal).toFixed(2),
                        items: this.props.paypalItems.paypalItems,
                        subtotal: parseFloat(this.state.subtotal).toFixed(2),
                        shipping:shipping,
                        tax:tax
                    })
                    .then(function (response) {
                        console.log('Paypal Success');
                        console.log(response);
                        window.location.href =response.data;
                        resolve('resolved');
                    })
                    .catch(function (error) {
                        console.log('An error occurs on post submitPaypalForm()');
                        console.log(error);
                        reject(error)
                    });
                }, 1000);
                
            }
            else{
                resolve('resolved');
            }
        });  
    }
    render(){
        return(
            <div className="form-payment method-to-pay" style={{width:'100%',position:'relative',float:'left'}}>
                <form onSubmit={(e)=>this.submitPaypalForm(e)}>                    
                    <p>To complete the transaction, we will send you to PayPal's secure servers.</p>
                    <button className="btn btn-danger" type="submit">Proceed</button>
                    <span style={{fontSize:'8px'}}>By completing the purchase, you agree to these <a href="#">Terms of Use</a></span>
                    <label className="switch">
                        <input type="checkbox" value={this.state.isValid} onChange={this.onChangeTerms} />
                        <div className="slider-checkbox"></div>
                    </label>
                </form>
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
export default connect(mapStateToProps)(CheckoutPaypalForm);
