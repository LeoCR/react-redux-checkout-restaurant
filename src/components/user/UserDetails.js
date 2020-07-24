import React from "react";
import {connect} from "react-redux";
const UserDetails=props=>{
    const logOut=(e)=>{
        if(e){
            e.preventDefault();
        }
        window.location.replace("/logout");
    }
    const getProfile=(e)=>{
        if(e){
            e.preventDefault();
        }
        window.location.replace('/user/profile/');
    } 
    return(
        <React.Fragment>
                <div className="container-user-details" style={{margin:'20px 50px'}}>
                    {props.user.username  ? <p>Username: {props.user.username}</p>:''}

                    {props.user.firstname ? <p>First Name: {props.user.firstname}</p>:''}

                    {props.user.lastname ? <p>Last Name: {props.user.lastname}</p>:''}

                    {props.user.email ? <p>Email: {props.user.email}</p>:'' }

                    <button id="btn-logout" onClick={(e)=>logOut(e)} className="btn btn-danger">
                        Logout
                    </button>
                    <button onClick={(e)=>getProfile(e)} className="btn btn-success">Profile</button>
                </div>
        </React.Fragment>
    )
}
const mapStateToProps=(state)=>{
    return{
      user:state.user.user
    }
}
export default connect(mapStateToProps)(UserDetails);