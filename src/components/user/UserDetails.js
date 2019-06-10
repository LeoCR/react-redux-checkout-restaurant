import React from "react";
class UserDetails extends React.Component{
    logOut=(e)=>{
        e.preventDefault();
        window.location.replace("/logout");
    }
    render(){
        if(this.props.userLogged._json!==undefined){
            return(
                <React.Fragment>
                    <div className="container-user-details" style={{margin:'20px 50px'}}>
                        {this.props.userLogged._json.name ?  <p>Userame: {this.props.userLogged._json.name} </p>: ''}
                        {this.props.userLogged._json.first_name?<p>First Name: {this.props.userLogged._json.first_name}</p>:''}
                        {this.props.userLogged._json.last_name?<p>Last Name: {this.props.userLogged._json.last_name}</p>:'' }
                        {this.props.userLogged._json.email?<p>Email: {this.props.userLogged._json.email}</p>:''}
                        {this.props.userLogged.provider?<p>Provider: {this.props.userLogged.provider}</p>:''}
                        <button id="btn-logout" onClick={(e)=>this.logOut(e)} className="btn btn-danger">
                            Logout
                        </button>
                    </div>
                </React.Fragment>
            )
        }
        else {
                return(
                    <React.Fragment>
                        <div className="container-user-details" style={{margin:'20px 50px'}}>
                            {this.props.userLogged.username  ? <p>Username: {this.props.userLogged.username}</p>:''}
                            {this.props.userLogged.firstname ? <p>First Name: {this.props.userLogged.firstname}</p>:''}
                            {this.props.userLogged.lastname ? <p>Last Name: {this.props.userLogged.lastname}</p>:''}
                            {this.props.userLogged.email ? <p>Email: {this.props.userLogged.email}</p>:'' }
                            <button id="btn-logout" onClick={(e)=>this.logOut(e)} className="btn btn-danger">
                                Logout
                            </button>
                        </div>
                    </React.Fragment>
                )
        } 
    }
}
export default UserDetails;