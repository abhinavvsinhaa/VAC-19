import React from 'react';
import '../styles/basicReg.css';

class BasicReg extends React.Component {
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
        
        let requestOptions = {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(this.state)
        }

        fetch('http://localhost:8080/',requestOptions)
            .then(response => response.json())
            .then(console.log)
            .catch(console.log)
    }
    
    render() {
        return(
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12'>
                    <br/>
                    <p>Register to get vaccinated at your home.</p>
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
                        </div>
                    </div>
                    <br/>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form> 
                    </div>
                </div>
            </div>
        );
    }
}

export default BasicReg;