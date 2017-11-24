import React, { Component } from 'react';
import {firebaseRef, firebaseStorage} from '../../constants/constants';
import ImageUploader from 'react-firebase-image-uploader';
import validator from 'react-validation';
import myrental from './myrental.css';
import Footer from './../../Footer.js'


const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'require';
  }
};

const email = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`
  }
};


const lt = (value, props) => {
  // get the maxLength from component's props
  if (!value.toString().trim().length > props.maxLength) {
    // Return jsx
    return <span className="error">The value exceeded {props.maxLength} symbols.</span>
  }
};

export default class MyRental extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      street:'',
      city:'',
      state:'',
      country:'',
      zip:'',
      description:'',
      price: '',
      pictures: '',
      uid: '',
      url1: '',
      url2: '',
      url3: '',
      isUploading: false,
      progress: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
  });
  this.showInputError(e.target.name);

}
  handleUploadError=(error)=>{
    this.state.isUploading = false;
    console.error(error);
  }
  handleUploadSuccess = (filename)=>{
    this.state.progress = 100;
    this.state.isUploading = false;
    console.log(this.state);
    this.state.url1 = firebaseStorage.ref('images').child(filename).getDownloadURL().then(function(url) {
      console.log(url);
      return url ;
    }).catch(function(error) {
      // Handle any errors here
    });
    console.log(this.state);
  };
  handleProgress=(progress)=>{
    this.state.progress = progress;
  }
  handleUploadStart=()=>{
    this.state.isUploading = true;
    this.state.progress = 0;
  }
  handleSubmit(e){
    e.preventDefault();
    let isGoodFormat=false;
    if (isGoodFormat){
    const listingRef = firebaseRef.ref('listing');
    const listingEach = {
      Title: this.state.title,
      Address: {
        Street : this.state.street,
        City : this.state.city,
        Country : this.state.country,
        State : this.state.state,
        Zip : this.state.zip
      },
      Price: this.state.price,
      Description: this.state.description,
      url: {
        url1 : this.state.url1.sa,
        url2 : this.state.url2,
        url3 : this.state.url3,
        isUploading : false,
        progress: 0
      }
    }
    listingRef.push(listingEach);
    this.setState({
      title: '',
      address: {
        street:'',
        city:'',
        state:'',
        country:'',
        zip:''
      },
      description:'',
      price: '',
      pictures: '',
      uid: ''
    });
  }
    if (!this.showFormErrors()) {
      console.log('form is invalid: do not submit');
    } else {
      console.log('form is valid: submit');
    }
  }
  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;

    inputs.forEach(input => {
      input.classList.add('active');

      const isInputValid = this.showInputError(input.name);

      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showInputError(refName) {
    const validity = this.refs[refName];
    const label = document.getElementById(`${refName}Label`);
    const error = document.getElementById(`${refName}Error`);
    //const isTitle = refName.indexOf('title') !== -1;
    //const isAddress = refName.indexOf('address') !== -1;
    //const isCity = refName.indexOf('city') !== -1;
    //const isState = refName.indexOf('state') !== -1;
    //const isCountry = refName.indexOf('country') !== -1;
    //const isPrice = refName.indexOf('price') !== -1;
    //const isZip = refName.indexOf('zip') !== -1;
    //onst isDescription = refName.indexOf('description') !== -1;

    if (!validity) {
      if (validity) {
        error.textContent = `${label} is a required field`;
      }
      return false;
    }

    error.textContent = '';
    return true;
  }

  render() {
    return (
      <div id="test1">
        <div className="container" >
          <form  className="form-horizontal" onSubmit={this.handleSubmit}>
            <fieldset><br/><br/>
              <center><h5>Add Rental</h5>
              <div className="form-group">
                <label htmlFor="inputTitle"  className="col-lg-10 control-label " id="title">Title</label>
                <div className="col-lg-10">
                  <input type="text" name="title"  ref="title" className="form-control" placeholder="What your place name?" onChange={this.handleChange} value = {this.state.title}  required/>
                  <div className="error" id="titleError" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputStreet" className="col-lg-10 control-label" id="street">Street Address</label>
                <div className="col-lg-10">
                  <input type="text" name="street" className="form-control" onChange={this.handleChange} value={this.state.street}  required/>
                  <div className="error" id="streetError" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword" className="col-lg-10 control-label" id="city">City</label>
                <div className="col-lg-10">
                  <input type="text" name="city" className="form-control" onChange={this.handleChange} value={this.state.city} required/>
                  <div className="error" id="cityError"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword" className="col-lg-10 control-label">State</label>
                <div className="col-lg-10">
                  <input type="text" name="state" className="form-control" onChange={this.handleChange} value={this.state.state} required/>
                  <div className="error" id="stateError"/>

                </div>
                <div className="col-lg-10">
                <label>Picture:</label>
                    {this.state.isUploading &&
                        <p>Progress: {this.state.progress}</p>
                    }
                    {this.state.url1 &&
                        <img src={this.state.url1} />
                    }
                    <ImageUploader
                        name="avatar"
                        storageRef={firebaseStorage.ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                    </div>
              </div>

              <div className="form-group">
                <label htmlFor="select" className="col-lg-10 control-label">Country</label>
                <div className="col-lg-10">
                  <input type="text" name="country" className="form-control" onChange={this.handleChange} value={this.state.country} required/>
                  <div className="error" id="countryError"/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="select" className="col-lg-10 control-label">Price</label>
                <div className="col-lg-10">
                  <input type="text" name="price" className="form-control" onChange={this.handleChange} value={this.state.price} required/>
                  <div className="error" id="priceError"/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputPassword" className="col-lg-10 control-label">Zip</label>
                <div className="col-lg-10">
                  <input type="text" name="zip" className="form-control" onChange={this.handleChange} value={this.state.zip} required/>
                  <div className="error" id="zipError" style={{  color: "red", fontsize: "12px", margintop: "5px"}}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="textArea" className="col-lg-10 control-label">Description</label>
                <div className="col-lg-10">
                  <textarea className="form-control" rows="3" name="description" onChange={this.handleChange} value={this.state.description} required/>
                  <span className="help-block">A longer block of help text that breaks onto a new line and may extend beyond one line.</span>
                </div>
              </div>

              <div className="form-group">
                <div className="col-lg-10 col-lg-offset-10">
                  <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </div>
              </div></center>
            </fieldset>
          </form>
        </div>

          <section className='display-item'>
            <div className='Wrapper'>
              <ul>
              </ul>
            </div>
          </section>
          <Footer/>
        </div>
    );
  }
}
