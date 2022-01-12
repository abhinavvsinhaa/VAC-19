import React from 'react';
import firebase from '../firebase';
import '../styles/login.css';

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            phone: ''
        }
    }

    getPhone = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    handleLogin = (e) => {
        e.preventDefault();
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let phoneNumber = '+91' + this.state.phone;
        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha)
        .then(e => {
            let code = prompt('Please enter your OTP','');
            if(code === null) {
            return;
            } 

            e.confirm(code)
                .then(result => {
                    console.log(result.user);
                    
                    document.getElementById('successReg').style.visibility = 'visible';
                })
                .catch(err => {
                    document.getElementById('unsuccessReg').style.visibility = 'visible';
                })
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="container">
                <div className = "row justify-content-center">
                <div className = 'col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12'>
                    <p id='enterPhone'>Enter phone number to continue with registration.</p>
                    <br/>
                    <form className='row' onSubmit={this.handleLogin}>
                        <div className="col-md-9 col-lg-9 col-xl-9 col-sm-9 col-9">
                            <input type="text" class="form-control" id="phone" value={this.state.phone} onChange={this.getPhone}/>
                        </div>
                        <div className = "col-md-3 col-lg-3 col-xl-3 col-sm-3 col-3">
                            <button type='submit' className="btn btn-dark">Register</button>
                        </div>
                    </form>
                    <br/>
                    <div id='recaptcha'></div>
                    <br/>
                    <p id='successReg'>✔️ Sucessfully registered!</p>
                    <p id='unsuccessReg'>❌ User not registered. Recheck your OTP.</p>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;