import React, { Component } from "react";
import "./Reservations.css";
import { firebaseRef } from "../../constants/constants";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { browserHistory } from "react-router";
import Rating from "../home/Rating";
import firebase from 'firebase';
import FaHome from 'react-icons/lib/fa/odnoklassniki'


import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import {
  form,
  fieldset,
  input,
  Nav,
  NavItem,
  NavDropdown,
  NavLink
} from "reactstrap";

export default class Reservations extends Component {
  constructor() {
    super();

    this.state = {
      checkIn: "",
      checkOut: "",
      guests: "",
      val: this.stateVal,
      datas: "",
      key: [],
      listing: ["test"],
      imageURLs: [],
      descriptions: [],
      addresses: [],
      titles: [],
      pictures: [],
      userIDs: [],
      datesReserved: "",
      PID: "",
      prices: [],
      UID:'',
      // uid: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentWillMount() {
    var recievedMessage = this.props.location.state.listing;

    console.log("Passed from FindListing: " + recievedMessage);

    //this.userRef = firebaseRef.ref("listing/" + recievedMessage);

    var description = firebaseRef
    .ref("listing/" + recievedMessage + "/Description")
    .on("value", snap => {
      var descrptn = snap.val();
      console.log(descrptn);
      this.state.descriptions.push(descrptn);
      this.setState({ descriptions: this.state.descriptions });
    });

    var title = firebaseRef
    .ref("listing/" + recievedMessage + "/Title")
    .on("value", snap => {
      var title = snap.val();
      this.state.titles.push(title);
      this.setState({ titles: this.state.titles });
    });

    var imageURL = firebaseRef
    .ref("listing/" + recievedMessage + "/Pictures/imageURL")
    .on("value", snap => {
      var imageURL = snap.val();
      console.log("image "+imageURL);
      this.state.imageURLs.push(imageURL);
      this.setState({ imageURLs: this.state.imageURLs });
    });
    var price = firebaseRef.ref('listing/' + recievedMessage + "/Price").on("value", snap=> {
      var price = snap.val();
      this.state.prices.push(price);
      this.setState({price: this.state.prices});
    })

  }

  handleSubmit(e) {
    var UID = '';
    e.preventDefault();

    const listingRef = firebaseRef.ref(
      "listing/" + this.props.location.state.listing + "/DatesReserved/"
    );

    const listingRefReserv = firebaseRef.ref(
      "reservations/" + this.props.location.state.listing + "/DatesReserved/"
    );
    // If the user is not logged in, it fails to push data to the database.
   // Be sure to clear cache from log in memory.
   if (firebase.auth().currentUser === null) {
      alert("User not signed in.");
      isBooked = true;
      this.props.history.push({pathname: '/login' });
    } else {
      UID = firebase.auth().currentUser.uid;
    
    }

    const listingEach = {
     CheckIn: this.state.checkIn,
     CheckOut: this.state.checkOut,
     Guests: this.state.guests,
     PID: this.props.location.state.listing,
     UID: UID
   };

    var chkIn  = Date.parse(this.state.checkIn);//+8.64e+7;
    var chkOut = Date.parse(this.state.checkOut);//+8.64e+7;
    
    var rootRef = firebaseRef.ref("listing/" );
    var urlRef = rootRef.child(this.props.location.state.listing+'/DatesReserved/');
    var urlRefArray = rootRef.child(this.props.location.state.listing+'/Array/');

    var rootReserv = firebaseRef.ref("reservations/" );
    var urlRefReserv = rootReserv.child(this.props.location.state.listing+'/Array/');
    
    console.log("jja PID "+this.props.location.state.listing);    

    var temp1;
    var temp2;
    var isBooked = false;
    var isEmpty = false;
    var isCurrent = false;
    var isValidBooking = false;
    var today = new Date();
    if (firebase.auth().currentUser === null) {
      alert("User not signed in.");
      isBooked = true;
      console.log("1");
      this.props.history.push({pathname: '/login' });
    // return;
    } else {
      UID = firebase.auth().currentUser.uid;
      
    }
    urlRefArray.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        child.forEach(function(child2) {
          if (chkIn == child2.val() ){
            isBooked = true;
            alert("Double Booked");
          }
          if(chkOut == child2.val()){
            isBooked = true;              
            alert("Double Booked")   
          }

        }); 
      });

      if (chkIn + 8.64e7 < Date.parse(today)) {
        isCurrent = true;
        alert("Please enter a date after today (" + today.toDateString() + ")");
      }
      if (chkOut + 8.64e7 < Date.parse(today)) {
        isCurrent = true;
        alert("Please enter a date after today (" + today.toDateString() + ")");
        // return false;
      }

      if (!isEmpty){
        console.log("jja chkIn: " + chkIn)

        if(Number.isNaN(chkIn))  {
            alert("Field is empty!"); 
            isEmpty = true;
        }
        if (Number.isNaN(chkOut) && !isEmpty) { 
          alert("Field is empty!"); 
            isEmpty = true;

        } 
        if (!isEmpty && !isCurrent && !isBooked) {
          isValidBooking = true;
          listingRef.push(listingEach);
          listingRefReserv.push(listingEach);

          var t1 = new Date(chkIn);
          var t2 = new Date(chkOut);
          
          for(var i=t1; i<=t2; ){      
            var j = new Date(i.setDate(i.getDate()+1));
            
            urlRefArray.push({dr: j.getTime() });
            urlRefReserv.push({dr: j.getTime() });
          }
        }
      }
    }); 

    console.log("this.price from reservation: "+ this.state.prices); 

    if (isValidBooking) {
      this.props.history.push({pathname: '/paynoworlater', state: { prices: this.state.prices} });
      console.log("price from reservation: "+ this.state.prices);
    }

    this.setState({
      checkIn: "",
      checkOut: "",
      guests: ""
      
    });
  }

  render() {

    return (
      <div className="rContainer">
        <div className="bContainer">
          <table>
            <tbody>
              <tr>
                <th className="listingsCol">
                  <div className="listings"> <br/><br/>
                    <h4 style={{ padding: "15px"}}>My Reservation</h4>
                    <br/>
                    <div className="col-sm-7 ">
                      <img  className="card" src={this.state.imageURLs} alt="" width="380"  height="300" />
                      <h5 className="card-title">{this.state.titles}</h5>
                      <footer className="card-text">
                      <cite title="Source Title">{this.state.descriptions}</cite>
                      <br/>
                    <p style={{color: "black", fontsize: "50px"}}>Price per Night: ${this.state.prices}</p><br/>
                    <Rating />  
                    </footer>
                    </div>
                  </div>
                </th>
                <th className="bookingsCol">
                  <div className="bookings">
                    <section className="add-item">
                      <form className="card"  style={{padding: "20px"}}onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="checkIn">Check In </label>
                          <input type="date" className="form-control" name="checkIn" placeholder="mm/dd/yyyy" onChange={this.handleChange} value={this.state.checkIn} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="checkOut">Check Out </label>
                          <input type="date" className="form-control" name="checkOut" placeholder="mm/dd/yyyy" onChange={this.handleChange} value={this.state.checkOut} />
                        </div>

                        <div className="form-group">
                          <label htmlFor="checkOut">Number of Guests</label>
                          <input type="text" className="form-control" name="guests" placeholder="1 - 5 guests" onChange={this.handleChange} value={this.state.guests} />
                        </div>
                        <div className="form-group">
                          <button onClick={this.handleSubmit} className="btn btn-success btn-block">Reserve Now!</button>
                        </div>
                      </form>
                    </section>
                    <section className="display-item">
                      <div className="wrapper">
                        <ul />
                      </div>
                    </section>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}