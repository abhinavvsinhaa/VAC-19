import React from "react";
import "../styles/basicReg.css";
import firebase from "../firebase";
import "../styles/login.css";

class BasicReg extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      age: "",
      mobile: "",
      verificationId: "",
      idNo: "",
      pincode: "",
      vanAddress: "",
    };
  }

  onHomeFormChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });

    //for getting value of the selected option from dropdown menu
    let idType = document.getElementById("verificationId");
    this.setState({ verificationId: idType.value });
    let van = document.getElementById("vanAddress");
    this.setState({ vanAddress: van.value });
  };

  onHomeFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    let phoneNumber = "+91" + this.state.mobile;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptcha)
      .then((e) => {
        let code = prompt("Please enter your OTP", "");
        if (code === null) {
          return;
        }

        e.confirm(code)
          .then((result) => {
            let requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(this.state),
            };

            fetch("http://localhost:8080/basicreg", requestOptions)
              .then((response) => {
                document.getElementById("successReg").style.visibility =
                  "visible";
              })
              .catch(console.log);
          })
          .catch((err) => {
            document.getElementById("unsuccessReg").style.visibility =
              "visible";
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
            <br />
            <p id="basicRegsubhead">
              Register to get vaccinated at mobile vans.
            </p>
            <form className="basic-regform" onSubmit={this.onHomeFormSubmit}>
              <div class="form-group row">
                <label htmlFor="name" className="form-label col-sm-4">
                  Name
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Vikram Satija"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onHomeFormChange}
                  />
                </div>
              </div>
              <br />
              <div class="form-group row">
                <label for="age" class="form-label col-sm-4">
                  Age
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="21"
                    id="age"
                    required
                    value={this.state.age}
                    onChange={this.onHomeFormChange}
                  />
                </div>
              </div>
              <br />
              <div class="form-group row">
                <label for="mobile" class="form-label col-sm-4">
                  Mobile No.
                </label>
                <div class="col-sm-8">
                  <input
                    type="tel"
                    class="form-control"
                    id="mobile"
                    placeholder="9999999999"
                    required
                    value={this.state.mobile}
                    onChange={this.onHomeFormChange}
                  />
                </div>
              </div>
              <br />
              <div class="form-group row">
                <label for="verificationId" class="form-label col-sm-4">
                  Verif. ID
                </label>
                <div class="col-sm-8">
                  <select
                    class="form-select form-control"
                    id="verificationId"
                    required
                    onChange={this.onHomeFormChange}
                  >
                    <option id="pan">Pan</option>
                    <option id="passport">Passport</option>
                    <option id="aadhar">Aadhar</option>
                    <option id="voterid">Voter ID</option>
                    <option id="dl">Driving License</option>
                  </select>
                </div>
              </div>
              <br />
              <div class="form-group row">
                <label for="idNo" class="form-label col-sm-4">
                  ID No.
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    required
                    class="form-control"
                    id="idNo"
                    value={this.state.idNo}
                    onChange={this.onHomeFormChange}
                  />
                </div>
              </div>
              <br />
              <div class="form-group row">
                <label for="pincode" class="form-label col-sm-4">
                  Pin code
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="pincode"
                    required
                    placeholder="277001"
                    value={this.state.pincode}
                    onChange={this.onHomeFormChange}
                  />
                </div>
              </div>
              <br />
              <div class="form-group row">
                <label for="vanAddress" class="form-label col-sm-4">
                  Choose Van
                </label>
                <div class="col-sm-8">
                  <select
                    class="form-select form-control"
                    id="vanAddress"
                    required
                    onChange={this.onHomeFormChange}
                  >
                    <option id="gurudwara road">Gurudwara road</option>
                    <option id="chandrasekhar nagar">
                      Chandrasekhar nagar
                    </option>
                    <option id="dharahra">Dharahra</option>
                    <option id="nirala nagar">Nirala nagar</option>
                  </select>
                  <br />
                  <button type="submit" class="btn">
                    Register
                  </button>
                </div>
              </div>
            </form>
            <br />
            <div id="recaptcha"></div>
            <br />
            <p id="successReg">✔️ Sucessfully registered!</p>
            <p id="unsuccessReg">❌ User not registered. Recheck your OTP.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicReg;
