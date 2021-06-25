import React from 'react';


const BasicReg = () => {
    return(
        <div className='container'>
            <div className='row'>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                <form>
                    <div class="mb-3">
                        <label htmlFor="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name"/>
                    </div>
                    <div class="mb-3">
                        <label for="age" class="form-label">Age</label>
                        <input type="text" class="form-control" id="age"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className = 'mb-3'>
                        <label for="idType" class="form-label">Verification ID</label>
                        <select class="form-select form-control" id='idType'>
                            <option value="pan">Pan</option>
                            <option value="passport">Passport</option>
                            <option value="aadhar">Aadhar</option>
                            <option value="voterid">Voter ID</option>
                            <option value="dl">Driving License</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="idNo" class="form-label">ID No.</label>
                        <input type="text" class="form-control" id="idNo"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form> 
                </div>
            </div>
        </div>
    );
}

export default BasicReg;