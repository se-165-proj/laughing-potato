import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import PropTypes from 'prop-types';


class Payments extends Component {
  constructor (props) {
  super(props);
  this.state = {
    price: [],
    transactionID: [],
  };

}

componentWillMount() {
  var recievedPrice = this.props.location.state.prices;
  this.setState({ recievedPrice: this.state.price});
  
  console.log("Price received from reservation: " + recievedPrice);
  console.log("Price received from reservation: " + this.state.price);
  
}


  render(){
     
		const onSuccess = (payment) => {
			// Congratulation, it came here means everything's fine!
            		console.log("The payment was succeeded!", payment);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
		}		
		
		const onCancel = (data) => {
			// User pressed "cancel" or close Paypal's popup!
			console.log('The payment was cancelled!', data);
			// You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
		}	
		
		const onError = (err) => {
			// The main Paypal's script cannot be loaded or somethings block the loading of that script!
			console.log("Error!", err);
			// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
			// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			
		}			
			
		let env = 'sandbox'; // you can set here to 'production' for production
		let currency = 'USD'; // or you can set this value from your props or state  
		let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
		// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
		const client = {
			sandbox: 'AYGRiwreWqinAZ1Sxo_XyZc1aoHwhtkBT7Ou0QWxaOcxeaPU0Q90nzQUwjC_4kD5-tXyAGKinVy5U6qY'// add your sandbox key here!
		}
		// In order to get production's app-ID, you will have to send your app to Paypal for approval first
		// For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"): 
		//   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
		// For production app-ID:
		//   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/		
		
		// NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!		  
        
    return(
      <div className="form-group" >
        <br/>
        <br/>
        <center>
          <div className="container" style={{background: "white"}}>
          <button className="btn btn-primary btn-block">Order Summary

          </button>
          <div className="row" >


              <div className="form-group" style={{background: "white", padding: "20px"}}>
                <h5>Booking Details: </h5> 
                <center>
                  <span style={{padding:"10px"}}>
                  <span style={{padding:"10px"}}></span>
                  <p>Earn 200 points when booking this room </p> 
                  <p>............................................................ </p> 
                  <p>Items (${this.props.location.state.prices} x1): ...........................${this.props.location.state.prices}</p>

                  <p>Total amount to pay: ...................${this.props.location.state.prices}</p>
                  </span>
                </center>
              </div>

              <hr/>
              <br/>

              <div className="form-group" style={{background: "white", padding: "20px"}}>
                <h5>Please Checkout with Paypal</h5>
                <br/><br/>
                <PaypalExpressBtn 
                  env={env} 
                  client={client} 
                  currency={currency} 
                  total={total}  
                  onError={onError} 
                  onSuccess={onSuccess} 
                  onCancel={onCancel} />
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  }
}
export default Payments;
