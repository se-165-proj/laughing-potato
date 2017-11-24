import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import saveUser from './../../auth/auth'
import {firebaseRef} from './../../constants/constants';
import firebase from 'firebase'


export default class MyTrips extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        checkIn: [],
        checkOut: [],
        pid: [],
        tid: [],
        price: [],
        value: 0,
      };
    }
    
    componentWillMount() {
      if (firebase.auth().currentUser === null) {
        console.log("this is current userID: ");
        
      }
      firebase.auth().onAuthStateChanged(function(user){
        if (user) {

          console.log("this is userID: "+user.uid);
          var userRefPay = firebaseRef.ref('users/'+user.uid+"/Payments");
          var userRefRes = firebaseRef.ref('users/'+user.uid+"/Reservations");
          
          userRefPay.on("child_added", snap=>{
            var valPay = snap.val();
            var keyPay = snap.key
            console.log(keyPay);
            console.log(valPay);


            var checkInRef = firebaseRef.ref('users/'+user.uid+"/Payments/"+keyPay+"/CheckIn/").on("value", snap=> {
              var checkIn = snap.val();
              console.log("CheckIn date: " + checkIn);
              
              //this.state.checkIn.push(checkIn);
              //this.setState({checkIn1: 0});
            })

            var checkOutRef = firebaseRef.ref('users/'+user.uid+"/Payments/"+keyPay+"/CheckOut/").on("value", snap=> {
              var checkOut = snap.val();
              console.log("CheckOut date: " + checkOut);
              
              //this.state.checkOut.push(checkOut);
              //this.setState({checkOut: this.state.checkOut});
            })

            var pidRef = firebaseRef.ref('users/'+user.uid+"/Payments/"+keyPay+"/PID/").on("value", snap=> {
              var pid = snap.val();
              console.log("PID: " + pid);
              
              //this.state.pid.push(pid );
              //this.setState({pid : this.state.pid });
            })

            var tidRef = firebaseRef.ref('users/'+user.uid+"/Payments/"+keyPay+"/TID/").on("value", snap=> {
              var tid = snap.val();
              console.log("TID: " + tid);
              
              //this.state.tid.push(tid);
              //this.setState({tid: this.state.tid});
            })

            var priceRef = firebaseRef.ref('users/'+user.uid+"/Payments/"+keyPay+"/Price/").on("value", snap=> {
              var price = snap.val();
              console.log("Price: " + price);
              
              //this.state.price.push(price);
              //this.setState({price: this.state.price});
            })

          });
        }
      }); 
    }

  render() {
    

  
    return (
      <div className="container">
        <div className="jumbotron"   style={{margin: "20px"}}>
          <h3 >Upcoming</h3><hr/>
          <div  >
            <div  className="container">
              <div className="row">
                <h4 style={{color: "black"}}>Posting 2  *****</h4>
                <h4 style={{color: "black"}}>9/22/17 - 9/23/17 * Itinerary #1000021</h4>
                <button className="btn btn-primary">Cancel</button>
                <button className="btn btn-success">Pay Now</button>(Needs to be paid)
              </div>
            </div>
            <br />
            <hr />
          </div>
        </div>

        <div  className="jumbotron" style={{margin: "20px"}}>
          <h3 >History</h3><hr/><br/>
          <div  className="container">
            <div className="row">
              <h4 style={{color: "black"}}>Posting 1*****</h4>
              <h4 style={{color: "black"}}> Dates: 10/03/17 - 10/04/17 * Itinerary #1000022 *****  Cancelled</h4>
            </div>
          </div>  <br/><hr />
        </div>

        <div  className="jumbotron" style={{margin: "20px"}}>
          <h3 >Reward Points</h3><hr/><br/>

          <div className="form-group" > 
            <div className="input-group ">

              <div  className="container" >
                <div className="row">
                <div  className="col-12">
                <h6  >Available Points</h6>
                  <h3 style={{color: "black"}}> 400</h3>
                  </div>
                </div>
              </div>  

              <div  className="container" >
                <div className="row">
                <div  className="col-12">
                <h6  >Point value</h6>
                  <h3 style={{color: "black"}}> $4.00</h3>
                  <h7 >Use points</h7>
                  </div>
                </div>
              </div> 

              <div  className="container" >
                <div className="row">
                  <div  className="col-12" >
                  <h6 >Current Status</h6>
                  <button className="btn btn-primary">+ Blue</button>
                  </div>
                </div>
              </div> 

            </div>
          </div>
        </div>
      </div>  
    );
  }
};