import React from 'react';
import Pdf from "react-to-pdf";
import '../styles/profile.css';

const ref = React.createRef();

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            idNo : '',
            mobile: '',
            basicReg: {
                vaccineName: '',
                firstDose: '',
                seconDose: '',
                name: '',
                age: '',
                mobileNo: '',
                idType: '',
                idNo: '',
                pincode: ''
            },
            homeReg: {
                vaccineName: '',
                firstDose: '',
                seconDose: '',
                name: '',
                age: '',
                mobileNo: '',
                idType: '',
                idNo: '',
                address : '',
                pincode : '',
                reason : ''
            },
            found: false, 
            basic: false,
            home: false 
        }
    }

    onProfileFormChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    onProfileFormSubmit = (event) => {
        event.preventDefault();
        fetch(`hhttps://vaccine-server-uiq53.ondigitalocean.app/getdetailsBasic?idNo=${this.state.idNo}&mobile=${this.state.mobile}`)
        .then(response => response.json())
        .then(result => {
            this.setState({basicReg: {
                vaccineName: result.vaccine_name,
                firstDose: result.first_dose,
                secondDose: result.second_dose,
                name: result.name,
                age: result.age,
                mobile: result.mobile,
                idType: result.verification_id,
                idNo: result.id_no,
                pincode: result.pincode
            }})
            this.setState({found: true})
            this.setState({basic: true})
            console.log(this.state.basicReg)
        })
        .catch(console.log)

        fetch(`https://vaccine-server-uiq53.ondigitalocean.app/getdetailsHome?idNo=${this.state.idNo}&mobile=${this.state.mobile}`)
        .then(response => response.json())
        .then(result => {
            this.setState({homeReg: {
                vaccineName: result.vaccine_name,
                firstDose: result.first_dose,
                secondDose: result.second_dose,
                name: result.name,
                age: result.age,
                mobile: result.mobile,
                idType: result.verification_id,
                idNo: result.id_no,
                address: result.address,
                reason: result.reason,
                pincode: result.pincode
            }})
            this.setState({found: true})
            this.setState({home: true})
            console.log(this.state.homeReg)
        })    
        .catch(console.log)
    }
    
    render() {
        return(
            <div className="container profile">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                        <p id='enterPhone'>Enter details to get all your registration and vaccination details!</p>
                        <br/>
                        <form className='basic-regform' onSubmit={this.onProfileFormSubmit}>
                        <div class="form-group row">
                            <label htmlFor="idNo" className="form-label col-sm-4" >Verification ID No.</label>
                            <div class="col-sm-8">
                            <input type="text" class="form-control" placeholder='853867941231' id="idNo" required value={this.state.idNo} onChange={this.onProfileFormChange}/>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label htmlFor="mobile" className="form-label col-sm-4" >Mobile No.</label>
                            <div class="col-sm-8">
                            <input type="mobile" class="form-control" placeholder='9999999999' id="mobile" required value={this.state.mobile} onChange={this.onProfileFormChange}/>
                            <br/>
                            <button type="submit" className="btn ">Submit & Generate PDF</button>
                            </div>
                        </div>
                        <br/>
                        </form>
                        <br/><br/>
                        {
                        (this.state.found===true) 
                        ?
                        <div className="pdf">
                        <div ref={ref} className='pdfinner'>
                            <p style={{textAlign: 'center'}}><span style={{fontSize: "24px"}}><strong><span style={{color: 'rgb(85, 57, 130)'}}>Vaccination Covid-19</span></strong></span></p>
                            <p style={{textAlign: 'center', fontStyle: 'italic'}}>An initiative to vaccinate each and every Indian.</p>
                            <p style={{textAlign: 'center'}}><br/></p>
                            {(this.state.basic === true) ?
                            <>
                            <p id='details'>Basic Registration: </p>
                            <br/>
                            <ol className="list">
                                <p id='subdetails'>Personal Details:</p>
                                <li>Name - {this.state.basicReg.name}</li>
                                <li>Age - {this.state.basicReg.age}</li>
                                <li>Mobile - {this.state.basicReg.mobile}</li>
                                <li>Verification ID - {this.state.basicReg.idType}</li>
                                <li>Verification ID No. - {this.state.basicReg.idNo}</li>
                                <li>Pin code - {this.state.homeReg.pincode}</li>
                                <br/>
                                <p id='subdetails'>Vaccination Details: </p>
                                <li>Vaccine - {this.state.basicReg.vaccineName}</li>
                                <li>First Dose - {this.state.basicReg.firstDose}</li>
                                <li>Second Dose - {this.state.basicReg.seconDose}</li>
                            </ol>
                            <br/>
                            </>
                            :<></>
                            }
                            {(this.state.home === true) ?
                            <>
                            <p id='details'>Home Registration: </p>
                            <br/>
                            <ol className="list">
                                <p id='subdetails'>Personal Details:</p>
                                <li>Name - {this.state.homeReg.name}</li>
                                <li>Age - {this.state.homeReg.age}</li>
                                <li>Mobile - {this.state.homeReg.mobile}</li>
                                <li>Verification ID - {this.state.homeReg.idType}</li>
                                <li>Verification ID No. - {this.state.homeReg.idNo}</li>
                                <li>Address - {this.state.homeReg.address}</li>
                                <li>Pin code - {this.state.homeReg.pincode}</li>
                                <br/>
                                <p id='subdetails'>Vaccination Details: </p>
                                <li>Vaccine - {this.state.homeReg.vaccineName}</li>
                                <li>First Dose - {this.state.homeReg.firstDose}</li>
                                <li>Second Dose - {this.state.homeReg.seconDose}</li>
                            </ol>
                            <br/>
                            <p id='endDoc'>--End of Document--</p>
                            </>
                            :<></>
                            }
                        </div>
                        <br/>
                        <Pdf targetRef={ref} filename="vaccination-details.pdf">
                        {({ toPdf }) => <button id='downPdf' className='btn' onClick={toPdf}>Download Pdf</button>}
                        </Pdf>
                        </div>
                        :
                        <></>
                    } 
                    </div> 
                </div> 
            </div>
        );
    }
}

export default Profile;