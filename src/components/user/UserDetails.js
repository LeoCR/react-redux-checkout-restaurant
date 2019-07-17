import React from "react";
import {connect} from "react-redux";
class UserDetails extends React.Component{
    componentDidMount(){
        console.log('UserDetails componentDidMount this.props');
        var _this=this;
        setTimeout(() => {
            console.log(_this.props);
        }, 900);
    }
    logOut=(e)=>{
        e.preventDefault();
        localStorage.clear();
        window.location.replace("/logout");
    }
    render(){
        try {
            if(this.props.user._json===null && this.props.user!==null){
                return(
                    <React.Fragment>
                        <div className="container-user-details" style={{margin:'20px 50px'}}>
                            {this.props.user.username  ? <p>Username: {this.props.user.username}</p>:''}
        
                            {this.props.user.firstname ? <p>First Name: {this.props.user.firstname}</p>:''}
        
                            {this.props.user.lastname ? <p>Last Name: {this.props.user.lastname}</p>:''}
        
                            {this.props.user.email ? <p>Email: {this.props.user.email}</p>:'' }
        
                            <button id="btn-logout" onClick={(e)=>this.logOut(e)} className="btn btn-danger">
                                Logout
                            </button>
                        </div>
                    </React.Fragment>
                )
            }
            else if(this.props.user._json!==null){
                return(
                    <React.Fragment>
                        <div className="container-user-details" style={{margin:'20px 50px'}}>
                            
                            {this.props.user._json.name ?  <p>Userame: {this.props.user._json.name} </p>: ''}
                            {this.props.user._json.first_name?<p>First Name: {this.props.user._json.first_name}</p>:''}
                            {this.props.user._json.last_name?<p>Last Name: {this.props.user._json.last_name}</p>:'' }
                            {this.props.user._json.email?<p>Email: {this.props.user._json.email}</p>:''}
                            {this.props.user.provider?<p>Provider: {this.props.user.provider}</p>:''}
                            <button id="btn-logout" onClick={(e)=>this.logOut(e)} className="btn btn-danger">
                                Logout
                            </button>
                        </div>
                    </React.Fragment>
                )
            }
            else{
                return(
                    <React.Fragment>
                        <div className="container-user-details" style={{margin:'20px 50px'}}>
                            {this.props.user.username  ? <p>Username: {this.props.user.username}</p>:''}
    
                            {this.props.user.firstname ? <p>First Name: {this.props.user.firstname}</p>:''}
    
                            {this.props.user.lastname ? <p>Last Name: {this.props.user.lastname}</p>:''}
    
                            {this.props.user.email ? <p>Email: {this.props.user.email}</p>:'' }
    
                            <button id="btn-logout" onClick={(e)=>this.logOut(e)} className="btn btn-danger">
                                Logout
                            </button>
                        </div>
                    </React.Fragment>
                )
            }
        } catch (error) {
            return(
                <React.Fragment>
                        <div className="container-user-details" style={{margin:'20px 50px'}}>
                            {this.props.user.username  ? <p>Username: {this.props.user.username}</p>:''}
    
                            {this.props.user.firstname ? <p>First Name: {this.props.user.firstname}</p>:''}
    
                            {this.props.user.lastname ? <p>Last Name: {this.props.user.lastname}</p>:''}
    
                            {this.props.user.email ? <p>Email: {this.props.user.email}</p>:'' }
    
                            <button id="btn-logout" onClick={(e)=>this.logOut(e)} className="btn btn-danger">
                                Logout
                            </button>
                        </div>
                </React.Fragment>
            )
        }
    }
}
const mapStateToProps=(state)=>{
    return{
      user:state.user.user
    }
}
export default connect(mapStateToProps)(UserDetails);