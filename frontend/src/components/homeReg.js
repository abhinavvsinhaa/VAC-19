import React from 'react';
import '../styles/basicReg.css';
import firebase from '../firebase';
import '../styles/login.css';

class HomeReg extends React.Component {
    constructor() {
        super();
        this.state = {
            name : '',
            age : '',
            mobile : '',
            verificationId : '',
            idNo : '',
            address : '',
            pincode : '',
            reason: ''
        }
    }

    onBasicFormChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
        let idType = document.getElementById('verificationId');
        this.setState({verificationId: idType.value});
    }
    
    onBasicFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);

        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let phoneNumber = '+91' + this.state.mobile;
        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha)
        .then(e => {
            let code = prompt('Please enter your OTP','');
            if(code === null) {
            return;
            } 

            e.confirm(code)
                .then(result => {
                    console.log(result.user);
                    let requestOptions = {
                        method : 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body : JSON.stringify(this.state)
                    }
            
                    fetch('https://vaccine-server-uiq53.ondigitalocean.app/homereg',requestOptions)
                        .then(response => {
                            document.getElementById('successReg').style.visibility = 'visible';
                        })
                        .catch(console.log)
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
        return(
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12'>
                    <br/>
                    <p id='homeRegsubhead'>Register to get vaccinated at your home.</p>
                    <form className='basic-regform' onSubmit={this.onBasicFormSubmit}>
                    <div class="form-group row">
                        <label htmlFor="name" className="form-label col-sm-4" >Name</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder='Vikram Satija' id="name" required value={this.state.name} onChange={this.onBasicFormChange}/>
                        </div>
                    </div>
                    <br/>
                    <div class="form-group row">
                        <label for="age" class="form-label col-sm-4">Age</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder='21' id="age" required value={this.state.age} onChange={this.onBasicFormChange}/>
                        </div>
                    </div>
                    <br/>
                    <div class="form-group row">
                        <label for="mobile" class="form-label col-sm-4">Mobile No.</label>
                        <div class="col-sm-8">
                        <input type="tel" class="form-control" id="mobile" placeholder ='9999999999' required value={this.state.mobile} onChange={this.onBasicFormChange}/>
                        </div>
                    </div>
                    <br/>
                    <div class="form-group row">
                        <label for="verificationId" class="form-label col-sm-4">Verif. ID</label>
                        <div class="col-sm-8">
                        <select class="form-select form-control" id='verificationId' required onChange={this.onBasicFormChange}>
                                <option id="pan">Pan</option>
                                <option id="passport">Passport</option>
                                <option id="aadhar">Aadhar</option>
                                <option id="voterid">Voter ID</option>
                                <option id="dl">Driving License</option>
                        </select>
                        </div>
                    </div>
                    <br/>
                    <div class="form-group row">
                        <label for="idNo" class="form-label col-sm-4">ID No.</label>
                        <div class="col-sm-8">
                        <input type="text" required class="form-control" id="idNo" value={this.state.idNo} onChange={this.onBasicFormChange}/>
                        </div>
                    </div>
                    <br/>
                    <div class="form-group row">
                        <label for="address" class="form-label col-sm-4">Address</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" id="address" placeholder='Street 2, Viraj Nagar' required value={this.state.address} onChange={this.onBasicFormChange}/>
                        </div>
                    </div>
                    <br/>
                    <div class="form-group row">
                        <label for="pincode" class="form-label col-sm-4">Pin code</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" id="pincode" required placeholder='277001' value={this.state.pincode} onChange={this.onBasicFormChange}/>
                        </div>
                    </div>
                    <br/>
                    <div class="form-group row">
                        <label for="reason" class="form-label col-sm-4">Reason to opt for home reg.</label>
                        <div class="col-sm-8">
                        <textarea class="form-control" id="reason" rows="3" value={this.state.reason} onChange={this.onBasicFormChange}></textarea>
                        <br/>
                        <button type="submit" class="btn">Register</button>
                        </div>
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

export default HomeReg;