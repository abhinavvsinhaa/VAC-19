import React from 'react';
import firebase from '../firebase';
import '../styles/login.css';

class Login extends React.Component {

    handleLogin = (e) => {
        e.preventDefault();
        console.log('hello');
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let phoneNumber = '+919839926626';
        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha)
        .then(e => {
            let code = prompt('enter the otp','');
            if(code === null) {
            return;
            } 

            e.confirm(code)
            .then(result => {
                console.log(result.user);
            })
            .catch(console.log)
            // ...  
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className='login container'>
                <div className='row justify-content-center'>
                <form className='loginform col-6'>
                    <div className="form-floating mb-3">
                        <input type="tel" className="form-control" id="mobile" placeholder="9999999999"/>
                        <label htmlFor="floatingInput">Phone Number</label>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleLogin}>Get OTP</button>
                    <br/><br/>
                    <div id='recaptcha'></div>
                </form>
                </div>
            </div>
        );
    }
}

export default Login;