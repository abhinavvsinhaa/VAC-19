import React from 'react';
import '../styles/available.css';

class Availabile extends React.Component {
    constructor() {
        super();
        this.state = { 
            pincode : '',
            vans : [],
            van : {
                sno : '',
                address: '',
                availability : '',
                registration : ''
            }
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onFetch = this.onFetch.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onFetch = (result) => {
        for(let i = 0; i < result.length; i++) {
            this.setState({van : {
                sno: result[i].sno,
                address: result[i].address,
                available: result[i].availability,
                registration: result[i].registration 
            }})

            this.setState({vans : [...this.state.vans,this.state.van]})

            this.setState({van : {
                sno: '',
                address: '',
                available: '',
                registration: ''
            }})
        }

        console.log(this.state.vans);
    }

    onChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    onSubmit = (event) => {
        console.log(this.state.pincode);
        event.preventDefault();

        let requestOptions = {
            method: 'GET'
        };

        fetch(`http://localhost:8080/?pincode=${this.state.pincode}`,requestOptions)
            .then(response => response.json())
            .then(result => {
                this.onFetch(result);
               
            })
            .catch(console.log)
    }

    render() {
        return(
            <div className = 'container find'>
                {/* Pincode form col to find avaialable vans  */}
                <div className = 'row justify-content-center'>
                    <div className = 'col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12'>
                        <p id = 'enterpin'>
                            Enter your pincode to find mobile vans in different localities near you.
                        </p>
                        <form className='row' onSubmit={this.onSubmit}>
                        <div className="col-md-9 col-lg-9 col-xl-9 col-sm-9 col-9">
                            <input type="text" class="form-control" id="pincode" value={this.state.pincode} onChange={this.onChange}/>
                        </div>
                        <div className = "col-md-3 col-lg-3 col-xl-3 col-sm-3 col-3">
                            <button type='submit' className="btn btn-dark findBtn">Find</button>
                        </div>
                        </form>
                    </div>
                </div>
                {/* Available Vaccination vans */}
                <div className='row justify-content-center'>
                    <div className= 'col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12'>
                    <br/><br/>
                    <p className= 'vansInLocality'>Vans in your locality</p>
                    <br/>
                    {this.state.vans.map(v => {
                        return (
                        <>    
                        <div class="card">
                            <div class="card-header">
                                Van {v.sno}
                            </div>
                            <div class="card-body">
                                <p class="card-text">{v.address}
                                <span class="badge rounded-pill bg-custom">Closed</span>
                                </p>
                            </div>
                        </div>
                        <br/>
                        </>
                        );
                    })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Availabile;