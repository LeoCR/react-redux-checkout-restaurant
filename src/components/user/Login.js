import React from "react";
import $ from 'jquery';
import ReactDOM from 'react-dom';
import api from '../../apis/api';
class Login extends React.Component{
    showLogin=async (e)=>{
        console.log('ShowLogin');
        e.preventDefault();
        var isAuthenticathed=false;
        var _this=this;
        await api.get('/api/validate/authentication')
        .then(function (response) {
            isAuthenticathed=response.data.isAuthenticated;
            if(isAuthenticathed){
                _this.props.setShowUserDetails();
            }
            else{
                _this.props.setShowLogin();
            }
        })
        .catch(function (error) {
            console.log("An error occurs in Login.showLogin(): ");
            console.log(error);
        });
        setTimeout(() => {
            $('body').toggleClass('modal-opened');
            $('.modal').css({'display':'block'});
        }, 400);
    }
    render(){
        return ReactDOM.createPortal(
            <React.Fragment>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    data-xmlns-xlink="http://www.w3.org/1999/xlink"
                    version="1.1" viewBox="0 -256 1792 1792" 
                    onClick={(e)=>this.showLogin(e)}
                    style={{width:"50px",position:'relative',float:'right',
                    height:'68px',cursor:'pointer'}}>
                        <g transform="matrix(1,0,0,-1,197.42373,1300.6102)">
                            <path 
                                d="M 1408,131 Q 1408,11 1335,-58.5 1262,-128 1141,-128 H 267 Q 146,-128 73,-58.5 0,11 0,131 0,184 3.5,234.5 7,285 17.5,343.5 28,402 44,452 q 16,50 43,97.5 27,47.5 62,81 35,33.5 85.5,53.5 50.5,20 111.5,20 9,0 42,-21.5 33,-21.5 74.5,-48 41.5,-26.5 108,-48 Q 637,565 704,565 q 67,0 133.5,21.5 66.5,21.5 108,48 41.5,26.5 74.5,48 33,21.5 42,21.5 61,0 111.5,-20 50.5,-20 85.5,-53.5 35,-33.5 62,-81 27,-47.5 43,-97.5 16,-50 26.5,-108.5 10.5,-58.5 14,-109 Q 1408,184 1408,131 z m -320,893 Q 1088,865 975.5,752.5 863,640 704,640 545,640 432.5,752.5 320,865 320,1024 320,1183 432.5,1295.5 545,1408 704,1408 863,1408 975.5,1295.5 1088,1183 1088,1024 z"
                            />
                        </g>
                    </svg>
            </React.Fragment>,
            document.querySelector("#login-user")
        )
    }
}
export default Login;