import React from 'react';
import '../styles/register.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeReg from './homeReg';
import BasicReg from './basicReg';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            path: ''
        }
    }

    // onRouteChange = () => {
    //     let route = this.props.location.pathname;
    //     route.toString();
    //     console.log(route);
    //     if(route === '/register/') {
    //         document.getElementById('basiclink').style.borderTop = 'none';
    //     } else if(route === '/register/basic'){
    //         document.getElementById('homelink').style.border = 'none';
    //     }
    // }

    render() {
        return(
            <BrowserRouter>
            <div className="container register">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                    <ul className="nav nav-tabs">
                        <li className="nav-item itemcustom" id="homelink">
                            <a className="nav-link reglink " aria-current="page" href="/register" >Home Registration</a>
                        </li>
                        <li className="nav-item" id="basiclink">
                            <a className="nav-link reglink " href="/register/basic">Basic Registration</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <Switch>
                <Route exact path = '/register/' component={HomeReg}/>
                <Route path = '/register/basic' component={BasicReg}/>
            </Switch>
            </BrowserRouter>
        );
    }
}

export default Register;