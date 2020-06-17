import React from 'react';
import $ from 'jquery';
import api from '../../apis/api';
import {connect} from 'react-redux';
import history from '../../history';
import {getOrders,deleteOrders} from '../../actions/cartActions';
class CheckoutForm extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            userData:'',
            userId:0,
            nextHeaderInvoice:0,
            nextIdInvoiceDetail:0,
            nextIdHeader:0,
            nextOrderCode:'',
            errorCardNumber: 'Invalid Card Number.',
            errorMonth:'Invalid number for month.',
            errorYear:'Invalid number for year.',
            errorDate:'Enter a valid expiration date.',
            errorCvc:'Invalid number for cvc',
            errorNameOnCard:'Enter your name exactly as it appears on your card.',
            errorPostalCode:'Invalid number for postal code'
        }
    }
    onChangeCvc=(e)=>{
        var currentValue=e.target.value;
        if(!isNaN(parseInt(currentValue))===true){
            this.setState({
                errorCvc: ''
            });
        }
        else{
            this.setState({
                errorCvc: 'Enter a valid number.'
            });
        }
    }
    onChangeYear=(e)=>{
        var currentValue=e.target.value;
        if(!isNaN(parseInt(currentValue))===true){
            this.setState({
                errorYear: ''
            });
            if(this.state.errorMonth===''){
                this.setState({
                    errorDate:''
                });
            }
        }
        else{
            this.setState({
                errorYear: 'Enter a valid expiration date.',
                errorDate:'Enter a valid expiration date.'
            });
        }
    }
    onChangeMonth=(event)=>{
        var currentValue=event.target.value;
        if(!isNaN(parseInt(currentValue))===true ){
            this.setState({
                errorMonth: ''
            });
            if(this.state.errorYear===''){
                this.setState({
                    errorDate:''
                });
            }
        }
        else{
            this.setState({
                errorMonth: 'Enter a valid expiration date.',
                errorDate:'Enter a valid expiration date.'
            });
        }
    }
    onChangeNumberCard=(event)=>{
        var currentValue=event.target.value;
        if(!isNaN(currentValue)===true){
            this.setState({
                errorCardNumber: ''
            });
        }
        else{
            this.setState({
                errorCardNumber: 'Please enter a valid Card Number.'
            });
        }
        if(currentValue===''||currentValue===null||currentValue===undefined){
            this.setState({
                errorCardNumber: 'Please enter a Card Number.'
            });
        }
    }
    onChangeNameOnCard=(e)=>{
        var currentValue=e.target.value;
        if(currentValue===''){
            this.setState({
                errorNameOnCard: 'Enter your name exactly as it appears on your card.'
            });
        }
        else{
            this.setState({
                errorNameOnCard: ''
            });
        }
    }
    onChangePostalCode=(e)=>{
        var currentValue=e.target.value;
        if(!isNaN(currentValue)===true){
            this.setState({
                errorPostalCode: ''
            });
        }
        else{
            this.setState({
                errorPostalCode: 'Please enter a valid Postal Code.'
            });
        }
    }
    onSubmitCheckoutForm=async (event)=>{
        event.preventDefault();
        var tempNextHeaderInvoice=this.state.nextHeaderInvoice;
        var _this=this;
        if(this.state.errorDate!==''){
            $('.error-date').css({'display':'block'});
        }
        else{
            $('.error-date').css({'display':'none'});
        }
        if(this.state.errorPostalCode!==''){
            $('.error-postal-code').css({'display':'block'}); 
        }
        else{
            $('.error-postal-code').css({'display':'none'});
        }
        if(this.state.errorNameOnCard!==''){
            $('.error-name-on-card').css({'display':'block'}); 
        }
        else{
            $('.error-name-on-card').css({'display':'none'}); 
        }
        if(this.state.errorCvc!==''){
            $('.error-cvc').css({'display':'block'});    
        }
        else{
            $('.error-cvc').css({'display':'none'});  
        }
        if(this.state.errorCardNumber!==''){
            $('.error-card-numb').css({'display':'block'});
        }
        else{
            $('.error-card-numb').css({'display':'none'});
        }
        if(this.state.errorCardNumber===''&&this.state.errorPostalCode===''
        && this.state.errorNameOnCard===''&& this.state.errorCvc===''
        && this.state.errorDate===''){
            var date=new Date();
            var todayIs='';
            var total=0;
            var currentMonth;
            document.querySelector('#checkout_payment_form .btn-danger').classList.toggle('running');
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
                            console.log('this.state.userId');
                            console.log(this.state.userId);
                            await api.post('/api/add/header-invoice',{headerInvoice})
                            .then(res=>{
                                console.log('headerInvoice created ');
                                console.log(res);
                            })
                            .catch(err=>{
                                console.log('An error occurs on post(/api/add/header-invoice)');
                                console.error(err);
                            })
                            await api.post('/api/add/invoice',{invoiceDetail})
                            .then(res=>{
                                console.log('Invoice created '+res);
                            })
                            .catch(err=>{
                                console.log('An error occurs on post(/api/add/invoice)');
                                console.error(err);
                            })
                            tempNextIdHeader++;
                            tempNextIdInvoiceDetail++;
                            tempNextHeaderInvoice++;
                        }
                    }
                    i++;
                }
                while(i<=this.props.orders.orders.length)
                setTimeout(() => {
                    console.log('Finished Payment Transaction');
                    history.push('/payment-successfully')
                    _this.props.deleteOrders();
                    _this.props.getOrders();
                }, 3900);
            }
        }
    }
    componentDidMount=async ()=>{
        var _this=this;
        await api.get('/api/user/info')
        .then((res)=>{
            _this.setState({
                userData:res.data
            });
        });
        await api.get('/api/invoice-detail/get-last')
        .then((res)=>{
            _this.setState({
                nextHeaderInvoice:parseInt(res.data[0].header_invoice)+1
            })
        }); 
        await api.get('/api/header-invoice/get-last-header-id')
        .then((res)=>{
            _this.setState({
                nextIdHeader:parseInt(res.data[0].id_header)+1
            })
        });
        await api.get('/api/invoice-detail/get-last-id-invoice-detail')
        .then((res)=>{
            _this.setState({
                nextIdInvoiceDetail:parseInt(res.data[0].id_invoice_detail)+1
            })
        });
        setTimeout(async() => {
                await api.get('/api/find/email/'+_this.state.userData.email).then((res)=>{
                    _this.setState({
                        userId:res.data.id
                    });
                });
        }, 700);
        await api.get('/api/count-max-order-code')
        .then((res)=>{
            var tempNexOrder=parseInt(res.data[0].maxOrderCode)+1;
            _this.setState({
                nextOrderCode:'INVC'+tempNexOrder
            })
        });
    }
    renderYears=()=>{
        var currentYear= new Date().getFullYear();
        var maxYears=new Date().getFullYear()+30;
        var options=[];
        for (let index = currentYear; index <= maxYears; index++) {
            options.push(<option value={index}>{index}</option>);
        }
        return(
            <React.Fragment>
                <select name="year" id="year" style={{marginLeft:'20px'}} onChange={(e)=>this.onChangeYear(e)}>
                    <option value="year" selected>Year</option>
                    {options}
                </select>
            </React.Fragment>
        )
    }
    render(){
        return(
            <form onSubmit={(event)=>this.onSubmitCheckoutForm(event)} id="checkout_payment_form">
                <div className="form-group">
                    <input type="text" name="card-number" id="card-number" placeholder="Card Number" onChange={(event)=>this.onChangeNumberCard(event)}/>
                </div>
                <p className="error-msg error-card-numb" style={{display:'none',margin:'0 0px 20px 0'}}>
                    {this.state.errorCardNumber}
                </p>
                <div style={{width:'95px',position:'relative',float:'left'}} className="form-group">
                    <select name="month" id="month"
                        style={{marginLeft:'10px'}}
                        onChange={this.onChangeMonth}>
                        <option value="month">Month</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>

                <div className="form-group" style={{width:'80px',position:'relative',float:'left'}}>
                    {this.renderYears()}
                </div>
                <div className="form-group" style={{width:'155px',position:'relative',float:'left'}}>
                    <input type="password" name="cvc" id="cvc" placeholder="CVC" style={{width:'110px',margin:'0px 0px 0px 35px'}} minlength="3" maxlength="3" onChange={(e)=>this.onChangeCvc(e)} />
                </div>
                <p className="error-msg error-date" style={{display:'none',height: '15px',lineHeight: 1,width: '270px',position: 'relative',float: 'left'}}>
                    {this.state.errorDate}
                </p>
                <p className="error-msg error-cvc" style={{display:'none',height: '15px',lineHeight: 1,width: '270px',position: 'relative',float: 'left'}}>
                    {this.state.errorCvc}
                </p>
                <div className="form-group" style={{width:'100%',position:'relative',float:'left'}}>
                    <input type="text" name="card-name" id="card-name" placeholder="Name on Card" onChange={(e)=>this.onChangeNameOnCard(e)}/>
                </div>
                <p className="error-msg error-name-on-card" style={{display:'none',lineHeight: 1,width: '100%',position: 'relative',float: 'left'}}>
                    {this.state.errorNameOnCard}
                </p>
                <div className="form-group" style={{width:'150px',position:'relative',float:'left'}}>
                    <input type="text" name="country" id="country" value="Costa Rica" readonly/>
                </div>
                <div className="form-group" style={{width:'150px',position:'relative',float:'left'}}>
                    <input type="text" name="postal-code" id="postal-code" placeholder="Postal Code" style={{margin:'5px 0px 0px 30px'}}
                    onChange={(e)=>this.onChangePostalCode(e)}/>    
                </div>
                <p className="error-msg error-postal-code" style={{display:'none',position: 'relative',float: 'left',height:'15px',marginLeft:'180px'}}>
                        {this.state.errorPostalCode}
                </p>
                <div style={{width:'100%',position:'relative',float:'left'}}>
                    <button type="submit" className="btn btn-danger  ld-ext-right">
                        Make Payment
                        <div className="ld ld-ring ld-spin"></div>
                    </button>
                </div>
            </form>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders
    }
}
export default connect(mapStateToProps,{getOrders,deleteOrders})(CheckoutForm);