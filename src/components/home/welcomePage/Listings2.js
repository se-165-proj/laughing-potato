import React from 'react';
import {firebaseRef} from './../../../constants/constants';
import Rating from './../Rating';
import {browserHistory} from 'react-router';
import {withRouter} from "react-router-dom";
import Filter2 from "./Filter2";


var Listings2 = React.createClass({

  getInitialState: function(){
		return {
      val: this.stateVal,
      imageURLs: [],
      descriptions: [],
      addresses: [],
      titles: [],
      listing:[],
      userIDs: [],
      recievedSearch:[],
      prices: [],

    };

    this.handleClick = this.handleClick.bind(this);
	},
  handleClick: function(items) {

    console.log("item clicked: " + items);
    this.props.history.push({pathname: '/reservations', state: { listing: this.state.userIDs[items], recievedSearch: this.state.recievedSearch}  });
    console.log("listing2 clicked: "+ this.state.userIDs[items]);
    console.log("reiceved2 clicked: "+ this.state.recievedSearch);

   },


  componentWillMount: function(){
    console.log("Lisintg value: ");
    var recievedSearch = this.props.location.state.message
    //var recievedSearch='San Jose'
    console.log("City  passed: "+recievedSearch);
    this.setState({recievedSearch: recievedSearch})

    this.userRef = firebaseRef.ref('listing/');
    this.userRef.orderByChild("Address/City").equalTo(recievedSearch).limitToFirst(10).on("child_added", snap=>{
      var user_id = snap.key;
      this.setState({listing: user_id})
      console.log("list_id: "+user_id)
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
        this.setState({titles: this.state.titles});

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
    var listUserIDs = [];
    var listPrices = [];
    var listDescriptions = [];
    var listTitles = [];
    var listImageURL = [];
    var maxPrice = this.props.location.state.maxPrice;
    var minPrice = this.props.location.state.minPrice;
    if (minPrice == "" || minPrice == null) minPrice = 0;
    if (maxPrice == "" || maxPrice == null) maxPrice = 999999999;
    for(var i = 0; i < this.state.prices.length; i++) {
      if (this.state.prices[i] >= minPrice && this.state.prices[i] <= maxPrice) {
        listUserIDs.push(this.state.userIDs[i]);
        listPrices.push(this.state.prices[i]);
        listDescriptions.push(this.state.descriptions[i]);
        listTitles.push(this.state.titles[i]);
        listImageURL.push(this.state.imageURLs[i]);
      }
    }
    console.log(listPrices);
    console.log("Min Price " + minPrice);
    console.log("Max Price " + maxPrice);

    var tempUserIDs = [];
    var tempPrices = [];
    var tempDescriptions = [];
    var tempTitles = [];
    var tempImageURL = [];
    var counter = -1;
    console.log(listPrices);
    if(this.props.location.state.sortValue == "Sort by Highest Price") {
      for(var i = 0; i < listPrices.length; i++) {
        listPrices[i] *= -1;
      }
    }
    console.log(listPrices);
    var currentLowest = listPrices[0];
    while(tempPrices == null || tempPrices.length < listPrices.length) {
      for(var i = 0; i < listPrices.length; i++) {
        if(listPrices[i] <= currentLowest && listPrices[i] != 0) {
          currentLowest = listPrices[i];
          counter = i;
        }
      }
      tempUserIDs.push(listUserIDs[counter]);
      tempPrices.push(Math.abs(listPrices[counter]));
      tempDescriptions.push(listDescriptions[counter]);
      tempTitles.push(listTitles[counter]);
      tempImageURL.push(listImageURL[counter]);
      console.log(counter);
      listPrices[counter] = 0;
      currentLowest = 50000;
      counter = -1;
      console.log(counter);
    }
    this.setState({
      userIDs: tempUserIDs,
      prices: tempPrices,
      descriptions: tempDescriptions,
      titles: tempTitles,
      imageURLs: tempImageURL,
    })
    console.log(this.props.location.state.sortValue);
  },

  render() {
    const styles = {
      sidebarnav: {
        position: 'absolute',
        top: 0,
        width: '250px',
        margin: 0,
        padding: 0,
        liststyle: 'none'
    },
      sidebar: {
        width: 256,
        height: '100%',
      },
      sidebarLink: {
        display: 'block',
        padding: '16px 0px',
        color: '#757575',
        textDecoration: 'none',
      },
      divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: '#757575',
      },
      content: {
        padding: '16px',
        height: '100%',
        backgroundColor: 'black',
      },
    };  var showListings;
      if(this.state.userIDs.length == 0){
  			showListings = <div><center>We currently have no Listings yet!</center></div>
  		} else {
      showListings =
  				this.state.descriptions.map((descriptions,items) => (
            <div className="container" key={items}>
              <div className="card" style={{padding: "20px"}}>
                <div className="input-group "  onClick={(evt) =>this.handleClick(items,evt)}>
                  <img className="card"  src={this.state.imageURLs[items]} alt="" width="350" height="270" />
                  <div>
                    <h5 className="card-title pr-3"  style={{padding: "10px"}}>{this.state.titles[items]}</h5>
                    <footer className="card-text" style={{padding: "10px"}}>{descriptions}</footer >
                    <Rating />
                    <h6 style={{padding: "10px"}}>Price per Night: ${this.state.prices[items]}</h6>
                  </div>
                </div>
              </div> <br/>
            </div>
     			))
      }
      return (
        <div id="wrapper">
          <div id="sidebar-wrapper">
              <ul className="sidebar-nav">
                  <li className="sidebar-brand">
                      <Filter2/>
                  </li>
              </ul>
          </div>
          <div id="page-content-wrapper">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-lg-12">
                          {showListings}
                      </div>
                  </div>
              </div>
              <footer>
                <a href="#" style={{float: "right"}} >Back to Top</a>
              </footer>
          </div>
        </div>
      );
    }
  });
module.exports = withRouter(Listings2);
