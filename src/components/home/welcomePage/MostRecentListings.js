import React from 'react';
import {firebaseRef} from './../../../constants/constants';
import Rating from './../Rating';
import {browserHistory} from 'react-router';
import {withRouter} from "react-router-dom";
import mostrecentlistings from "./mostrecentlistings.css"

//parent class listing
var Listings = React.createClass({

  getInitialState: function(){
		return {
      val: this.stateVal,
      value: ['init'],
			datas: '',
      imageURLs: [],
      descriptions: [],
      addresses: [],
      titles: [],
      pictures:[],
      listing:[],
      userIDs: [],
      keyID:[],
      recievedSearch:[],
      prices: [],

    };

    this.handleClick = this.handleClick.bind(this);
	},
  handleClick: function(items) {


    console.log("item clicked: " + items);
    this.props.history.push({pathname: '/reservations', state: { listing: this.state.userIDs[items], keyID: items, recievedSearch: this.state.recievedSearch}  });
    console.log("listing clicked: "+ this.state.userIDs[items]);
    console.log("reiceved clicked: "+ this.state.recievedSearch);
   },


  componentWillMount: function(){
    console.log("Lisintg value: ");
    //var recievedSearch = this.props.location.state.message
    //var recievedSearch='San Jose'
    //console.log("City  passed: "+recievedSearch);
    //this.setState({recievedSearch: recievedSearch})

    this.userRef = firebaseRef.ref('listing/');
    this.userRef.orderByChild("Address/City").limitToFirst(5).on("child_added", snap=>{
      var user_id = snap.key;
      this.setState({listing: user_id})
      console.log("this list: "+user_id)
      var description = firebaseRef.ref('listing/'+ user_id + '/Description').on("value", snap=> {
        var descrptn = snap.val();
        console.log(descrptn);
        this.state.descriptions.push(descrptn);
        this.setState({descriptions: this.state.descriptions});

      })

      //console.log(list);
      //console.log(user_id);
      this.state.userIDs.push(user_id);
      this.setState({userIDs: this.state.userIDs});

      var title = firebaseRef.ref('listing/'+ user_id + '/Title').on("value", snap=> {
        var title = snap.val();
        this.state.titles.push(title);
        this.setState({titles: this.state.titles})

      })
      var imageURL = firebaseRef.ref('listing/'+ user_id  + '/Pictures/imageURL').on("value", snap=> {
        var imageURL = snap.val();
        console.log(imageURL);
        this.state.imageURLs.push(imageURL);
        this.setState({imageURLs: this.state.imageURLs});

      })

      var price = firebaseRef.ref('listing/' + user_id + "/Price").on("value", snap=> {
        var price = snap.val();
        this.state.prices.push(price);
        this.setState({price: this.state.prices});
      })
    });
  },


  render() {
    //console.log("render props: "+ this.stateVal);
    var showListings;
    if(this.state.userIDs.length == 0){
			showListings = <div><center>We currently have no Listings yet!</center></div>
		} else {
    showListings =
			this.state.descriptions.map((descriptions,items) => (
          <div className="carosel pr-2" key={items}>
            <img src={this.state.imageURLs[items]} id="roomListings" alt="" onClick={(evt) =>this.handleClick(items,evt)}/>
            <center><h6 className="card-title">{this.state.titles[items]}</h6>
              <h7>Only ${this.state.prices[items]} per night</h7>
            <button href="#" className="btn btn-outline-warning btn-block"  onClick={(evt) =>this.handleClick(items,evt)}> See Details! </button></center>
          </div>
   			))
    }
    var cheapest;
    if(this.state.userIDs.length == 0){
			cheapest = <div><center>We currently have no Listings yet!</center></div>
		} else {
    cheapest =
			this.state.descriptions.map((descriptions,items) => (
          <div className="carosel pr-2" key={items}>
            <img src={this.state.imageURLs[items]} id="cheapRooms" alt="" onClick={(evt) =>this.handleClick(items,evt)}/>
            <center><h6 className="card-title">{this.state.titles[items]}</h6>
              <h7>Only ${this.state.prices[items]} per night</h7>
            <button href="#" className="btn btn-outline-warning btn-block"  onClick={(evt) =>this.handleClick(items,evt)}> See Details! </button></center>
          </div>
   			))
    }
    return (
      <div className="container-fluid" id="Wtf">
        <br/>
        <br/>
        <h4>Todays Hot Deals: </h4><br/>
          <div className="row" >
          {showListings}
          </div>
          <br/><br/>
        <h4>Cheap Rooms: </h4><br/>
          <div className="row">
          <br/>
          {cheapest}
          </div>
        <br/>
        <br/>
        <footer>
          <a href="#" style={{float: "right"}} >Back to Top</a>
        </footer>
      </div>
    );
  }
});
module.exports = withRouter(Listings);
